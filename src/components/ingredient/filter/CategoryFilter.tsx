import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import type { Category } from "@/types/category";

import {
  getCategories,
} from "@/service/categoryService";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryFilter = ({
  value,
  onChange,
}: CategoryFilterProps) => {
  const [categories, setCategories] =
    useState<Category[]>([]);

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

          focus-visible:border-orange-500
          focus-visible:ring-2
          focus-visible:ring-orange-500/20

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <SelectValue placeholder="All Categories" />
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
          value="All Categories"
          className="rounded-md text-sm"
        >
          All Categories
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.title}
            className="rounded-md text-sm"
          >
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;