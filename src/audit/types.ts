export type AuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "SESSION_EXPIRED"
  | "PASSWORD_CHANGED"
  | "PASSWORD_RESET"
  | "USER_LOCKED"
  | "USER_UNLOCKED"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "ROLE_CHANGED"
  | "PERMISSION_CHANGED"
  | "CLIENT_CREATED"
  | "CLIENT_UPDATED"
  | "CLIENT_DELETED"
  | "LEAD_CREATED"
  | "LEAD_UPDATED"
  | "LEAD_DELETED"
  | "LEAD_CONVERTED"
  | "PROPOSAL_CREATED"
  | "PROPOSAL_UPDATED"
  | "PROPOSAL_APPROVED"
  | "PROPOSAL_REJECTED"
  | "WORK_ORDER_CREATED"
  | "WORK_ORDER_UPDATED"
  | "WORK_ORDER_COMPLETED"
  | "WORK_ORDER_CANCELLED"
  | "PAYMENT_CREATED"
  | "PAYMENT_UPDATED"
  | "PAYMENT_CANCELLED"
  | "INVOICE_CREATED"
  | "INVOICE_PAID"
  | "INVOICE_CANCELLED"
  | "SYSTEM_SETTING_UPDATED"
  | "EMAIL_TEMPLATE_UPDATED"
  | "PERMISSION_UPDATED"
  | "API_CONFIGURATION_UPDATED";

export type AuditEntityType =
  | "USER"
  | "CLIENT"
  | "LEAD"
  | "PROPOSAL"
  | "WORK_ORDER"
  | "PAYMENT"
  | "INVOICE"
  | "SYSTEM";

export type AuditStatus = "SUCCESS" | "FAILED" | "WARNING" | "INFO";

export interface AuditLog {
  _id?: string;
  id: string;
  userId?: string;
  username?: string;
  action: AuditAction;
  entityType?: AuditEntityType;
  entityId?: string;
  oldData?: Record<string, any> | null;
  newData?: Record<string, any> | null;
  status: AuditStatus;
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  operatingSystem?: string;
  sessionId?: string;
  requestMethod?: string;
  requestUrl?: string;
  responseCode?: number;
  createdAt: string;
}

export interface CreateAuditLogInput {
  userId?: string;
  username?: string;
  action: AuditAction;
  entityType?: AuditEntityType;
  entityId?: string;
  oldData?: Record<string, any> | null;
  newData?: Record<string, any> | null;
  status?: AuditStatus;
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  operatingSystem?: string;
  sessionId?: string;
  requestMethod?: string;
  requestUrl?: string;
  responseCode?: number;
}
