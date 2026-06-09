import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { AuditLog, CreateAuditLogInput } from "./types";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV;
const DATA_DIR = path.join(process.cwd(), "audit_data");

async function ensureFile(file: string, initial = "[]") {
  if (isVercel) return;
  
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(file);
  } catch {
    await fs.writeFile(file, initial, "utf8");
  }
}

async function readAuditLogs(): Promise<AuditLog[]> {
  if (isVercel) return [];
  
  const file = path.join(DATA_DIR, "audit_logs.json");
  await ensureFile(file);
  const raw = await fs.readFile(file, "utf8");
  return raw ? JSON.parse(raw) : [];
}

async function writeAuditLogs(logs: AuditLog[]): Promise<void> {
  if (isVercel) return;
  
  const file = path.join(DATA_DIR, "audit_logs.json");
  await ensureFile(file);
  await fs.writeFile(file, JSON.stringify(logs, null, 2), "utf8");
}

export async function createAuditLog(input: CreateAuditLogInput): Promise<AuditLog> {
  const now = new Date().toISOString();
  const log: AuditLog = {
    id: crypto.randomUUID(),
    userId: input.userId,
    username: input.username,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    oldData: input.oldData || null,
    newData: input.newData || null,
    status: input.status || "SUCCESS",
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    browser: input.browser,
    operatingSystem: input.operatingSystem,
    sessionId: input.sessionId,
    requestMethod: input.requestMethod,
    requestUrl: input.requestUrl,
    responseCode: input.responseCode,
    createdAt: now,
  };

  const logs = await readAuditLogs();
  logs.unshift(log);
  await writeAuditLogs(logs);

  return log;
}

export async function listAuditLogs(
  options: {
    page?: number;
    perPage?: number;
    username?: string;
    action?: string;
    entityType?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  } = {}
): Promise<{ logs: AuditLog[]; total: number; totalPages: number }> {
  let logs = await readAuditLogs();

  if (options.username) {
    logs = logs.filter(
      (log) => log.username?.toLowerCase().includes(options.username!.toLowerCase())
    );
  }

  if (options.action) {
    logs = logs.filter((log) => log.action === options.action);
  }

  if (options.entityType) {
    logs = logs.filter((log) => log.entityType === options.entityType);
  }

  if (options.status) {
    logs = logs.filter((log) => log.status === options.status);
  }

  if (options.startDate) {
    logs = logs.filter((log) => new Date(log.createdAt) >= new Date(options.startDate!));
  }

  if (options.endDate) {
    const end = new Date(options.endDate!);
    end.setHours(23, 59, 59, 999);
    logs = logs.filter((log) => new Date(log.createdAt) <= end);
  }

  if (options.search) {
    const searchLower = options.search.toLowerCase();
    logs = logs.filter(
      (log) =>
        log.id.toLowerCase().includes(searchLower) ||
        log.username?.toLowerCase().includes(searchLower) ||
        log.entityId?.toLowerCase().includes(searchLower)
    );
  }

  const total = logs.length;
  const page = Math.max(1, options.page || 1);
  const perPage = Math.min(100, Math.max(1, options.perPage || 25));
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = logs.slice(start, start + perPage);

  return { logs: items, total, totalPages };
}


