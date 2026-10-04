import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import type { Supplier } from "@/types/supplier";
import { getSuppliers } from "@/service/supplierService";

interface SupplierFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SupplierFilter = ({
  value,
  onChange,
}: SupplierFilterProps) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

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

  return (
    <Select
      value={value}
      onValueChange={onChange}
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
          transition-colors

          focus-visible:border-orange-500
          focus-visible:ring-2
          focus-visible:ring-orange-500/20

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
        "
      >
        <SelectValue placeholder="All Suppliers" />
      </SelectTrigger>

      <SelectContent
        className="
          rounded-lg
          border-slate-200
          bg-white
          p-1
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <SelectItem
          value="All Suppliers"
          className="rounded-md text-sm"
        >
          All Suppliers
        </SelectItem>

        {suppliers.map((supplier) => (
          <SelectItem
            key={supplier.id}
            value={supplier.name}
            className="rounded-md text-sm"
          >
            {supplier.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SupplierFilter;