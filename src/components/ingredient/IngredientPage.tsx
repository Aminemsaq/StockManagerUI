import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  mapStockStatus,
  type Ingredient,
} from "../../types/ingredient";

import IngredientList from "./IngredientList";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import AddIngredientDialog from "./AddIngredientDialog";
import UpdateIngredientDialog from "./UpdateIngredientDialog";
import DeleteIngredientDialog from "./DeleteIngredientDialog";

import { Button } from "../ui/button";

import { getIngredients } from "@/service/ingredientService";

const IngredientPage = () => {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All Categories");
  const [status, setStatus] =
    useState("All Status");

  const [isAddDialogOpen, setIsAddDialogOpen] =
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

      const statusMatches =
        status === "All Status" ||
        ingredient.stockStatus === status;

      return (
        searchMatches &&
        categoryMatches &&
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
        w-full
        min-w-0
        bg-white
        px-7
        py-7
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1
            className="
              text-[22px]
              font-semibold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            Inventory
          </h1>

          <p
            className="
              mt-1
              text-[13px]
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage all your ingredients in one place
          </p>
        </div>

        <div
          className="
            mb-8
            flex
            w-full
            min-w-0
            flex-wrap
            items-center
            gap-2.5
          "
        >
          <div
            className="
              min-w-[220px]
              flex-1
            "
          >
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="w-[200px] shrink-0">
            <CategoryFilter
              value={category}
              onChange={setCategory}
            />
          </div>

          <div className="w-[200px] shrink-0">
            <StatusFilter
              value={status}
              onChange={setStatus}
            />
          </div>

          <Button
            type="button"
            onClick={() =>
              setIsAddDialogOpen(true)
            }
            className="
              h-10
              shrink-0
              gap-2
              rounded-lg
              border
              border-orange-600
              bg-orange-600
              px-4
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-colors

              hover:border-orange-700
              hover:bg-orange-700

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-500/30
              focus-visible:ring-offset-2

              dark:border-orange-500
              dark:bg-orange-600
              dark:hover:bg-orange-700
            "
          >
            <Plus className="h-4 w-4" />
            Add Ingredient
          </Button>
        </div>

        <div className="w-full min-w-0">
          <IngredientList
            ingredients={filteredIngredients}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>

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