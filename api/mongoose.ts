import mongoose from "mongoose"

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI

if (!MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local')

}

// @ts-expect-error mongoose type was defined
const cached = global.mongoose as {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
} || { conn: null, promise: null }

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI as string, {
            bufferCommands: false,
        }).then(m => m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;