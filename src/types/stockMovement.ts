export type MovementType =
  | "PURCHASE"
  | "USAGE"
  | "WASTE"
  | "ADJUSTMENT";


export interface Movement {
  id: number;
  ingredientId: number;
  ingredientName: string;
  movementType: MovementType;
  quantityChange: number;
  price: number | null;
  reason: string | null;
  orderId: number | null;
  createdAt: string;
}