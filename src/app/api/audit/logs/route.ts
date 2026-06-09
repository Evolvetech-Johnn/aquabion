import { NextRequest, NextResponse } from "next/server";
import { listAuditLogs } from "@/audit/store";
import { isFullAdminRequest } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  if (!isFullAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "25", 10);
  const username = searchParams.get("username") || undefined;
  const action = searchParams.get("action") || undefined;
  const entityType = searchParams.get("entityType") || undefined;
  const status = searchParams.get("status") || undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const search = searchParams.get("search") || undefined;

  const result = await listAuditLogs({
    page,
    perPage,
    username,
    action,
    entityType,
    status,
    startDate,
    endDate,
    search,
  });

  return NextResponse.json({
    ok: true,
    ...result,
  });
}
