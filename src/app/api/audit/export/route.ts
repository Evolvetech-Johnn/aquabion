import { NextRequest, NextResponse } from "next/server";
import { listAuditLogs } from "@/audit/store";
import { isFullAdminRequest } from "@/lib/adminAuth";
import { generateCSV } from "@/audit/export";

export async function GET(request: NextRequest) {
  if (!isFullAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "csv";
  const username = searchParams.get("username") || undefined;
  const action = searchParams.get("action") || undefined;
  const entityType = searchParams.get("entityType") || undefined;
  const status = searchParams.get("status") || undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const search = searchParams.get("search") || undefined;

  const { logs } = await listAuditLogs({
    page: 1,
    perPage: 10000,
    username,
    action,
    entityType,
    status,
    startDate,
    endDate,
    search,
  });

  if (format === "csv") {
    const csv = generateCSV(logs);
    const filename = `audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  return NextResponse.json({ ok: false, error: "Unsupported format" }, { status: 400 });
}
