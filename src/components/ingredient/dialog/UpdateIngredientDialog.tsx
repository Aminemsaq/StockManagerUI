import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { Button } from "../../ui/button";

import type { Category } from "@/types/category";
import type { Supplier } from "@/types/supplier";
import type { Ingredient } from "@/types/ingredient";

import { getCategories } from "@/service/categoryService";
import { getSuppliers } from "@/service/supplierService";
import { updateIngredient } from "@/service/ingredientService";

import { UNITS } from "@/types/ingredient";

interface UpdateIngredientDialogProps {
  open: boolean;
  ingredient: Ingredient | null;
  onOpenChange: (open: boolean) => void;
  onIngredientUpdated: () => void;
}

const UpdateIngredientDialog = ({
  open,
  ingredient,
  onOpenChange,
  onIngredientUpdated,
}: UpdateIngredientDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [supplierId, setSupplierId] = useState("");

  const [minimumStock, setMinimumStock] = useState("");

  const [price, setPrice] = useState("");

  const [unit, setUnit] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();

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

  useEffect(() => {
    if (!ingredient) {
      return;
    }

    setName(ingredient.name);

    setMinimumStock(
      String(ingredient.minimumStock)
    );

    setPrice(String(ingredient.price));

    setUnit(ingredient.unit);

    const category = categories.find(
      (item) =>
        item.title === ingredient.category
    );

    if (category) {
      setCategoryId(String(category.id));
    }

    const supplier = suppliers.find(
      (item) =>
        item.name === ingredient.supplier
    );

    if (supplier) {
      setSupplierId(String(supplier.id));
    }
  }, [
    ingredient,
    categories,
    suppliers,
  ]);

  const selectedCategory = categories.find(
    (category) =>
      String(category.id) === categoryId
  );

  const selectedSupplier = suppliers.find(
    (supplier) =>
      String(supplier.id) === supplierId
  );

  const handleSubmit = async () => {
    if (!ingredient) {
      return;
    }

    if (
      !name.trim() ||
      !categoryId ||
      !supplierId ||
      !minimumStock ||
      !price ||
      !unit.trim()
    ) {
      return;
    }

    const updatedIngredient = {
      name: name.trim(),
      categoryId: Number(categoryId),
      supplierId: Number(supplierId),
      minimumStock: Number(minimumStock),
      price: Number(price),
      unit: unit.trim(),
    };

    try {
      setIsSaving(true);

      const data = await updateIngredient(
        ingredient.id,
        updatedIngredient
      );

      console.log(
        "Ingredient updated:",
        data
      );

      onIngredientUpdated();

      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to update ingredient:",
        error
      );
    } finally {
      setIsSaving(false);
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
          shadow-none

          dark:border-slate-800
          dark:bg-slate-950
        "
      >
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
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-orange-50
                text-orange-600

                dark:bg-orange-950/40
                dark:text-orange-400
              "
            >
              <PackageCheck
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0">
              <DialogTitle
                className="
                  text-base
                  font-semibold
                  tracking-tight
                  text-slate-900

                  dark:text-white
                "
              >
                Update Ingredient
              </DialogTitle>

              <DialogDescription
                className="
                  text-sm
                  leading-5
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Update the information for this
                ingredient
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div
          className="
            max-h-[65vh]
            overflow-y-auto
            px-6
            py-6
          "
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="update-name"
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
                id="update-name"
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
                  shadow-none
                  transition-colors

                  placeholder:text-slate-400

                  hover:border-slate-300

                  focus-visible:border-orange-500
                  focus-visible:ring-2
                  focus-visible:ring-orange-500/20

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
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
                      shadow-none
                      transition-colors

                      hover:border-slate-300

                      focus-visible:border-orange-500
                      focus-visible:ring-2
                      focus-visible:ring-orange-500/20

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
                      bg-white
                      p-1
                      shadow-none

                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
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
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                      shadow-none
                      transition-colors

                      hover:border-slate-300

                      focus-visible:border-orange-500
                      focus-visible:ring-2
                      focus-visible:ring-orange-500/20

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
                      bg-white
                      p-1
                      shadow-none

                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {suppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.id}
                        value={String(supplier.id)}
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
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              <div className="space-y-2">
                <Label
                  htmlFor="update-minimum-stock"
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
                  id="update-minimum-stock"
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
                    shadow-none
                    transition-colors

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-price"
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
                  id="update-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  className="
                    h-10
                    rounded-lg
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    shadow-none
                    transition-colors

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-500/20

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="update-unit"
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
                  id="update-unit"
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    shadow-none
                    transition-colors

                    hover:border-slate-300

                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-500/20

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
                    rounded-lg
                    border-slate-200
                    bg-white
                    p-1
                    shadow-none

                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >
                  {UNITS.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
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
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

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
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
            className="
              h-10
              rounded-lg
              border-slate-200
              bg-white
              px-5
              text-sm
              font-medium
              text-slate-700
              shadow-none
              transition-colors

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
            disabled={isSaving}
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
              shadow-none
              transition-colors

              hover:border-orange-700
              hover:bg-orange-700

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-500/30
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSaving
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIngredientDialog;