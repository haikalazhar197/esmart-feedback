/*
    TYPES
*/

import { ReactNode, reactNode } from "../../schema/";
import { useMemo, useState } from "react";
import { PaginationConfig, TableProps } from "../../types";

interface ControlledTableProps<Record>
  extends Omit<TableProps<Record>, "pagination"> {
  pagination: PaginationConfig;
}

/*
    COMPONENTS
*/
import { Buttons, Pages } from "../Pagination";
import { Th } from "../Th";
import { Loader } from "../Loader";

/*
    LIB
*/

export const Controlled = <Record,>({
  columns,
  data,
  pagination,
  onSort,
  loading,
  sortMultiple = false,
  paginationType = "buttons",
}: ControlledTableProps<Record>) => {
  // SORTER KEYS
  const [sorterKeys, setSorterKeys] = useState<{
    [key: string]: "asc" | "desc";
  }>({});

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

              onSort &&
                onSort(
                  Object.keys(currentSortKeys).map((key) => ({
                    key: key as keyof Record & string,
                    order: currentSortKeys[key],
                  }))
                );

              setSorterKeys({ ...currentSortKeys });
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
      data.map((record, i) => {
        return (
          <tr key={`page-${pagination.current}-${i}`}>
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
    [data, pagination, columns]
  );

  return (
    <div className="relative space-y-4">
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 backdrop-blur-[2px]">
          <Loader color="black" />
        </div>
      )}
      {/* <p className="text-left text-lg font-medium">Controlled Table</p> */}
      {/* {JSON.stringify(sorterKeys, null, 2)} */}
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
          <Buttons
            page={pagination.current}
            total={pagination.total}
            onChange={pagination.setPage}
          />
        ) : (
          <Pages
            page={pagination.current}
            total={pagination.total}
            onChange={pagination.setPage}
          />
        )}
        <select
          value={pagination.size}
          onChange={(e) => {
            // IF THE CURRENT PAGE IS GREATER THAN THE TOTAL PAGE, SET THE PAGE TO THE LAST PAGE
            if (
              pagination.current >
              Math.ceil(pagination.total / Number(e.target.value))
            ) {
              pagination.setPage(
                Math.ceil(data.length / Number(e.target.value))
              );
            }

            pagination.setSize(Number(e.target.value));
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
