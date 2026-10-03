export enum StockStatus {
  IN_STOCK = "In Stock",
  LOW_STOCK = "Low Stock",
  OUT_OF_STOCK = "Out Of Stock",
  EXPIRED = "Expired",
}


export const UNITS = [
  "kg",
  "g",
  "L",
  "mL",
  "pcs",
  "box",
  "pack",
  "bottle",
  "can",
  "bag",
  "case",
  "dozen",
  "tray",
];

export interface Ingredient {
  id: number;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  price: number;
  minimumStock: number;
  unit: string;
  expirationDate: string;
  stockStatus: StockStatus;
}

export const mapStockStatus = (status: string): StockStatus => {
  switch (status) {
    case "IN_STOCK":
    case "In Stock":
      return StockStatus.IN_STOCK;

    case "LOW_STOCK":
    case "Low Stock":
      return StockStatus.LOW_STOCK;

    case "OUT_OF_STOCK":
    case "Out Of Stock":
      return StockStatus.OUT_OF_STOCK;

    default:
      return StockStatus.EXPIRED;
  }
};