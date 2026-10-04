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

import type { Supplier } from "@/types/supplier";
import { deleteSupplier } from "@/service/supplierService";

interface DeleteSupplierDialogProps {
  open: boolean;
  supplier: Supplier | null;
  onOpenChange: (open: boolean) => void;
  onSupplierDeleted: () => void;
}

const DeleteSupplierDialog = ({
  open,
  supplier,
  onOpenChange,
  onSupplierDeleted,
}: DeleteSupplierDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!supplier) return;

    try {
      setIsDeleting(true);

      await deleteSupplier(supplier.id);

      onSupplierDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to delete supplier:",
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
          shadow-none
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <DialogHeader className="px-6 pt-6">
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
                  text-slate-900
                  dark:text-white
                "
              >
                Delete Supplier
              </DialogTitle>

              <DialogDescription
                className="
                  text-sm
                  leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Are you sure you want to delete this supplier?
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
              {supplier?.name}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              This supplier will be removed from your supplier list.
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
            If this supplier is currently used by an
            ingredient, the deletion may be rejected.
          </p>
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
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
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
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="
              h-10
              rounded-lg
              bg-red-600
              px-4
              text-sm
              font-medium
              text-white
              shadow-none
              hover:bg-red-700
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {isDeleting
              ? "Deleting..."
              : "Delete Supplier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSupplierDialog;