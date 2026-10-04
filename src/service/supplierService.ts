import type { Supplier } from "@/types/supplier";

const API_URL =
  "http://localhost:8080/api/stock/suppliers";

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }

  return response.json();
};

export const createSupplier = async (
  name: string
): Promise<Supplier> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create supplier");
  }

  return response.json();
};

export const deleteSupplier = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete supplier");
  }
};