import { Collection } from "mongodb";
import { getMongoClient } from "../middleware/mongodb";

export interface User {
  username: string;
  password: string;
}

const getUser = async (username: string): Promise<User | null> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");
  const user = await userCollection.findOne<User>({ username });

  return user;
};

export { getUser };
