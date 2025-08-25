import { z } from "zod";

export const base_url: string = import.meta.env.VITE_API_BASE_URL;

// ZOD types for safety ----------------------------------------------------------
// WatchLists
export const WatchListDataRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.iso.datetime({ offset: true }).or(z.iso.datetime()),
  is_private: z.boolean(),
});
export const WatchListDataArraySchema = z.array(WatchListDataRawSchema);

// Users
export const UserDataRawSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.email(),
  deleted: z.boolean(),
  created_at: z.iso.datetime(), // Expecting an ISO date string
});
export const UserDataArraySchema = z.array(UserDataRawSchema);

// Media
export const MediaDataRawSchema = z.object({
    id: z.string(),
    title: z.string(),
    release_date: z.iso.datetime({offset: true}).or(z.iso.datetime()),
    director: z.string(),
    genre: z.string(),
    created_at: z.iso.datetime({offset: true}).or(z.iso.datetime()),
});
export const MediaDataArraySchema = z.array(MediaDataRawSchema);

// Common functions --------------------------------------------------------------
export function HandleError(err: unknown) {
  console.error(err);
}