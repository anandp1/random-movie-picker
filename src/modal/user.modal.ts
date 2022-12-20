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
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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
  movie: Movie
): Promise<void> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  movie.poster_path = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`;
  const userCollection: Collection<User> = db.collection("users");
  await userCollection.updateOne({ username }, { $push: { movies: movie } });
};

const deleteMovieFromUser = async (
  title: string,
  username: string
): Promise<void> => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_NAME);

  const userCollection: Collection<User> = db.collection("users");

  userCollection.updateOne({ username }, { $pull: { movies: { title } } });
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
  deleteMovieFromUser,
};
