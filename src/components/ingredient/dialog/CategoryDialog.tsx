import { useEffect, useState } from "react";
import { Plus, Trash2, Layers3 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import type { Category } from "@/types/category";

import {
  createCategory,
  getCategories,
} from "@/service/categoryService";

import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoriesChanged?: () => void;
}

const CategoryDialog = ({
  open,
  onOpenChange,
  onCategoriesChanged,
}: CategoryDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [categoryToDelete, setCategoryToDelete] =
    useState<Category | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(
        "Failed to fetch categories:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);


  const handleCreateCategory = async () => {
    const name = categoryName.trim();

    if (!name) return;

    try {
      setIsCreating(true);

      const newCategory =
        await createCategory(name);

      setCategories((current) => [
        ...current,
        newCategory,
      ]);

      setCategoryName("");

      onCategoriesChanged?.();
    } catch (error) {
      console.error(
        "Failed to create category:",
        error
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteClick = (
    category: Category
  ) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleCategoryDeleted = async () => {
    await fetchCategories();

    onCategoriesChanged?.();

    setCategoryToDelete(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent
          className="
            w-[calc(100%-2rem)]
            max-w-[560px]
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
                <Layers3
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <DialogTitle
                  className="
                    text-base
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Categories
                </DialogTitle>

                <DialogDescription
                  className="
                    text-sm
                    leading-5
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Create and manage your inventory
                  categories
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div
            className="
              max-h-[420px]
              overflow-y-auto
              px-6
              py-5
            "
          >

            <div className="space-y-3">
              <Label
                htmlFor="category-name"
                className="
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-200
                "
              >
                Add Category
              </Label>

              <div className="flex gap-2">
                <Input
                  id="category-name"
                  value={categoryName}
                  onChange={(event) =>
                    setCategoryName(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleCreateCategory();
                    }
                  }}
                  placeholder="Enter category name"
                  className="
                    h-10
                    flex-1
                    rounded-lg
                    border-slate-200
                    bg-white
                    text-sm
                    shadow-none
                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-500/20
                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                />

                <Button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={
                    isCreating ||
                    !categoryName.trim()
                  }
                  className="
                    h-10
                    rounded-lg
                    bg-orange-600
                    px-4
                    text-sm
                    font-medium
                    text-white
                    shadow-none
                    hover:bg-orange-700
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >
                  <Plus
                    className="mr-2 h-4 w-4"
                    strokeWidth={1.8}
                  />

                  {isCreating
                    ? "Adding..."
                    : "Add"}
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Categories
                </p>

                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-slate-600
                    dark:bg-slate-800
                    dark:text-slate-300
                  "
                >
                  {categories.length}
                </span>
              </div>

              <div
                className="
                  overflow-hidden
                  rounded-lg
                  border
                  border-slate-200
                  dark:border-slate-800
                "
              >
                {isLoading ? (
                  <div
                    className="
                      px-4
                      py-8
                      text-center
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Loading categories...
                  </div>
                ) : categories.length === 0 ? (
                  <div
                    className="
                      px-4
                      py-8
                      text-center
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    No categories found.
                  </div>
                ) : (
                  <div>
                    {categories.map(
                      (category, index) => (
                        <div
                          key={category.id}
                          className={`
                            flex
                            items-center
                            justify-between
                            gap-4
                            px-4
                            py-3
                            transition-colors
                            hover:bg-slate-50
                            dark:hover:bg-slate-900

                            ${
                              index !==
                              categories.length - 1
                                ? "border-b border-slate-100 dark:border-slate-800"
                                : ""
                            }
                          `}
                        >
                          <div
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-3
                            "
                          >

                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-slate-100
                                text-base
                                font-semibold
                                text-slate-600
                                dark:bg-slate-800
                                dark:text-slate-300
                              "
                            >
                              {category.title
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <p
                              className="
                                truncate
                                text-sm
                                font-medium
                                text-slate-900
                                dark:text-white
                              "
                            >
                              {category.title}
                            </p>
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                              handleDeleteClick(
                                category
                              )
                            }
                            className="
                              h-9
                              w-9
                              shrink-0
                              rounded-lg
                              p-0
                              text-slate-400
                              shadow-none
                              hover:bg-red-50
                              hover:text-red-600
                              dark:hover:bg-red-950/40
                              dark:hover:text-red-400
                            "
                          >
                            <Trash2
                              className="h-4 w-4"
                              strokeWidth={1.8}
                            />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter
            className="
              border-t
              border-slate-100
              bg-slate-50/50
              px-6
              py-4
              dark:border-slate-800
              dark:bg-slate-900/40
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
                px-4
                text-sm
                shadow-none
                hover:bg-slate-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:hover:bg-slate-800
              "
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteCategoryDialog
        open={isDeleteDialogOpen}
        category={categoryToDelete}
        onOpenChange={(value) => {
          setIsDeleteDialogOpen(value);

          if (!value) {
            setCategoryToDelete(null);
          }
        }}
        onCategoryDeleted={handleCategoryDeleted}
      />
    </>
  );
};

export default CategoryDialog;