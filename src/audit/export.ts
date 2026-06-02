import { AuditLog } from "./types";

export function generateCSV(logs: AuditLog[]): string {
  const headers = [
    "ID",
    "Username",
    "Action",
    "Entity Type",
    "Entity ID",
    "Status",
    "IP Address",
    "Browser",
    "Operating System",
    "Request Method",
    "Request URL",
    "Response Code",
    "Created At",
  ];

  const rows = logs.map((log) => [
    log.id,
    log.username || "",
    log.action,
    log.entityType || "",
    log.entityId || "",
    log.status,
    log.ipAddress || "",
    log.browser || "",
    log.operatingSystem || "",
    log.requestMethod || "",
    log.requestUrl || "",
    log.responseCode?.toString() || "",
    log.createdAt,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  return csvContent;
}
