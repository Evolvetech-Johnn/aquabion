import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getDb } from '@/lib/mongodb';
import { Product, ProductFormData, INITIAL_PRODUCTS } from './types';
import { ObjectId } from 'mongodb';
import type { WithId, Document } from 'mongodb';

const PRODUCTS_COLLECTION = 'products';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const DATA_DIR = path.join(process.cwd(), 'products_data');

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

function mapMongoToProduct(doc: WithId<Document>): Product {
  return {
    id: doc.id || doc._id.toString(),
    description: doc.description as string,
    capacity: doc.capacity as string,
    connection: doc.connection as string,
    unit_price: doc.unit_price as number,
    created_at: new Date(doc.created_at as string),
    updated_at: new Date(doc.updated_at as string),
  };
}

function mapJsonToProduct(json: Partial<Product>): Product {
  return {
    id: json.id || '',
    description: json.description || '',
    capacity: json.capacity,
    connection: json.connection,
    unit_price: json.unit_price || 0,
    created_at: json.created_at ? new Date(json.created_at) : new Date(),
    updated_at: json.updated_at ? new Date(json.updated_at) : new Date(),
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const db = await getDb();
    if (db) {
      const products = await db
        .collection(PRODUCTS_COLLECTION)
        .find({})
        .sort({ description: 1 })
        .toArray();

      const productsMapped = products.map(mapMongoToProduct);
      await writeFile('products.json', productsMapped);
      return productsMapped;
    }
  } catch (error) {
    console.error('Failed to list products from MongoDB, falling back to JSON:', error);
  }

  const jsonProducts = await readFile<Product>('products.json');
  if (jsonProducts.length === 0) {
    await writeFile('products.json', INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
  return jsonProducts.map(mapJsonToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const db = await getDb();
    if (db) {
      let doc: WithId<Document> | null = null;

      if (ObjectId.isValid(id)) {
        doc = await db.collection(PRODUCTS_COLLECTION).findOne({ _id: new ObjectId(id) });
      }

      if (!doc) {
        doc = await db.collection(PRODUCTS_COLLECTION).findOne({ id });
      }

      if (doc) {
        return mapMongoToProduct(doc);
      }
    }
  } catch (error) {
    console.error('Failed to get product from MongoDB, falling back to JSON:', error);
  }

  const products = await readFile<Product>('products.json');
  const found = products.find(p => p.id === id);
  return found ? mapJsonToProduct(found) : null;
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const now = new Date();
  const product: Product = {
    id: crypto.randomUUID(),
    description: data.description,
    capacity: data.capacity,
    connection: data.connection,
    unit_price: data.unit_price,
    created_at: now,
    updated_at: now,
  };

  try {
    const db = await getDb();
    if (db) {
      const insertResult = await db.collection(PRODUCTS_COLLECTION).insertOne({
        ...product,
        _id: new ObjectId(),
      });
      product.id = insertResult.insertedId.toString();
    }
  } catch (error) {
    console.error('Failed to create product in MongoDB, falling back to JSON:', error);
  }

  const products = await readFile<Product>('products.json');
  products.unshift(product);
  await writeFile('products.json', products);

  return product;
}

export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product | null> {
  const now = new Date();

  try {
    const db = await getDb();
    if (db) {
      const updateData: Record<string, unknown> = {
        updated_at: now,
      };

      const fieldsToUpdate = ['description', 'capacity', 'connection', 'unit_price'];
      fieldsToUpdate.forEach(field => {
        if (data[field as keyof ProductFormData] !== undefined) {
          updateData[field] = data[field as keyof ProductFormData];
        }
      });

      let updateResult = { matchedCount: 0 };

      if (ObjectId.isValid(id)) {
        updateResult = await db.collection(PRODUCTS_COLLECTION).updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
      }

      if (updateResult.matchedCount === 0) {
        await db.collection(PRODUCTS_COLLECTION).updateOne(
          { id },
          { $set: updateData }
        );
      }
    }
  } catch (error) {
    console.error('Failed to update product in MongoDB, falling back to JSON:', error);
  }

  const products = await readFile<Product>('products.json');
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...data,
    updated_at: now,
  };

  await writeFile('products.json', products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (db) {
      let deleteResult = { deletedCount: 0 };

      if (ObjectId.isValid(id)) {
        deleteResult = await db.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
      }

      if (deleteResult.deletedCount === 0) {
        deleteResult = await db.collection(PRODUCTS_COLLECTION).deleteOne({ id });
      }

      if (deleteResult.deletedCount > 0) {
        const products = await readFile<Product>('products.json');
        const filtered = products.filter(p => p.id !== id);
        await writeFile('products.json', filtered);
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to delete product in MongoDB, falling back to JSON:', error);
  }

  const products = await readFile<Product>('products.json');
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length !== products.length) {
    await writeFile('products.json', filtered);
    return true;
  }
  return false;
}
