import type { Movement } from "@/types/stockMovement";

const API_URL =
  "http://localhost:8080/api/stock/movements";

export const getMovements =
  async (): Promise<Movement[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        "Failed to fetch movements"
      );
    }

    return response.json();
  };

export const getMovementsByIngredient =
  async (
    ingredientId: number
  ): Promise<Movement[]> => {
    const response = await fetch(
      `${API_URL}/ingredient/${ingredientId}`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch ingredient movements"
      );
    }

    return response.json();
  };