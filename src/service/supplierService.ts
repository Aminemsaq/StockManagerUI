import type { Supplier } from "@/types/supplier";

const API_URL =
  "http://localhost:8080/api/stock/suppliers";

export const getSuppliers = async (): Promise<
  Supplier[]
> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch suppliers"
    );
  }

  return response.json();
};