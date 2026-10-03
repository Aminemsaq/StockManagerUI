import type { Category } from "@/types/category";

const API_URL =
  "http://localhost:8080/api/stock/categories";

export const getCategories = async (): Promise<
  Category[]
> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch categories"
    );
  }

  return response.json();
};