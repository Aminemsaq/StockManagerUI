import {
  StockStatus,
  type Ingredient as IngredientType,
} from "../../types/ingredient";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Badge } from "../ui/badge";

interface IngredientListProps {
  ingredients: IngredientType[];
  onUpdate: (ingredient: IngredientType) => void;
  onDelete: (ingredient: IngredientType) => void;
}

const getStatusStyles = (status: StockStatus) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return {
        badge:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
        dot: "bg-green-500",
      };

    case StockStatus.LOW_STOCK:
      return {
        badge:
          "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-400",
        dot: "bg-yellow-500",
      };

    case StockStatus.OUT_OF_STOCK:
      return {
        badge:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
        dot: "bg-red-500",
      };

    case StockStatus.EXPIRED:
      return {
        badge:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
        dot: "bg-red-500",
      };

    default:
      return {
        badge:
          "border-slate-200 bg-slate-50 text-slate-700",
        dot: "bg-slate-500",
      };
  }
};

const IngredientList = ({
  ingredients,
  onUpdate,
  onDelete,
}: IngredientListProps) => {
  return (
    <div
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-full
          min-w-0
          overflow-x-auto
        "
      >
        <Table
          className="
            w-full
            min-w-[900px]
            table-fixed
          "
        >
          <TableHeader
            className="
              bg-orange-600
              dark:bg-slate-900/70
            "
          >
            <TableRow
              className="
                border-b
                border-slate-200
                hover:bg-transparent
                dark:border-slate-800
              "
            >
              {/* NAME */}
              <TableHead
                className="
                  w-[14%]
                  h-12
                  px-4
                  text-left
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Name
              </TableHead>

              {/* CATEGORY */}
              <TableHead
                className="
                  w-[11%]
                  h-12
                  px-2
                  text-left
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Category
              </TableHead>

              {/* SUPPLIER */}
              <TableHead
                className="
                  w-[17%]
                  h-12
                  px-2
                  text-left
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Supplier
              </TableHead>

              {/* QUANTITY */}
              <TableHead
                className="
                  w-[10%]
                  h-12
                  px-2
                  text-right
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Quantity
              </TableHead>

              {/* PRICE */}
              <TableHead
                className="
                  w-[9%]
                  h-12
                  px-2
                  text-right
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Price
              </TableHead>

              {/* MINIMUM STOCK */}
              <TableHead
                className="
                  w-[10%]
                  h-12
                  px-2
                  text-right
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Min. Stock
              </TableHead>

              {/* EXPIRATION */}
              <TableHead
                className="
                  w-[12%]
                  h-12
                  px-2
                  text-left
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Expiration
              </TableHead>

              {/* STATUS */}
              <TableHead
                className="
                  w-[11%]
                  h-12
                  px-2
                  text-left
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Status
              </TableHead>

              {/* ACTIONS */}
              <TableHead
                className="
                  w-[8%]
                  h-12
                  px-1
                  text-center
                  text-xs
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ingredients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="
                    h-32
                    text-center
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  No ingredients found.
                </TableCell>
              </TableRow>
            ) : (
              ingredients.map((ingredient) => {
                const statusStyles =
                  getStatusStyles(
                    ingredient.stockStatus
                  );

                return (
                  <TableRow
                    key={ingredient.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors
                      duration-150
                      hover:bg-slate-50
                      dark:border-slate-800
                      dark:hover:bg-slate-900/60
                    "
                  >
                    {/* NAME */}
                    <TableCell
                      className="
                        min-w-0
                        overflow-hidden
                        px-4
                        py-4
                        text-sm
                        font-semibold
                        text-slate-900
                        dark:text-slate-100
                      "
                    >
                      <div
                        className="
                          min-w-0
                          truncate
                          whitespace-nowrap
                        "
                        title={ingredient.name}
                      >
                        {ingredient.name}
                      </div>
                    </TableCell>

                    {/* CATEGORY */}
                    <TableCell
                      className="
                        min-w-0
                        overflow-hidden
                        px-2
                        py-4
                        text-sm
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      <div
                        className="
                          min-w-0
                          truncate
                          whitespace-nowrap
                        "
                        title={ingredient.category}
                      >
                        {ingredient.category}
                      </div>
                    </TableCell>

                    {/* SUPPLIER */}
                    <TableCell
                      className="
                        min-w-0
                        overflow-hidden
                        px-2
                        py-4
                        text-sm
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      <div
                        className="
                          min-w-0
                          truncate
                          whitespace-nowrap
                        "
                        title={ingredient.supplier}
                      >
                        {ingredient.supplier}
                      </div>
                    </TableCell>

                    {/* QUANTITY */}
                    <TableCell
                      className="
                        px-2
                        py-4
                        text-right
                        text-sm
                        font-medium
                        tabular-nums
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      <span>
                        {ingredient.quantity}
                      </span>

                      <span
                        className="
                          ml-1
                          text-xs
                          font-normal
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        {ingredient.unit}
                      </span>
                    </TableCell>

                    {/* PRICE */}
                    <TableCell
                      className="
                        px-2
                        py-4
                        text-right
                        text-sm
                        font-semibold
                        tabular-nums
                        text-slate-900
                        dark:text-slate-100
                      "
                    >
                      €{ingredient.price.toFixed(2)}
                    </TableCell>

                    {/* MINIMUM STOCK */}
                    <TableCell
                      className="
                        px-2
                        py-4
                        text-right
                        text-sm
                        tabular-nums
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      <span>
                        {ingredient.minimumStock}
                      </span>

                      <span
                        className="
                          ml-1
                          text-xs
                          font-normal
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        {ingredient.unit}
                      </span>
                    </TableCell>

                    {/* EXPIRATION */}
                    <TableCell
                      className="
                        min-w-0
                        overflow-hidden
                        px-2
                        py-4
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      <div
                        className="
                          truncate
                          whitespace-nowrap
                        "
                        title={ingredient.expirationDate}
                      >
                        {ingredient.expirationDate}
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell
                      className="
                        px-2
                        py-4
                        text-left
                      "
                    >
                      <Badge
                        className={`
                          inline-flex
                          max-w-full
                          items-center
                          rounded-full
                          border
                          px-2
                          py-1
                          text-xs
                          font-medium
                          shadow-none
                          ${statusStyles.badge}
                        `}
                      >
                        <span
                          className={`
                            mr-1.5
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            ${statusStyles.dot}
                          `}
                        />

                        <span
                          className="
                            truncate
                            whitespace-nowrap
                          "
                        >
                          {ingredient.stockStatus}
                        </span>
                      </Badge>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell
                      className="
                        px-1
                        py-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          gap-0
                        "
                      >
                        {/* UPDATE */}
                        <button
                          type="button"
                          title="Update ingredient"
                          aria-label={`Update ${ingredient.name}`}
                          onClick={() =>
                            onUpdate(ingredient)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-slate-500
                            transition-colors
                            hover:bg-slate-100
                            hover:text-slate-900
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-orange-500/30
                            dark:text-slate-400
                            dark:hover:bg-slate-800
                            dark:hover:text-white
                          "
                        >
                          <Pencil
                            className="h-4 w-4"
                            strokeWidth={1.8}
                          />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          title="Delete ingredient"
                          aria-label={`Delete ${ingredient.name}`}
                          onClick={() =>
                            onDelete(ingredient)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-slate-500
                            transition-colors
                            hover:bg-red-50
                            hover:text-red-600
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-red-500/30
                            dark:text-slate-400
                            dark:hover:bg-red-950/30
                            dark:hover:text-red-400
                          "
                        >
                          <Trash2
                            className="h-4 w-4"
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IngredientList;