import type { Category } from "@/types/category";

const API_URL = "http://localhost:8080/api/stock/categories";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const createCategory = async (
  title: string
): Promise<Category> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};

export const deleteCategory = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
};