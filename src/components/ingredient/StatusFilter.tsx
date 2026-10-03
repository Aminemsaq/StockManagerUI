import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusFilter = ({
  value,
  onChange,
}: StatusFilterProps) => {
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
          shadow-sm
          transition-colors

          focus-visible:border-orange-500
          focus-visible:ring-2
          focus-visible:ring-orange-500/20

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
        "
      >
        <SelectValue placeholder="All Status" />
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
          value="All Status"
          className="rounded-md text-sm"
        >
          All Status
        </SelectItem>

        <SelectItem
          value="In Stock"
          className="rounded-md text-sm"
        >
          In Stock
        </SelectItem>

        <SelectItem
          value="Low Stock"
          className="rounded-md text-sm"
        >
          Low Stock
        </SelectItem>

        <SelectItem
          value="Out Of Stock"
          className="rounded-md text-sm"
        >
          Out Of Stock
        </SelectItem>

        <SelectItem
          value="Expired"
          className="rounded-md text-sm"
        >
          Expired
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;