import { MongoClient, Db, ServerApiVersion } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    return client.connect();
  }
}

// Get client promise without proxy to avoid errors
export async function getClientPromiseSafe(): Promise<MongoClient | null> {
  const promise = getClientPromise();
  if (!promise) return null;
  
  if (!clientPromise) {
    clientPromise = promise;
  }
  return clientPromise;
}

// Remove the broken default export
// export default getClientPromiseSafe();

export async function getDb(): Promise<Db | null> {
  const client = await getClientPromiseSafe();
  if (!client) return null;
  return client.db(process.env.MONGODB_DB_NAME || 'aquabion');
}
