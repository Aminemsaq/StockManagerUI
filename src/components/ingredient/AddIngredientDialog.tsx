import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";

import type { Category } from "@/types/category";
import type { Supplier } from "@/types/supplier";

import { UNITS } from "@/types/ingredient";

import {
  getCategories,
} from "@/service/categoryService";

import {
  getSuppliers,
} from "@/service/supplierService";

import {
  createIngredient,
} from "@/service/ingredientService";

interface AddIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIngredientCreated: () => void;
}

const AddIngredientDialog = ({
  open,
  onOpenChange,
  onIngredientCreated,
}: AddIngredientDialogProps) => {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [name, setName] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [supplierId, setSupplierId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [minimumStock, setMinimumStock] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [unit, setUnit] =
    useState("");

  const [expirationDate, setExpirationDate] =
    useState("");

  /*
   * Fetch categories
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error
        );
      }
    };

    fetchCategories();
  }, []);

  /*
   * Fetch suppliers
   */
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data =
          await getSuppliers();

        setSuppliers(data);
      } catch (error) {
        console.error(
          "Failed to fetch suppliers:",
          error
        );
      }
    };

    fetchSuppliers();
  }, []);

  const selectedCategory =
    categories.find(
      (category) =>
        String(category.id) === categoryId
    );

  const selectedSupplier =
    suppliers.find(
      (supplier) =>
        String(supplier.id) === supplierId
    );

  /*
   * Create ingredient
   */
  const handleSubmit = async () => {
    try {
      const ingredient = {
        name: name.trim(),
        categoryId: Number(categoryId),
        supplierId: Number(supplierId),
        quantity: Number(quantity),
        minimumStock: Number(minimumStock),
        price: Number(price),
        unit: unit,
        expirationDate: expirationDate,
      };

      await createIngredient(ingredient);

      onIngredientCreated();
      onOpenChange(false);

      /*
       * Reset form
       */
      setName("");
      setCategoryId("");
      setSupplierId("");
      setQuantity("");
      setMinimumStock("");
      setPrice("");
      setUnit("");
      setExpirationDate("");
    } catch (error) {
      console.error(
        "Failed to create ingredient:",
        error
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-[620px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-0
          shadow-2xl

          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        {/* Header */}
        <DialogHeader
          className="
            border-b
            border-slate-100
            bg-slate-50/70
            px-6
            py-5

            dark:border-slate-800
            dark:bg-slate-900/50
          "
        >
          <DialogTitle
            className="
              text-xl
              font-semibold
              tracking-tight
              text-slate-900

              dark:text-white
            "
          >
            Add Ingredient
          </DialogTitle>

          <DialogDescription
            className="
              mt-1
              text-sm
              leading-5
              text-slate-500

              dark:text-slate-400
            "
          >
            Add a new ingredient to your stock
            inventory.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div
          className="
            max-h-[65vh]
            overflow-y-auto
            px-6
            py-6
          "
        >
          <div className="space-y-6">

            {/* Ingredient Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="
                  text-sm
                  font-medium
                  text-slate-700

                  dark:text-slate-200
                "
              >
                Ingredient Name
              </Label>

              <Input
                id="name"
                placeholder="e.g. Tomato"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="
                  h-10
                  rounded-lg
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  shadow-sm
                  transition-all

                  placeholder:text-slate-400

                  hover:border-slate-300

                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-500/20

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />
            </div>

            {/* Category / Supplier */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              {/* Category */}
              <div className="space-y-2">
                <Label
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Category
                </Label>

                <Select
                  value={categoryId}
                  onValueChange={setCategoryId}
                >
                  <SelectTrigger
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border-slate-200
                      bg-white
                      px-3
                      text-sm
                      shadow-sm
                      transition-all

                      hover:border-slate-300

                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-500/20

                      data-[state=open]:border-orange-500
                      data-[state=open]:ring-2
                      data-[state=open]:ring-orange-500/20

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  >
                    <SelectValue placeholder="Select category">
                      {selectedCategory?.title}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent
                    className="
                      rounded-lg
                      border-slate-200
                      p-1
                      shadow-xl

                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {categories.map(
                      (category) => (
                        <SelectItem
                          key={category.id}
                          value={String(
                            category.id
                          )}
                          className="
                            rounded-md
                            px-3
                            py-2
                            text-sm
                            outline-none

                            focus:bg-orange-50
                            focus:text-orange-700

                            dark:focus:bg-orange-950
                            dark:focus:text-orange-400
                          "
                        >
                          {category.title}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Supplier */}
              <div className="space-y-2">
                <Label
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Supplier
                </Label>

                <Select
                  value={supplierId}
                  onValueChange={setSupplierId}
                >
                  <SelectTrigger
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border-slate-200
                      bg-white
                      px-3
                      text-sm
                      shadow-sm
                      transition-all

                      hover:border-slate-300

                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-500/20

                      data-[state=open]:border-orange-500
                      data-[state=open]:ring-2
                      data-[state=open]:ring-orange-500/20

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  >
                    <SelectValue placeholder="Select supplier">
                      {selectedSupplier?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent
                    className="
                      rounded-lg
                      border-slate-200
                      p-1
                      shadow-xl

                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {suppliers.map(
                      (supplier) => (
                        <SelectItem
                          key={supplier.id}
                          value={String(
                            supplier.id
                          )}
                          className="
                            rounded-md
                            px-3
                            py-2
                            text-sm
                            outline-none

                            focus:bg-orange-50
                            focus:text-orange-700

                            dark:focus:bg-orange-950
                            dark:focus:text-orange-400
                          "
                        >
                          {supplier.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity / Minimum Stock */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              {/* Quantity */}
              <div className="space-y-2">
                <Label
                  htmlFor="quantity"
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Quantity
                </Label>

                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    rounded-lg
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    shadow-sm
                    transition-all

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>

              {/* Minimum Stock */}
              <div className="space-y-2">
                <Label
                  htmlFor="minimumStock"
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Minimum Stock
                </Label>

                <Input
                  id="minimumStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minimumStock}
                  onChange={(event) =>
                    setMinimumStock(
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    rounded-lg
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    shadow-sm
                    transition-all

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* Price / Unit */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              {/* Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Price
                </Label>

                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    rounded-lg
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    shadow-sm
                    transition-all

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <Label
                  htmlFor="unit"
                  className="
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Unit
                </Label>

                <Select
                  value={unit}
                  onValueChange={setUnit}
                >
                  <SelectTrigger
                    id="unit"
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border-slate-200
                      bg-white
                      px-3
                      text-sm
                      shadow-sm
                      transition-all

                      hover:border-slate-300

                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-500/20

                      data-[state=open]:border-orange-500
                      data-[state=open]:ring-2
                      data-[state=open]:ring-orange-500/20

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  >
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent
                    className="
                      max-h-64
                      rounded-lg
                      border-slate-200
                      bg-white
                      p-1
                      shadow-xl

                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {UNITS.map(
                      (unitOption) => (
                        <SelectItem
                          key={unitOption}
                          value={unitOption}
                          className="
                            rounded-md
                            px-3
                            py-2
                            text-sm
                            outline-none

                            focus:bg-orange-50
                            focus:text-orange-700

                            dark:focus:bg-orange-950
                            dark:focus:text-orange-400
                          "
                        >
                          {unitOption}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <Label
                htmlFor="expirationDate"
                className="
                  text-sm
                  font-medium
                  text-slate-700

                  dark:text-slate-200
                "
              >
                Expiration Date
              </Label>

              <Input
                id="expirationDate"
                type="date"
                value={expirationDate}
                onChange={(event) =>
                  setExpirationDate(
                    event.target.value
                  )
                }
                className="
                  h-10
                  w-full
                  rounded-lg
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  shadow-sm
                  transition-all

                  hover:border-slate-300

                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-500/20

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-100
            bg-slate-50/70
            px-6
            py-4

            sm:flex-row
            sm:justify-end

            dark:border-slate-800
            dark:bg-slate-900/50
          "
        >
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            className="
              h-10
              rounded-lg
              border-slate-200
              bg-white
              px-5
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition-all

              hover:bg-slate-100

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="
              h-10
              rounded-lg
              border
              border-orange-600
              bg-orange-600
              px-5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all

              hover:border-orange-700
              hover:bg-orange-700
              hover:shadow-md

              focus:ring-2
              focus:ring-orange-500/30
              focus:ring-offset-2
            "
          >
            Add Ingredient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddIngredientDialog;