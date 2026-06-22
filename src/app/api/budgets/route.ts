import { NextRequest, NextResponse } from 'next/server';
import { getBudgets, createBudget } from '@/budgets/store';
import { isAdminRequest, getUsernameFromRequest } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const budgets = await getBudgets();
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const username = getUsernameFromRequest(request) || 'admin';
    const data = await request.json();
    const budget = await createBudget(data, username);
    return NextResponse.json(budget);
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}
