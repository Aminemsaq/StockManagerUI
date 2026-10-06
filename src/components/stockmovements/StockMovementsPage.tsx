import {
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ClipboardPenLine,
  Package,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getMovements } from "@/service/movementService";

import type { Movement } from "@/types/stockMovement";
import type { MovementType } from "@/types/stockMovement";

type MovementFilter = "ALL" | MovementType;

type SortOrder = "NEWEST" | "OLDEST";

const MovementPage = () => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState<MovementFilter>("ALL");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("NEWEST");

  const [selectedDate, setSelectedDate] =
    useState("");


  const loadMovements = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMovements();

      setMovements(data);
    } catch (error) {
      console.error(
        "Failed to load movements:",
        error
      );

      setError("Unable to load movements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovements();
  }, []);


  const summary = {
    purchases: movements.filter(
      (movement) =>
        movement.movementType === "PURCHASE"
    ).length,

    usage: movements.filter(
      (movement) =>
        movement.movementType === "USAGE"
    ).length,

    waste: movements.filter(
      (movement) =>
        movement.movementType === "WASTE"
    ).length,

    adjustments: movements.filter(
      (movement) =>
        movement.movementType === "ADJUSTMENT"
    ).length,
  };

  const filteredMovements = movements
    .filter((movement) => {
      const query = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !query ||
        movement.ingredientName
          .toLowerCase()
          .includes(query) ||
        movement.reason
          ?.toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "ALL" ||
        movement.movementType === typeFilter;

      const matchesDate =
        !selectedDate ||
        movement.createdAt.startsWith(
          selectedDate
        );

      return (
        matchesSearch &&
        matchesType &&
        matchesDate
      );
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.createdAt
      ).getTime();

      const dateB = new Date(
        b.createdAt
      ).getTime();

      return sortOrder === "NEWEST"
        ? dateB - dateA
        : dateA - dateB;
    });

  const hasFilters =
    search.trim() !== "" ||
    typeFilter !== "ALL" ||
    selectedDate !== "";

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setSelectedDate("");
  };

  return (
    <div
      className="
        min-h-full
        w-full
        bg-[#f3f4f6]
        px-4
        py-5
        sm:px-6
        lg:px-8
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
            mb-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              Movements
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Track all inventory movements
              in real-time
            </p>
          </div>

          <Button
            type="button"
            onClick={loadMovements}
            disabled={loading}
            variant="outline"
            className="
              h-10
              rounded-lg
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-700
              shadow-none
              transition-colors
              hover:bg-slate-50
            "
          >
            <RefreshCw
              className={`
                mr-2
                h-4
                w-4
                ${
                  loading
                    ? "animate-spin"
                    : ""
                }
              `}
            />

            Refresh
          </Button>
        </div>

        <div
          className="
            mb-6
            grid
            grid-cols-2
            gap-3
            xl:grid-cols-4
          "
        >
          <SummaryCard
            value={summary.purchases}
            label="Purchases"
            icon={ArrowDownToLine}
            iconClass="
              bg-emerald-50
              text-emerald-600
            "
          />

          <SummaryCard
            value={summary.usage}
            label="Usage"
            icon={ArrowUpFromLine}
            iconClass="
              bg-orange-50
              text-orange-600
            "
          />

          <SummaryCard
            value={summary.waste}
            label="Waste"
            icon={Trash2}
            iconClass="
              bg-red-50
              text-red-600
            "
          />

          <SummaryCard
            value={summary.adjustments}
            label="Adjustments"
            icon={ClipboardPenLine}
            iconClass="
              bg-blue-50
              text-blue-600
            "
          />
        </div>

        <section
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >
          <div
            className="
              border-b
              border-slate-100
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                xl:flex-row
                xl:items-center
              "
            >
              {/* SEARCH */}

              <div
                className="
                  relative
                  min-w-0
                  flex-1
                "
              >
                <Search
                  className="
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
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search ingredients or reasons..."
                  className="
                    h-10
                    rounded-lg
                    border-slate-200
                    bg-white
                    pl-9
                    pr-9
                    text-sm
                    shadow-none
                    placeholder:text-slate-400
                    transition-colors
                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-500/20
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* DATE */}

              <div
                className="
                  relative
                  w-full
                  xl:w-[165px]
                "
              >
                <CalendarDays
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

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) =>
                    setSelectedDate(
                      event.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    pl-9
                    pr-3
                    text-sm
                    text-slate-700
                    outline-none
                    transition-colors
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20
                  "
                />
              </div>

              {/* TYPE */}

              <div
                className="
                  relative
                  w-full
                  xl:w-[155px]
                "
              >
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(
                      event.target
                        .value as MovementFilter
                    )
                  }
                  className="
                    h-10
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    pr-9
                    text-sm
                    font-medium
                    text-slate-700
                    outline-none
                    transition-colors
                    hover:border-slate-300
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20
                  "
                >
                  <option value="ALL">
                    All types
                  </option>

                  <option value="PURCHASE">
                    Purchases
                  </option>

                  <option value="USAGE">
                    Usage
                  </option>

                  <option value="WASTE">
                    Waste
                  </option>

                  <option value="ADJUSTMENT">
                    Adjustments
                  </option>
                </select>

                <ChevronDown
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />
              </div>

              {/* SORT */}

              <button
                type="button"
                onClick={() =>
                  setSortOrder(
                    sortOrder === "NEWEST"
                      ? "OLDEST"
                      : "NEWEST"
                  )
                }
                className="
                  flex
                  h-10
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:border-slate-300
                  hover:bg-slate-50
                  xl:w-[150px]
                "
              >
                <span>
                  {sortOrder === "NEWEST"
                    ? "Newest first"
                    : "Oldest first"}
                </span>

                {sortOrder === "NEWEST" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* ACTIVE FILTERS */}

            {hasFilters && (
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Filters:
                </span>

                {search && (
                  <FilterBadge>
                    Search: {search}
                  </FilterBadge>
                )}

                {typeFilter !== "ALL" && (
                  <FilterBadge>
                    {formatMovementType(
                      typeFilter
                    )}
                  </FilterBadge>
                )}

                {selectedDate && (
                  <FilterBadge>
                    {formatDateOnly(
                      selectedDate
                    )}
                  </FilterBadge>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    ml-1
                    text-xs
                    font-medium
                    text-orange-600
                    transition-colors
                    hover:text-orange-700
                  "
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* CONTENT */}

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={loadMovements}
            />
          ) : filteredMovements.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              onClear={clearFilters}
            />
          ) : (
            <div
              className="
                divide-y
                divide-slate-100
              "
            >
              {filteredMovements.map(
                (movement) => (
                  <MovementRow
                    key={movement.id}
                    movement={movement}
                  />
                )
              )}
            </div>
          )}

          {/* FOOTER */}

          {!loading &&
            !error &&
            filteredMovements.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-slate-100
                  px-4
                  py-3
                  sm:px-5
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  Showing{" "}
                  <span
                    className="
                      font-semibold
                      text-slate-700
                    "
                  >
                    {filteredMovements.length}
                  </span>{" "}
                  movement
                  {filteredMovements.length !==
                  1
                    ? "s"
                    : ""}
                </p>

                <p
                  className="
                    hidden
                    text-xs
                    text-slate-400
                    sm:block
                  "
                >
                  Total movements:{" "}
                  {movements.length}
                </p>
              </div>
            )}
        </section>
      </div>
    </div>
  );
};

