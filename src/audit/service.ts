import { NextRequest } from "next/server";
import { createAuditLog } from "./store";
import { AuditAction, CreateAuditLogInput } from "./types";
import { maskSensitiveData, parseUserAgent } from "./utils";
import { getUsernameFromRequest } from "@/lib/adminAuth";
import type { CRMLead } from "@/crm/types";

export class AuditService {
  static async log(
    input: Omit<CreateAuditLogInput, "createdAt">
  ): Promise<void> {
    const maskedOldData = maskSensitiveData(input.oldData || null);
    const maskedNewData = maskSensitiveData(input.newData || null);

    await createAuditLog({
      ...input,
      oldData: maskedOldData,
      newData: maskedNewData,
    });
  }

  static async logSuccess(
    action: AuditAction,
    options: Partial<CreateAuditLogInput> = {}
  ): Promise<void> {
    await this.log({
      ...options,
      action,
      status: "SUCCESS",
    });
  }

  static async logError(
    action: AuditAction,
    options: Partial<CreateAuditLogInput> = {}
  ): Promise<void> {
    await this.log({
      ...options,
      action,
      status: "FAILED",
    });
  }

  static async logLogin(
    success: boolean,
    username?: string,
    request?: NextRequest
  ): Promise<void> {
    const common = this.extractRequestInfo(request);
    if (success) {
      await this.logSuccess("LOGIN_SUCCESS", {
        username,
        ...common,
      });
    } else {
      await this.logError("LOGIN_FAILED", {
        username,
        ...common,
      });
    }
  }

  static async logLogout(
    username?: string,
    request?: NextRequest
  ): Promise<void> {
    const common = this.extractRequestInfo(request);
    await this.logSuccess("LOGOUT", {
      username,
      ...common,
    });
  }

  static async logLeadCreated(
    lead: CRMLead,
    request?: NextRequest
  ): Promise<void> {
    const common = this.extractRequestInfo(request);
    const username = request ? getUsernameFromRequest(request) : undefined;
    await this.logSuccess("LEAD_CREATED", {
      entityType: "LEAD",
      entityId: lead.id,
      newData: lead as unknown as Record<string, unknown>,
      username,
      ...common,
    });
  }

  static async logLeadUpdated(
    oldLead: CRMLead,
    newLead: CRMLead,
    request?: NextRequest
  ): Promise<void> {
    const common = this.extractRequestInfo(request);
    const username = request ? getUsernameFromRequest(request) : undefined;
    await this.logSuccess("LEAD_UPDATED", {
      entityType: "LEAD",
      entityId: newLead.id,
      oldData: oldLead as unknown as Record<string, unknown>,
      newData: newLead as unknown as Record<string, unknown>,
      username,
      ...common,
    });
  }

  static async logLeadDeleted(
    lead: CRMLead,
    request?: NextRequest
  ): Promise<void> {
    const common = this.extractRequestInfo(request);
    const username = request ? getUsernameFromRequest(request) : undefined;
    await this.logSuccess("LEAD_DELETED", {
      entityType: "LEAD",
      entityId: lead.id,
      oldData: lead as unknown as Record<string, unknown>,
      username,
      ...common,
    });
  }

  private static extractRequestInfo(request?: NextRequest): Partial<CreateAuditLogInput> {
    if (!request) return {};

    const userAgent = request.headers.get("user-agent") || "";
    const { browser, operatingSystem } = parseUserAgent(userAgent);
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : request.headers.get("x-real-ip");

    return {
      ipAddress,
      userAgent,
      browser,
      operatingSystem,
      requestMethod: request.method,
      requestUrl: request.url,
    };
  }
}
