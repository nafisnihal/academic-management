import mongoose from "mongoose";

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseConnection;
};

const cached: MongooseConnection = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;

  return cached.conn;
}
