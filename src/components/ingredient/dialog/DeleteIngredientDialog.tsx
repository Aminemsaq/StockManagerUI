import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { Button } from "../../ui/button";

import type { Ingredient } from "@/types/ingredient";

import {
  deleteIngredient,
} from "@/service/ingredientService";

interface DeleteIngredientDialogProps {
  open: boolean;
  ingredient: Ingredient | null;
  onOpenChange: (open: boolean) => void;
  onIngredientDeleted: () => void;
}

const DeleteIngredientDialog = ({
  open,
  ingredient,
  onOpenChange,
  onIngredientDeleted,
}: DeleteIngredientDialogProps) => {
  const [isDeleting, setIsDeleting] =
    useState(false);

  const handleDelete = async () => {
    if (!ingredient) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteIngredient(
        ingredient.id
      );

      onIngredientDeleted();

      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to delete ingredient:",
        error
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isDeleting) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-[440px]
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
        <DialogHeader
          className="
            px-6
            pt-6
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
                bg-red-50
                text-red-600

                dark:bg-red-950/40
                dark:text-red-400
              "
            >
              <AlertTriangle
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
                Delete Ingredient
              </DialogTitle>

              <DialogDescription
                className="
                  text-sm
                  leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Are you sure you want to delete this
                ingredient?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <div
            className="
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3

              dark:border-slate-800
              dark:bg-slate-900
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
              {ingredient?.name}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              {ingredient?.category}
              {" · "}
              {ingredient?.supplier}
            </p>
          </div>

          <p
            className="
              mt-4
              text-sm
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            This ingredient will be removed from
            your active inventory and moved to the
            archived list.
          </p>
        </div>

        <DialogFooter
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
            disabled={isDeleting}
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
            onClick={handleDelete}
            disabled={isDeleting}
            className="
              h-10
              rounded-lg
              border
              border-red-600
              bg-red-600
              px-5
              text-sm
              font-semibold
              text-white
              shadow-sm

              transition-all

              hover:border-red-700
              hover:bg-red-700

              focus:ring-2
              focus:ring-red-500/30
              focus:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isDeleting
              ? "Deleting..."
              : "Delete Ingredient"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIngredientDialog;