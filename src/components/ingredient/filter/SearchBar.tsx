import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
        "
      />

      <Input
        type="search"
        placeholder="Search ingredients"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-10
          w-full
          rounded-lg
          border-slate-200
          bg-white
          pl-9
          pr-3
          text-sm
          text-slate-900
          placeholder:text-slate-400

          focus-visible:border-orange-500
          focus-visible:ring-2
          focus-visible:ring-orange-500/20
          dark:border-slate-700
          dark:bg-slate-900
        "
      />
    </div>
  );
};

export default SearchBar;