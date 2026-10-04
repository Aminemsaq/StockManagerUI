import { useEffect, useState } from "react";
import { Plus, Trash2, Truck } from "lucide-react";

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

import type { Supplier } from "@/types/supplier";

import {
  createSupplier,
  getSuppliers,
} from "@/service/supplierService";

import DeleteSupplierDialog from "./DeleteSupplierDialog";

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupplierDialog = ({
  open,
  onOpenChange,
}: SupplierDialogProps) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierName, setSupplierName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [supplierToDelete, setSupplierToDelete] =
    useState<Supplier | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);

      const data = await getSuppliers();

      setSuppliers(data);
    } catch (error) {
      console.error(
        "Failed to fetch suppliers:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchSuppliers();
    }
  }, [open]);


  const handleCreateSupplier = async () => {
    const name = supplierName.trim();

    if (!name) return;

    try {
      setIsCreating(true);

      const newSupplier = await createSupplier(name);

      setSuppliers((current) => [
        ...current,
        newSupplier,
      ]);

      setSupplierName("");
    } catch (error) {
      console.error(
        "Failed to create supplier:",
        error
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteClick = (
    supplier: Supplier
  ) => {
    setSupplierToDelete(supplier);
    setIsDeleteDialogOpen(true);
  };

  const handleSupplierDeleted = async () => {
    await fetchSuppliers();
    setSupplierToDelete(null);
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
                <Truck
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
                  Suppliers
                </DialogTitle>

                <DialogDescription
                  className="
                    text-sm
                    leading-5
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Create and manage your inventory suppliers
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="max-h-[420px] overflow-y-auto px-6 py-5">
            <div className="space-y-3">
              <Label
                htmlFor="supplier-name"
                className="
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-200
                "
              >
                Add Supplier
              </Label>

              <div className="flex gap-2">
                <Input
                  id="supplier-name"
                  value={supplierName}
                  onChange={(event) =>
                    setSupplierName(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleCreateSupplier();
                    }
                  }}
                  placeholder="Enter supplier name"
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
                  onClick={handleCreateSupplier}
                  disabled={
                    isCreating ||
                    !supplierName.trim()
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
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Suppliers
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
                  {suppliers.length}
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
                    Loading suppliers...
                  </div>
                ) : suppliers.length === 0 ? (
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
                    No suppliers found.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {suppliers.map((supplier) => (
                      <div
                        key={supplier.id}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          px-4
                          py-3
                          transition-colors
                          hover:bg-slate-50
                          dark:hover:bg-slate-900
                        "
                      >
                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-sm
                              font-medium
                              text-slate-900
                              dark:text-white
                            "
                          >
                            {supplier.name}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-slate-400
                            "
                          >
                            Supplier #{supplier.id}
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            handleDeleteClick(
                              supplier
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
                    ))}
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


      <DeleteSupplierDialog
        open={isDeleteDialogOpen}
        supplier={supplierToDelete}
        onOpenChange={setIsDeleteDialogOpen}
        onSupplierDeleted={handleSupplierDeleted}
      />
    </>
  );
};

export default SupplierDialog;