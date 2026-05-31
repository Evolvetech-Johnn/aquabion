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
let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    throw new Error('Please add your MONGODB_URI to .env.local');
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
export async function getClientPromiseSafe(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = getClientPromise();
  }
  return clientPromise;
}

// Remove the broken default export
// export default getClientPromiseSafe();

export async function getDb(): Promise<Db> {
  const client = await getClientPromiseSafe();
  return client.db(process.env.MONGODB_DB_NAME || 'aquabion');
}
