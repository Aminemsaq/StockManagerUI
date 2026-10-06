import type { Ingredient } from "@/types/ingredient";

const API_URL =
  "http://localhost:8080/api/stock/ingredients";

export const getIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return response.json();
};

export const getIngredient = async (
  id: number
): Promise<Ingredient> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch ingredient");
  }

  return response.json();
};

export const createIngredient = async (
  ingredient: {
    name: string;
    categoryId: number;
    supplierId: number;
    quantity: number;
    minimumStock: number;
    price: number;
    unit: string;
    expirationDate: string;
  }
): Promise<Ingredient> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error("Failed to create ingredient");
  }

  return response.json();
};

export const updateIngredient = async (
  id: number,
  ingredient: {
    name: string;
    categoryId: number;
    supplierId: number;
    quantity: number;
    minimumStock: number;
    price: number;
    unit: string;
  }
): Promise<Ingredient> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error("Failed to update ingredient");
  }

  return response.json();
};

export const deleteIngredient = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete ingredient");
  }
};