export const base_url: string = import.meta.env.VITE_API_BASE_URL;

export function HandleError(err: unknown) {
  console.error(err);
}
