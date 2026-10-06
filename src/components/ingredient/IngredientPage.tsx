import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  mapStockStatus,
  type Ingredient,
} from "../../types/ingredient";

import IngredientList from "./IngredientList";
import SearchBar from "./filter/SearchBar";
import CategoryFilter from "./filter/CategoryFilter";
import SupplierFilter from "./filter/SupplierFilter";
import StatusFilter from "./filter/StatusFilter";

import AddIngredientDialog from "./dialog/AddIngredientDialog";
import UpdateIngredientDialog from "./dialog/UpdateIngredientDialog";
import DeleteIngredientDialog from "./dialog/DeleteIngredientDialog";
import CategoryDialog from "./dialog/CategoryDialog";
import SupplierDialog from "./dialog/SupplierDialog";

import { Button } from "../ui/button";
import { getIngredients } from "@/service/ingredientService";

const IngredientPage = () => {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>([]);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [supplier, setSupplier] =
    useState("All Suppliers");

  const [status, setStatus] =
    useState("All Status");

  const [isAddDialogOpen, setIsAddDialogOpen] =
    useState(false);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState(false);

  const [isSupplierDialogOpen, setIsSupplierDialogOpen] =
    useState(false);

  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const fetchIngredients = async () => {
    try {
      const data = await getIngredients();

      const mappedIngredients: Ingredient[] =
        data.map((ingredient) => ({
          ...ingredient,
          stockStatus: mapStockStatus(
            String(ingredient.stockStatus)
          ),
        }));

      setIngredients(mappedIngredients);
      setLastUpdated(new Date());
    } catch (error) {
      console.error(
        "Failed to fetch ingredients:",
        error
      );
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const filteredIngredients =
    ingredients.filter((ingredient) => {
      const searchMatches =
        ingredient.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatches =
        category === "All Categories" ||
        ingredient.category === category;

      const supplierMatches =
        supplier === "All Suppliers" ||
        ingredient.supplier === supplier;

      const statusMatches =
        status === "All Status" ||
        ingredient.stockStatus === status;

      return (
        searchMatches &&
        categoryMatches &&
        supplierMatches &&
        statusMatches
      );
    });

  const handleUpdate = (
    ingredient: Ingredient
  ) => {
    setSelectedIngredient(ingredient);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = (
    ingredient: Ingredient
  ) => {
    setSelectedIngredient(ingredient);
    setIsDeleteDialogOpen(true);
  };


  const handleUpdateDialogChange = (
    open: boolean
  ) => {
    setIsUpdateDialogOpen(open);

    if (!open) {
      setSelectedIngredient(null);
    }
  };

  const handleDeleteDialogChange = (
    open: boolean
  ) => {
    setIsDeleteDialogOpen(open);

    if (!open) {
      setSelectedIngredient(null);
    }
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        min-w-0
        bg-[#f3f4f6]
        px-5
        py-6
        text-slate-900
        sm:px-6
        sm:py-7
        lg:px-8
        lg:py-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >

        <div
          className="
            mb-7
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div className="min-w-0">
            <div className="flex flex-col gap-1">
              <h1
                className="
                  text-[24px]
                  font-bold
                  leading-none
                  tracking-[-1px]
                  text-[#191919]
                "
              >
                Inventory
              </h1>

              <p
                className="
                  text-[14px]
                  font-normal
                  leading-5
                  text-slate-600
                "
              >
                Manage all your ingredients in one place
              </p>
            </div>
          </div>

          <div
            className="
              flex
              w-full
              flex-wrap
              items-center
              gap-2.5
              lg:w-auto
              lg:shrink-0
            "
          >

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setIsCategoryDialogOpen(true)
              }
              className="
                h-11
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-800
                shadow-none
                transition-colors
                hover:bg-slate-50
                hover:text-slate-950
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-slate-400/20
                focus-visible:ring-offset-2
              "
            >
              Categories
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setIsSupplierDialogOpen(true)
              }
              className="
                h-11
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-800
                shadow-none
                transition-colors
                hover:bg-slate-50
                hover:text-slate-950
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-slate-400/20
                focus-visible:ring-offset-2
              "
            >
              Suppliers
            </Button>

            <Button
              type="button"
              onClick={() =>
                setIsAddDialogOpen(true)
              }
              className="
                h-11
                gap-2
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
              "
            >
              <Plus
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              Add Ingredient
            </Button>
          </div>
        </div>

        <section
          className="
            mb-7
            w-full
            rounded-[16px]
            border
            border-slate-200
            bg-white
            p-5
            shadow-none
            sm:p-6
          "
        >

          <div className="w-full min-w-0">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <div
            className="
              mt-5
              grid
              w-full
              grid-cols-1
              gap-4
              md:grid-cols-3
            "
          >

            <div className="min-w-0 w-full">
              <label
                className="
                  mb-1.5
                  block
                  text-[12px]
                  font-medium
                  text-slate-600
                "
              >
                Category
              </label>

              <div className="w-full">
                <CategoryFilter
                  value={category}
                  onChange={setCategory}
                />
              </div>
            </div>

            <div className="min-w-0 w-full">
              <label
                className="
                  mb-1.5
                  block
                  text-[12px]
                  font-medium
                  text-slate-600
                "
              >
                Supplier
              </label>

              <div className="w-full">
                <SupplierFilter
                  value={supplier}
                  onChange={setSupplier}
                />
              </div>
            </div>

            <div className="min-w-0 w-full">
              <label
                className="
                  mb-1.5
                  block
                  text-[12px]
                  font-medium
                  text-slate-600
                "
              >
                Status
              </label>

              <div className="w-full">
                <StatusFilter
                  value={status}
                  onChange={setStatus}
                />
              </div>
            </div>
          </div>
        </section>

        <div
          className="
            mb-3
            flex
            min-h-[32px]
            items-center
            justify-between
            gap-4
            px-1
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-[12px]
                font-semibold
                uppercase
                tracking-tight
                text-slate-700
              "
            >
              Showing
            </span>

            <span
              className="
                text-[12px]
                font-semibold
                text-slate-950
              "
            >
              {filteredIngredients.length}
            </span>

            <span
              className="
                text-[12px]
                font-medium
                uppercase
                tracking-tight
                text-slate-500
              "
            >
              {filteredIngredients.length === 1
                ? "ingredient"
                : "ingredients"}
            </span>
          </div>

          <div
            className="
              hidden
              text-[12px]
              font-medium
              text-slate-500
              sm:block
            "
          >
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`
              : "Loading inventory..."}
          </div>
        </div>

        <section
          className="
            w-full
            min-w-0
            overflow-hidden
            rounded-[16px]
            border
            border-slate-200
            bg-white
            shadow-none
          "
        >
          <div className="w-full min-w-0">
            <IngredientList
              ingredients={filteredIngredients}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        </section>

        <CategoryDialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        />

        <SupplierDialog
          open={isSupplierDialogOpen}
          onOpenChange={setIsSupplierDialogOpen}
        />

        <AddIngredientDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onIngredientCreated={fetchIngredients}
        />

        <UpdateIngredientDialog
          open={isUpdateDialogOpen}
          ingredient={selectedIngredient}
          onOpenChange={handleUpdateDialogChange}
          onIngredientUpdated={fetchIngredients}
        />

        <DeleteIngredientDialog
          open={isDeleteDialogOpen}
          ingredient={selectedIngredient}
          onOpenChange={handleDeleteDialogChange}
          onIngredientDeleted={fetchIngredients}
        />
      </div>
    </div>
  );
};

export default IngredientPage;