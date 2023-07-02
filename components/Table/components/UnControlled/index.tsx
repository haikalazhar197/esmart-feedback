/*
    TYPES
*/

import { ReactNode, reactNode } from "../../schema";
import { useMemo, useState } from "react";
import { TableProps } from "../../types";

/*
    COMPONENTS
*/
import { Buttons, Pages } from "../Pagination";
import { Th } from "../Th";

/*
    LIB
*/
const sorter = <T,>(
  data: T[],
  key: keyof T & string,
  order: "asc" | "desc"
) => {
  return data.sort((a, b) => {
    if (order === "asc") {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

// SPLIT THE DATA INTO A MAP WHERE THE KEY IS THE PAGE NUMBER AND THE VALUE IS THE DATA
const splitData = <T,>(
  data: T[],
  perPage: number,
  preprocessor?: (data: T[]) => T[]
) => {
  if (preprocessor) {
    data = preprocessor(data);
  }

  const pages = Math.ceil(data.length / perPage);

  const splitData = new Map<string, T[]>();

  for (let i = 0; i < pages; i++) {
    splitData.set(`${i + 1}`, data.slice(i * perPage, (i + 1) * perPage));
  }

  return splitData;
};

export const UnControlled = <Record,>({
  columns,
  data,
  pagination = true,
  onSort,
  sortMultiple = false,
  paginationType = "buttons",
}: TableProps<Record>) => {
  // SORTER KEYS
  const [sorterKeys, setSorterKeys] = useState<{
    [key: string]: "asc" | "desc";
  }>({});

  // PAGINATION
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const processedData = useMemo(() => {
    // SORTER
    const onsortFn = sortMultiple
      ? onSort ||
        (() =>
          console.warn(
            "SORTING MULTIPLE COLUMNS: PLEASE PROVIDE AN ONSORT FUNCTION"
          ))
      : undefined;

    onsortFn &&
      onsortFn(
        Object.keys(sorterKeys).map((key) => ({
          order: sorterKeys[key] || "asc",
          key: key as keyof Record & string,
        }))
      );

    const sortKey = Object.keys(sorterKeys).length
      ? Object.keys(sorterKeys)[0]
      : undefined;
    const sortFn = onsortFn
      ? undefined
      : !sortKey
      ? undefined
      : (data: Record[]) => {
          if (!!sorterKeys[sortKey]) {
            return sorter(
              data,
              sortKey as keyof Record & string,
              sorterKeys[sortKey] || "asc"
            );
          } else {
            return data;
          }
        };

    return pagination
      ? splitData(data, perPage, sortFn)
      : splitData(data, data.length, sortFn);
  }, [data, perPage, pagination, sorterKeys]);

  const totalPage = useMemo(() => processedData.size, [processedData]);

  // TABLE HEADER
  const tableHeader = useMemo(
    () =>
      columns.map((column, i) => {
        return (
          <Th
            key={`column-${i}`}
            sorter={column.sorter}
            sorted={sorterKeys[column.key || column.dataIndex || ""]}
            onSort={() => {
              console.log("CALLING ON SORT");
              const key = column.key || column.dataIndex || "";

              let currentSortKeys =
                typeof sortMultiple === "boolean" && sortMultiple
                  ? sorterKeys
                  : {};

              console.log(currentSortKeys, sortMultiple);

              if (column.sorter) {
                if (sorterKeys[key]) {
                  if (sorterKeys[key] === "asc") {
                    currentSortKeys = {
                      ...currentSortKeys,
                      [key]: "desc",
                    };
                  } else {
                    delete currentSortKeys[key];
                  }
                } else {
                  currentSortKeys = {
                    ...currentSortKeys,
                    [key]: "asc",
                  };
                }
              }

              setSorterKeys({
                ...currentSortKeys,
              });
            }}
          >
            {column.title}
          </Th>
        );
      }),
    [columns, sorterKeys, sortMultiple]
  );

  // TABLE BODY
  const currentPageData = useMemo(
    () =>
      (processedData.get(`${page}`) || []).map((record, i) => {
        return (
          <tr key={`page-${page}-${i}`}>
            {columns.map((column, i) => {
              const col = column.dataIndex ? record[column.dataIndex] : null;
              const CustomCol = column.render
                ? column.render(record, record, i)
                : null;

              return (
                <td
                  key={`column-${i}`}
                  className={`${
                    column.width ? ` ${column.width} ` : ""
                  } whitespace-nowrap px-4 py-4 text-left text-sm font-medium text-gray-900`}
                >
                  {!!CustomCol ? CustomCol : (col as ReactNode) || "Error"}
                </td>
              );
            })}
          </tr>
        );
      }),
    [processedData, page, columns, perPage]
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm ">
          <thead className="bg-gray-50">
            <tr>{tableHeader}</tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentPageData}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row items-center justify-center space-x-6">
        {pagination && paginationType === "buttons" ? (
          <Buttons page={page} total={totalPage} onChange={setPage} />
        ) : (
          <Pages page={page} total={totalPage} onChange={setPage} />
        )}
        <select
          value={perPage}
          onChange={(e) => {
            // IF THE CURRENT PAGE IS GREATER THAN THE TOTAL PAGE, SET THE PAGE TO THE LAST PAGE
            if (page > Math.ceil(data.length / Number(e.target.value))) {
              setPage(Math.ceil(data.length / Number(e.target.value)));
            }

            setPerPage(Number(e.target.value));
          }}
          className=" h-8 rounded-md border-gray-200 bg-white py-0 text-sm text-gray-700"
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
  );
};
