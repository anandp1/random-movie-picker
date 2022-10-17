import { Collection } from "mongodb";
import { getMongoClient } from "../middleware/mongodb";

export interface User {
  username: string;
  password: string;
  displayName: string;
  movies: Movie[];
}

export type SafeUser = Omit<User, "password" | "movies">;

export interface Movie {
  title: string;
  imbdId: string;
  imageUrl: string;
}

export interface MovieByUser {
  [key: string]: { movies: Movie[]; displayName: string };
}

const getUser = async (username: string): Promise<User | null> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");
  const user = await userCollection.findOne<User>({ username });

  return user;
};

const addMovieToUser = async (
  username: string,
  title: string,
  imbdId: string,
  imageUrl: string
): Promise<void> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");
  await userCollection.updateOne(
    { username },
    { $push: { movies: { title, imbdId, imageUrl } } }
  );
};

const getMoviesByUser = async (): Promise<MovieByUser> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");
  const moviesByUser = await userCollection.find().toArray();

  const moviesByUserMap = {};
  moviesByUser.forEach((user) => {
    if (user.movies) {
      moviesByUserMap[user.username] = {
        movies: user.movies,
        displayName: user.displayName,
      };
    }
  });

  return moviesByUserMap;
};

const getAllMovies = async (usersSelected: string[]): Promise<Movie[]> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");

  const moviesByUser = await userCollection
    .find({ displayName: { $in: usersSelected } })
    .toArray();

  const movies = moviesByUser.reduce((acc, user) => {
    return [...acc, ...user.movies];
  }, []);

  return movies;
};

const getAvailableUsers = async (): Promise<SafeUser[]> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");
  const users = await userCollection.find().toArray();

  const availableUsers = users
    .filter((user) => user.movies?.length > 0)
    .map((user) => {
      const { username, displayName } = user;
      return { username, displayName };
    });
  return availableUsers;
};

export {
  getUser,
  addMovieToUser,
  getMoviesByUser,
  getAllMovies,
  getAvailableUsers,
};
