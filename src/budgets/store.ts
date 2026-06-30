import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getDb } from '@/lib/mongodb';
import { Budget, BudgetFormData, BudgetItem } from './types';
import { ObjectId } from 'mongodb';
import type { WithId, Document } from 'mongodb';

export const BUDGETS_COLLECTION = 'budgets';
export const BUDGET_ITEMS_COLLECTION = 'budget_items';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const DATA_DIR = path.join(process.cwd(), 'budgets_data');

async function ensureFile(file: string, initial = '[]') {
  if (isVercel) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(file);
  } catch {
    await fs.writeFile(file, initial, 'utf8');
  }
}

async function readFile<T>(name: string): Promise<T[]> {
  if (isVercel) return [];
  const file = path.join(DATA_DIR, name);
  await ensureFile(file);
  const raw = await fs.readFile(file, 'utf8');
  return raw ? JSON.parse(raw) : [];
}

async function writeFile<T>(name: string, data: T[]) {
  if (isVercel) return;
  const file = path.join(DATA_DIR, name);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

function mapMongoToBudget(doc: WithId<Document>, items: BudgetItem[]): Budget {
  return {
    id: doc.id || doc._id.toString(),
    budget_number: doc.budget_number as string,
    client_name: doc.client_name as string,
    client_document: doc.client_document as string,
    client_phone: doc.client_phone as string,
    client_email: doc.client_email as string,
    client_address: doc.client_address as string,
    client_address_number: doc.client_address_number as string,
    client_address_complement: doc.client_address_complement as string,
    client_address_neighborhood: doc.client_address_neighborhood as string,
    client_city: doc.client_city as string,
    client_state: doc.client_state as string,
    client_cep: doc.client_cep as string,
    client_contact: doc.client_contact as string,
    client_contact_role: doc.client_contact_role as string,
    client_observations: doc.client_observations as string,
    issue_date: new Date(doc.issue_date as string),
    expiration_date: new Date(doc.expiration_date as string),
    subtotal: doc.subtotal as number,
    shipping_cost: doc.shipping_cost as number,
    discount: doc.discount as number,
    total_value: doc.total_value as number,
    payment_terms: doc.payment_terms as string,
    delivery_time: doc.delivery_time as string,
    status: doc.status as 'draft' | 'sent' | 'approved' | 'rejected' | 'expired',
    created_by: doc.created_by as string,
    created_at: new Date(doc.created_at as string),
    updated_at: new Date(doc.updated_at as string),
    items: items,
  };
}

function mapJsonToBudget(json: Partial<Budget> & { items?: Partial<BudgetItem>[] }): Budget {
  return {
    id: json.id || '',
    budget_number: json.budget_number || '',
    client_name: json.client_name || '',
    client_document: json.client_document || '',
    client_phone: json.client_phone || '',
    client_email: json.client_email || '',
    client_address: json.client_address || '',
    client_address_number: json.client_address_number || '',
    client_address_complement: json.client_address_complement || '',
    client_address_neighborhood: json.client_address_neighborhood || '',
    client_city: json.client_city || '',
    client_state: json.client_state || '',
    client_cep: json.client_cep || '',
    client_contact: json.client_contact || '',
    client_contact_role: json.client_contact_role || '',
    client_observations: json.client_observations || '',
    issue_date: json.issue_date ? new Date(json.issue_date) : new Date(),
    expiration_date: json.expiration_date ? new Date(json.expiration_date) : new Date(),
    subtotal: json.subtotal || 0,
    shipping_cost: json.shipping_cost || 0,
    discount: json.discount || 0,
    total_value: json.total_value || 0,
    payment_terms: json.payment_terms || '',
    delivery_time: json.delivery_time || '',
    status: json.status || 'draft',
    created_by: json.created_by || '',
    created_at: json.created_at ? new Date(json.created_at) : new Date(),
    updated_at: json.updated_at ? new Date(json.updated_at) : new Date(),
    items: json.items ? json.items.map(item => ({
      id: item.id || '',
      description: item.description || '',
      quantity: item.quantity || 0,
      unit_price: item.unit_price || 0,
      total_price: item.total_price || 0,
      created_at: item.created_at ? new Date(item.created_at) : new Date(),
    })) : [],
  };
}

export async function getNextBudgetNumber(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = currentYear.toString();

  try {
    const db = await getDb();
    if (db) {
      // Find the latest budget for this year
      const latestBudget = await db
        .collection(BUDGETS_COLLECTION)
        .find({ budget_number: { $regex: `^${prefix}/` } })
        .sort({ budget_number: -1 })
        .limit(1)
        .next();

      let nextSequence = 1;
      if (latestBudget) {
        const currentNumber = latestBudget.budget_number.split('/')[1];
        nextSequence = parseInt(currentNumber, 10) + 1;
      }

      const formattedSequence = nextSequence.toString().padStart(3, '0');
      return `${prefix}/${formattedSequence}`;
    }
  } catch (error) {
    console.error('Failed to get next budget number from MongoDB, falling back to JSON:', error);
  }

  // Fallback to JSON
  const budgets = await readFile<Budget>('budgets.json');
  const yearBudgets = budgets.filter(b => b.budget_number.startsWith(prefix + '/'));
  
  let nextSequence = 1;
  if (yearBudgets.length > 0) {
    const numbers = yearBudgets.map(b => parseInt(b.budget_number.split('/')[1], 10));
    nextSequence = Math.max(...numbers) + 1;
  }

  const formattedSequence = nextSequence.toString().padStart(3, '0');
  return `${prefix}/${formattedSequence}`;
}

export async function getBudgets(): Promise<Budget[]> {
  try {
    const db = await getDb();
    if (db) {
      const budgets = await db
        .collection(BUDGETS_COLLECTION)
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      const budgetsWithItems: Budget[] = [];
      for (const budget of budgets) {
        const items = await db
          .collection(BUDGET_ITEMS_COLLECTION)
          .find({ budget_id: budget._id.toString() })
          .toArray();

        budgetsWithItems.push(mapMongoToBudget(budget, items.map(item => ({
          id: item._id.toString(),
          description: item.description as string,
          quantity: item.quantity as number,
          unit_price: item.unit_price as number,
          total_price: item.total_price as number,
          created_at: new Date(item.created_at as string),
        }))));
      }

      await writeFile('budgets.json', budgetsWithItems);
      return budgetsWithItems;
    }
  } catch (error) {
    console.error('Failed to list budgets from MongoDB, falling back to JSON:', error);
  }

  const budgets = await readFile<Budget>('budgets.json');
  return budgets.map(mapJsonToBudget);
}

export async function getBudgetById(id: string): Promise<Budget | null> {
  try {
    const db = await getDb();
    if (db) {
      let doc: WithId<Document> | null = null;

      if (ObjectId.isValid(id)) {
        doc = await db.collection(BUDGETS_COLLECTION).findOne({ _id: new ObjectId(id) });
      }

      if (!doc) {
        doc = await db.collection(BUDGETS_COLLECTION).findOne({ id });
      }

      if (doc) {
        const items = await db
          .collection(BUDGET_ITEMS_COLLECTION)
          .find({ budget_id: (doc._id.toString() || doc.id) })
          .toArray();

        return mapMongoToBudget(doc, items.map(item => ({
          id: item._id.toString(),
          description: item.description as string,
          quantity: item.quantity as number,
          unit_price: item.unit_price as number,
          total_price: item.total_price as number,
          created_at: new Date(item.created_at as string),
        })));
      }
    }
  } catch (error) {
    console.error('Failed to get budget from MongoDB, falling back to JSON:', error);
  }

  const budgets = await readFile<Budget>('budgets.json');
  const found = budgets.find(b => b.id === id);
  return found ? mapJsonToBudget(found) : null;
}

export async function createBudget(data: BudgetFormData, createdBy: string): Promise<Budget> {
  const budgetNumber = await getNextBudgetNumber();
  const now = new Date();

  const budget: Budget = {
    id: crypto.randomUUID(),
    budget_number: budgetNumber,
    client_name: data.client_name,
    client_document: data.client_document,
    client_phone: data.client_phone,
    client_email: data.client_email,
    client_address: data.client_address,
    client_address_number: data.client_address_number,
    client_address_complement: data.client_address_complement,
    client_address_neighborhood: data.client_address_neighborhood,
    client_city: data.client_city,
    client_state: data.client_state,
    client_cep: data.client_cep,
    client_contact: data.client_contact,
    client_contact_role: data.client_contact_role,
    client_observations: data.client_observations,
    issue_date: new Date(data.issue_date),
    expiration_date: new Date(data.expiration_date),
    subtotal: data.subtotal,
    shipping_cost: data.shipping_cost,
    discount: data.discount,
    total_value: data.total_value,
    payment_terms: data.payment_terms,
    delivery_time: data.delivery_time,
    status: data.status,
    created_by: createdBy,
    created_at: now,
    updated_at: now,
    items: data.items.map(item => ({
      id: crypto.randomUUID(),
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      created_at: now,
    })),
  };

  try {
    const db = await getDb();
    if (db) {
      const insertResult = await db.collection(BUDGETS_COLLECTION).insertOne({
        ...budget,
        _id: new ObjectId(),
      });
      budget.id = insertResult.insertedId.toString();

      if (budget.items.length > 0) {
        await db.collection(BUDGET_ITEMS_COLLECTION).insertMany(
          budget.items.map(item => ({
            budget_id: budget.id,
            ...item,
            _id: new ObjectId(),
          }))
        );
      }
    }
  } catch (error) {
    console.error('Failed to create budget in MongoDB, falling back to JSON:', error);
  }

  const budgets = await readFile<Budget>('budgets.json');
  budgets.unshift(budget);
  await writeFile('budgets.json', budgets);

  return budget;
}

export async function updateBudget(id: string, data: Partial<BudgetFormData>): Promise<Budget | null> {
  const now = new Date();

  try {
    const db = await getDb();
    if (db) {
      const updateData: Record<string, unknown> = {
        updated_at: now,
      };

      const fieldsToUpdate = [
        'client_name', 'client_document', 'client_phone', 'client_email',
        'client_address', 'client_address_number', 'client_address_complement',
        'client_address_neighborhood', 'client_city', 'client_state', 'client_cep',
        'client_contact', 'client_contact_role', 'client_observations',
        'issue_date', 'expiration_date', 'subtotal', 'shipping_cost',
        'discount', 'total_value', 'payment_terms', 'delivery_time', 'status'
      ];

      fieldsToUpdate.forEach(field => {
        if (data[field as keyof BudgetFormData] !== undefined) {
          if (field === 'issue_date' || field === 'expiration_date') {
            updateData[field] = new Date(data[field as keyof BudgetFormData] as string);
          } else {
            updateData[field] = data[field as keyof BudgetFormData];
          }
        }
      });

      let updateResult = { matchedCount: 0 };

      if (ObjectId.isValid(id)) {
        updateResult = await db.collection(BUDGETS_COLLECTION).updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
      }

      if (updateResult.matchedCount === 0) {
        await db.collection(BUDGETS_COLLECTION).updateOne(
          { id },
          { $set: updateData }
        );
      }

      if (data.items) {
        await db.collection(BUDGET_ITEMS_COLLECTION).deleteMany({ budget_id: id });

        if (data.items.length > 0) {
          await db.collection(BUDGET_ITEMS_COLLECTION).insertMany(
            data.items.map(item => ({
              budget_id: id,
              ...item,
              _id: new ObjectId(),
            }))
          );
        }
      }
    }
  } catch (error) {
    console.error('Failed to update budget in MongoDB, falling back to JSON:', error);
  }

  const budgets = await readFile<Budget>('budgets.json');
  const index = budgets.findIndex(b => b.id === id);

  if (index === -1) return null;

  budgets[index] = {
    ...budgets[index],
    ...data,
    issue_date: data.issue_date ? new Date(data.issue_date) : budgets[index].issue_date,
    expiration_date: data.expiration_date ? new Date(data.expiration_date) : budgets[index].expiration_date,
    updated_at: now,
    items: data.items ? data.items.map(item => ({
      ...item,
      id: item.id || crypto.randomUUID(),
      created_at: item.created_at || now,
    })) : budgets[index].items,
  };

  await writeFile('budgets.json', budgets);
  return budgets[index];
}

export async function deleteBudget(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (db) {
      await db.collection(BUDGET_ITEMS_COLLECTION).deleteMany({ budget_id: id });

      let deleteResult = { deletedCount: 0 };

      if (ObjectId.isValid(id)) {
        deleteResult = await db.collection(BUDGETS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
      }

      if (deleteResult.deletedCount === 0) {
        deleteResult = await db.collection(BUDGETS_COLLECTION).deleteOne({ id });
      }

      if (deleteResult.deletedCount > 0) {
        const budgets = await readFile<Budget>('budgets.json');
        const filtered = budgets.filter(b => b.id !== id);
        await writeFile('budgets.json', filtered);
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to delete budget in MongoDB, falling back to JSON:', error);
  }

  const budgets = await readFile<Budget>('budgets.json');
  const filtered = budgets.filter(b => b.id !== id);
  if (filtered.length !== budgets.length) {
    await writeFile('budgets.json', filtered);
    return true;
  }
  return false;
}

export async function duplicateBudget(id: string, createdBy: string): Promise<Budget | null> {
  const originalBudget = await getBudgetById(id);
  if (!originalBudget) return null;

  const now = new Date();

  const duplicatedBudgetData: BudgetFormData = {
    client_name: originalBudget.client_name,
    client_document: originalBudget.client_document,
    client_phone: originalBudget.client_phone,
    client_email: originalBudget.client_email,
    client_address: originalBudget.client_address,
    client_address_number: originalBudget.client_address_number,
    client_address_complement: originalBudget.client_address_complement,
    client_address_neighborhood: originalBudget.client_address_neighborhood,
    client_city: originalBudget.client_city,
    client_state: originalBudget.client_state,
    client_cep: originalBudget.client_cep,
    client_contact: originalBudget.client_contact,
    client_contact_role: originalBudget.client_contact_role,
    client_observations: originalBudget.client_observations,
    issue_date: now.toISOString().split('T')[0],
    expiration_date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subtotal: originalBudget.subtotal,
    shipping_cost: originalBudget.shipping_cost,
    discount: originalBudget.discount,
    total_value: originalBudget.total_value,
    payment_terms: originalBudget.payment_terms,
    delivery_time: originalBudget.delivery_time,
    status: 'draft',
    items: originalBudget.items.map(item => ({
      ...item,
      id: '', // Will be generated by DB
    })),
  };

  return createBudget(duplicatedBudgetData, createdBy);
}
