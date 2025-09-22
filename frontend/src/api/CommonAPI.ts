import { z } from "zod";

export const base_url: string = import.meta.env.VITE_API_BASE_URL;

// Common functions --------------------------------------------------------------
export function HandleError(err: unknown) {
  console.error(err);
}

// ZOD types for safety ----------------------------------------------------------
// User --------------------------------------------------------------------------
export const UserDataRawSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  deleted: z.boolean(),
  created_at: z.string(), // comes as ISO string
});

export const UserDataSchema = UserDataRawSchema.transform(user => ({
  ...user,
  created_at: new Date(user.created_at),
}));

export const UserDataArraySchema = z.array(UserDataSchema);

// Media -------------------------------------------------------------------------
export const MediaDataRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  release_date: z.string(),
  director: z.string(),
  genre: z.string(),
  created_at: z.string(),
});

export const MediaDataSchema = MediaDataRawSchema.transform(media => ({
  ...media,
  created_at: new Date(media.created_at),
  release_date: new Date(media.release_date),
}));

export const MediaDataArraySchema = z.array(MediaDataSchema);

export const MediaPreviewDataRawSchema = z.object({
  title: z.string(),
  thumbnail: z.string().nullable(),
  media_order: z.number(),
});

export const MediaPreviewSchema = MediaPreviewDataRawSchema.transform(media => ({...media}))
export const MediaPreviewArraySchema = z.array(MediaPreviewSchema);

// WatchList ---------------------------------------------------------------------
export const WatchListDataRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  is_private: z.boolean(),
});

export const WatchListDataSchema = WatchListDataRawSchema.transform(wl => ({
  ...wl,
  created_at: new Date(wl.created_at),
}));

export const WatchListDataArraySchema = z.array(WatchListDataSchema);

// Final response schema
export const WatchListContentDataRawSchema = z.object({
  watchList: WatchListDataRawSchema,
  users: z.array(UserDataRawSchema),
  medias: z.array(MediaDataRawSchema),
});

// Transformed response schema
export const WatchListContentSchema = z.object({
  watchList: WatchListDataSchema,
  users: z.array(UserDataSchema),
  medias: z.array(MediaDataSchema),
});

export const WatchListPreviewSchema = z.object({
  watchList: WatchListDataSchema,
  mediaPreviews: z.array(MediaPreviewSchema).nullable(),
})