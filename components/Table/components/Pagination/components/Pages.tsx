/*
    REACT
*/
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";

/*
    TYPES
*/
interface PaginationProps {
  total: number;
  page?: number;
  onChange?: (page: number) => void;
}

/*
    TWO MODES:

    1. CONTROLLED
        - PAGE NEEDS TO BE SET TO A NUMBER -- LESS THAN TOTAL
        - ONCHANGE NEEDS TO BE PRESENT

    2. UNCONTROLLED
        - PAGE NEEDS TO BE SET TO UNDEFINED
        - ONCHANGE CAN BE PRESENT OR UNDEFINED
*/
export const Pages = ({ page, total, onChange }: PaginationProps) => {
  // PAGE STATES
  const [currentPage, setCurrentPage] = useState("1");

  const onBttnClick = (key: string) => {
    // IF PAGE IS NOT PRESENT SET THE KEY
    !page && setCurrentPage(key);

    // CALL THE ONCHANGE IF EXIST
    onChange && onChange(parseInt(key));
  };

  return (
    <div className="inline-flex items-center justify-center gap-3">
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200"
        disabled={(page ? `${page}` : currentPage) === "1"}
        onClick={() =>
          onBttnClick(page ? `${page - 1}` : `${parseInt(currentPage) - 1}`)
        }
      >
        <span className="sr-only">Previous Page</span>
        <ChevronLeft size={15} />
      </button>
      <p className="text-sm">{`${
        page ? `${page}` : currentPage
      } / ${total}`}</p>

      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200"
        disabled={parseInt(page ? `${page}` : currentPage) === total}
        onClick={() =>
          onBttnClick(page ? `${page + 1}` : `${parseInt(currentPage) + 1}`)
        }
      >
        <span className="sr-only">Next Page</span>
        <ChevronRight size={15} />
      </button>
    </div>
  );
};