/*
 * SUMMARY CARD
 */

interface SummaryCardProps {
  value: number;
  label: string;
  icon: ElementType;
  iconClass: string;
}

const SummaryCard = ({
  value,
  label,
  icon: Icon,
  iconClass,
}: SummaryCardProps) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        sm:p-5
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {value}
          </p>

          <p
            className="
              mt-0.5
              text-sm
              font-medium
              text-slate-500
            "
          >
            {label}
          </p>
        </div>

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${iconClass}
          `}
        >
          <Icon
            className="h-5 w-5"
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
};

/*
 * MOVEMENT ROW
 */

interface MovementRowProps {
  movement: Movement;
}

const MovementRow = ({
  movement,
}: MovementRowProps) => {
  const config = getMovementConfig(
    movement.movementType
  );

  const quantity =
    movement.quantityChange ?? 0;

  const isPositive = quantity > 0;

  return (
    <div
      className="
        px-4
        py-4
        transition-colors
        hover:bg-slate-50/70
        sm:px-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
        "
      >
        {/* INGREDIENT */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
          "
        >
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              ${config.iconBackground}
            `}
          >
            <config.icon
              className={`
                h-5
                w-5
                ${config.iconColor}
              `}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {movement.ingredientName}
            </p>

            <div
              className="
                mt-1
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-1
              "
            >
              <span
                className={`
                  text-sm
                  font-medium
                  ${config.quantityColor}
                `}
              >
                {isPositive ? "+" : ""}
                {formatQuantity(quantity)}
              </span>

              {movement.reason && (
                <>
                  <span className="text-slate-300">
                    ·
                  </span>

                  <span
                    className="
                      truncate
                      text-xs
                      text-slate-400
                    "
                  >
                    {movement.reason}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* TYPE */}

        <div className="shrink-0">
          <span
            className={`
              inline-flex
              items-center
              rounded-md
              px-2.5
              py-1
              text-xs
              font-medium
              ${config.badgeBackground}
              ${config.badgeColor}
            `}
          >
            {config.label}
          </span>
        </div>

        {/* DATE */}

        <div
          className="
            shrink-0
            lg:w-[145px]
            lg:text-right
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-slate-700
            "
          >
            {formatMovementDate(
              movement.createdAt
            )}
          </p>

          <p
            className="
              mt-0.5
              text-[11px]
              text-slate-400
            "
          >
            {formatMovementTime(
              movement.createdAt
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

/*
 * MOVEMENT CONFIG
 */

const getMovementConfig = (
  type: MovementType
) => {
  switch (type) {
    case "PURCHASE":
      return {
        label: "Purchase",
        icon: ArrowDownToLine,
        iconBackground: "bg-emerald-50",
        iconColor: "text-emerald-600",
        quantityColor: "text-emerald-600",
        badgeBackground: "bg-emerald-50",
        badgeColor: "text-emerald-700",
      };

    case "USAGE":
      return {
        label: "Usage",
        icon: ArrowUpFromLine,
        iconBackground: "bg-orange-50",
        iconColor: "text-orange-600",
        quantityColor: "text-orange-600",
        badgeBackground: "bg-orange-50",
        badgeColor: "text-orange-700",
      };

    case "WASTE":
      return {
        label: "Waste",
        icon: Trash2,
        iconBackground: "bg-red-50",
        iconColor: "text-red-600",
        quantityColor: "text-red-600",
        badgeBackground: "bg-red-50",
        badgeColor: "text-red-700",
      };

    case "ADJUSTMENT":
      return {
        label: "Adjustment",
        icon: ClipboardPenLine,
        iconBackground: "bg-blue-50",
        iconColor: "text-blue-600",
        quantityColor: "text-blue-600",
        badgeBackground: "bg-blue-50",
        badgeColor: "text-blue-700",
      };
  }
};

/*
 * FILTER BADGE
 */

const FilterBadge = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-md
        bg-slate-100
        px-2.5
        py-1
        text-xs
        font-medium
        text-slate-600
      "
    >
      {children}
    </span>
  );
};

/*
 * LOADING
 */

const LoadingState = () => {
  return (
    <div className="p-5">
      <div className="space-y-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-slate-100
                p-4
              "
            >
              <div
                className="
                  h-10
                  w-10
                  animate-pulse
                  rounded-lg
                  bg-slate-100
                "
              />

              <div
                className="
                  flex-1
                  space-y-2
                "
              >
                <div
                  className="
                    h-4
                    w-32
                    animate-pulse
                    rounded
                    bg-slate-100
                  "
                />

                <div
                  className="
                    h-3
                    w-48
                    animate-pulse
                    rounded
                    bg-slate-100
                  "
                />
              </div>

              <div
                className="
                  hidden
                  h-6
                  w-20
                  animate-pulse
                  rounded
                  bg-slate-100
                  sm:block
                "
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

/*
 * ERROR
 */

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({
  message,
  onRetry,
}: ErrorStateProps) => {
  return (
    <div
      className="
        flex
        min-h-[300px]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-lg
          bg-red-50
          text-red-600
        "
      >
        <RefreshCw className="h-5 w-5" />
      </div>

      <h3
        className="
          text-sm
          font-semibold
          text-slate-900
        "
      >
        Something went wrong
      </h3>

      <p
        className="
          mt-1
          max-w-sm
          text-sm
          text-slate-500
        "
      >
        {message}
      </p>

      <Button
        type="button"
        onClick={onRetry}
        variant="outline"
        className="
          mt-4
          h-9
          rounded-lg
          border-slate-200
          bg-white
          px-4
          text-sm
          shadow-none
        "
      >
        Try again
      </Button>
    </div>
  );
};

/*
 * EMPTY
 */

interface EmptyStateProps {
  hasFilters: boolean;
  onClear: () => void;
}

const EmptyState = ({
  hasFilters,
  onClear,
}: EmptyStateProps) => {
  return (
    <div
      className="
        flex
        min-h-[320px]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
        "
      >
        <Package
          className="h-6 w-6"
          strokeWidth={1.7}
        />
      </div>

      <h3
        className="
          text-sm
          font-semibold
          text-slate-900
        "
      >
        {hasFilters
          ? "No movements found"
          : "No movements yet"}
      </h3>

      <p
        className="
          mt-1
          max-w-sm
          text-sm
          leading-5
          text-slate-500
        "
      >
        {hasFilters
          ? "Try changing your filters or search criteria."
          : "Movements will appear here when inventory changes."}
      </p>

      {hasFilters && (
        <Button
          type="button"
          onClick={onClear}
          variant="outline"
          className="
            mt-4
            h-9
            rounded-lg
            border-slate-200
            bg-white
            px-4
            text-sm
            shadow-none
          "
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};

/*
 * HELPERS
 */

const formatQuantity = (
  quantity: number
) => {
  return Number.isInteger(quantity)
    ? quantity.toString()
    : quantity.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      );
};

const formatMovementType = (
  type: MovementFilter
) => {
  switch (type) {
    case "PURCHASE":
      return "Purchase";

    case "USAGE":
      return "Usage";

    case "WASTE":
      return "Waste";

    case "ADJUSTMENT":
      return "Adjustment";

    default:
      return "All types";
  }
};

const formatMovementDate = (
  value: string
) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatMovementTime = (
  value: string
) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

const formatDateOnly = (
  value: string
) => {
  const date = new Date(
    `${value}T00:00:00`
  );

  return date.toLocaleDateString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default MovementPage;