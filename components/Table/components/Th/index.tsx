import type { Column } from "../../types";
import { useMemo } from "react";
import { ChevronDown, ChevronUp, Selector } from "tabler-icons-react";

export type ThProps<T> = {
  children: React.ReactNode;
  className?: string;
  sorted?: "asc" | "desc";
  sorter?: boolean;
  onSort?: () => void;
};

export const Th = <T,>({
  className,
  children,
  sorter,
  sorted,
  onSort,
}: ThProps<T>) => {
  const sorterIcon = useMemo(() => {
    if (sorter) {
      if (sorted === "asc") {
        return <ChevronUp color="rgb(107 114 128)" size={18} />;
      } else if (sorted === "desc") {
        return <ChevronDown color="rgb(107 114 128)" size={18} />;
      } else {
        return <Selector color="rgb(107 114 128)" size={18} />;
      }
    }
  }, [sorted]);

  if (sorter) {
    return (
      <th
        className={` whitespace-nowrap font-medium text-gray-900 ${className}}`}
      >
        <button
          onClick={onSort}
          className=" flex w-full flex-row items-center space-x-9 rounded-md px-4 py-2 text-left hover:bg-gray-100"
        >
          <span className="flex-1">{children}</span> {sorterIcon}
        </button>
      </th>
    );
  }

  return (
    <th
      className={` whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 ${className}}`}
    >
      <div className=" flex w-full flex-row items-center space-x-9">
        <span className="flex-1">{children}</span>
      </div>
    </th>
  );
};
