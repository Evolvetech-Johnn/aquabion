import { NextRequest, NextResponse } from 'next/server';
import { duplicateBudget } from '@/budgets/store';
import { isAdminRequest, getUsernameFromRequest } from '@/lib/adminAuth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const username = getUsernameFromRequest(request) || 'admin';
    const { id } = await params;
    const budget = await duplicateBudget(id, username);

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(budget);
  } catch (error) {
    console.error('Error duplicating budget:', error);
    return NextResponse.json({ error: 'Failed to duplicate budget' }, { status: 500 });
  }
}
