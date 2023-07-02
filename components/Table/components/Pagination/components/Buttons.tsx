/*
    REACT
*/
import { useMemo, useState } from "react";
import { AntennaBars1, ChevronLeft, ChevronRight } from "tabler-icons-react";

/*
    TYPES
*/
interface PaginationProps {
  total: number;
  page?: number;
  onChange?: (page: number) => void;
}

// FUNCTION TO CREATE THE BUTTON ARRAY
const createButtonArray = (total: number, current: number) => {
  // DECLARE THE ARRAY
  const bttnArray: { key: string; current: boolean; dir?: string }[] = [];

  // IF THE TOTAL NUMBER OF PAGES IS LESS THAN 7
  if (total < 7) {
    for (let index = 0; index < total; index++) {
      bttnArray.push({ key: `${index + 1}`, current: false });
    }

    return bttnArray;
  }

  // GET THE POSITION OF THE CURRENT IN THE TOTAL

  // IF FIRST 5
  if (current < 5) {
    return [
      {
        key: "1",
        current: true,
      },
      {
        key: "2",
        current: false,
      },
      {
        key: "3",
        current: false,
      },
      {
        key: "4",
        current: false,
      },
      {
        key: "5",
        current: false,
      },
      {
        key: "dots",
        current: false,
      },
      {
        key: `${total}`,
        current: false,
      },
    ];
  }

  // CHECK IF LAST 5
  if (current > total - 4) {
    return [
      {
        key: "1",
        current: true,
      },
      {
        key: "dots",
        current: false,
      },
      {
        key: `${total - 4}`,
        current: false,
      },
      {
        key: `${total - 3}`,
        current: false,
      },
      {
        key: `${total - 2}`,
        current: false,
      },
      {
        key: `${total - 1}`,
        current: false,
      },
      {
        key: `${total}`,
        current: false,
      },
    ];
  }

  return [
    {
      key: "1",
      current: true,
    },
    {
      key: "dots",
      current: false,
    },
    {
      key: `${current - 1}`,
      current: false,
    },
    {
      key: `${current}`,
      current: false,
    },
    {
      key: `${current + 1}`,
      current: false,
    },
    {
      key: "dots",
      current: false,
    },
    {
      key: `${total}`,
      current: false,
    },
  ];
};

/*
    TWO MODES:

    1. CONTROLLED
        - PAGE NEEDS TO BE SET TO A NUMBER -- LESS THAN TOTAL
        - ONCHANGE NEEDS TO BE PRESENT

    2. UNCONTROLLED
        - PAGE NEEDS TO BE SET TO UNDEFINED
        - ONCHANGE CAN BE PRESENT OR UNDEFINED
*/
export const Buttons = ({ page, total, onChange }: PaginationProps) => {
  // PAGE STATES
  const [currentPage, setCurrentPage] = useState("1");

  const bttnArray = useMemo(() => {
    return createButtonArray(total, parseInt(page ? `${page}` : currentPage));
  }, [total, currentPage, page]);

  const onBttnClick = (key: string) => {
    // IF PAGE IS NOT PRESENT SET THE KEY
    !page && setCurrentPage(key);

    // CALL THE ONCHANGE IF EXIST
    onChange && onChange(parseInt(key));
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {/* PREVIOUS BUTTON */}
      <li>
        <button
          className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-100`}
          disabled={(page ? `${page}` : currentPage) === "1"}
          onClick={() =>
            onBttnClick(page ? `${page - 1}` : `${parseInt(currentPage) - 1}`)
          }
        >
          <ChevronLeft size={15} />
        </button>
      </li>

      {/* THE PAGES */}
      {bttnArray.map((d, index) => {
        if (d.key === "dots") {
          return (
            <li key={index}>
              <button className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-100">
                <AntennaBars1 size={20} />
              </button>
            </li>
          );
        }

        const theCurrentPage = page ? `${page}` : currentPage;

        // border-gray-100
        return (
          <li key={index}>
            <button
              className={`block h-8 w-8 rounded border ${
                d.key === theCurrentPage
                  ? "border-[#F43F5E] bg-[#F43F5E] text-white"
                  : "border-gray-100"
              } text-center leading-8 `}
              onClick={() => onBttnClick(d.key)}
            >
              {d.key}
            </button>
          </li>
        );
      })}

      {/* NEXT BUTTON */}
      <li>
        <button
          className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-100`}
          disabled={parseInt(page ? `${page}` : currentPage) === total}
          onClick={() =>
            onBttnClick(page ? `${page + 1}` : `${parseInt(currentPage) + 1}`)
          }
        >
          <ChevronRight size={15} />
        </button>
      </li>
    </ol>
  );
};
