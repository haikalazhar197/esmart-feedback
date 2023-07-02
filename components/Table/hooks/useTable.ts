/*
    REACT
*/
import { useState } from "react";

/*
    SWR
*/
import useSWR from "swr";
import { TableProps } from "../types";

/*
TYPES
*/
interface Sorter {
  key: string;
  order: "asc" | "desc";
}

interface Filter {
  key: string;
  value: string;
}

export interface Params {
  current: number;
  pageSize: number;
  sorters?: string;
  filters?: string;
}

/*
    CUSTOM TABLE HOOK
*/
export const useLaskarTable = <T = {}>(
  key: string,
  getData: (
    key: string,
    params: Params
  ) => Promise<{
    list: T[];
    total: number;
  }>
) => {
  /*
      PAGINATION
  */
  // TOTAL PAGE TO RETURN
  const [totalPage, setTotalPage] = useState<number | null>(null);

  // PAGE SIZE

  const [size, setSize] = useState(10);

  // CURRENT PAGE
  const [active, setPage] = useState(1);

  /*
      SORTERS
  */
  // SORTER STRING
  const [sorters, setSorters] = useState<string>("");

  // ON SORT FUNCTION
  const onSort = (
    sorters: {
      key: keyof T & string;
      order: "asc" | "desc";
    }[]
  ) => {
    // CHANGE THE SORTERS TO STRING
    const sorterString = sorters.length
      ? sorters
          .map((sorter) => `${sorter.key}=${sorter.order}`)
          .reduce((prev, curr) => `${prev}&${curr}`)
      : "";

    console.log("CALLING ON SORT OF USELASKAR TABLE", sorters);
    setSorters(sorterString);
  };

  /*
      FILTERS
  */
  const [filters, setFilters] = useState<string>("");

  const onFilter = (filters: Filter[]) => {
    console.log("CALLING ON FILTER OF USELASKAR TABLE", filters);

    const filterString = filters.length
      ? filters
          .map((filter) => `${filter.key}=${filter.value}`)
          .reduce((a, b) => `${a}&${b}`)
      : "";

    setFilters(filterString);
  };

  const runGetData = async (keyFromUseSWR: string) => {
    // RUNNING GET DATA
    console.log("RUNNING RUN GET DATA FROM CUSTOM HOOK", keyFromUseSWR);
    const data = await getData(key, {
      current: active,
      pageSize: size,
      sorters: sorters,
      filters: filters,
    });

    console.log("the results from custom hook", data);
    setTotalPage(Math.ceil(data.total / size));

    return data;
  };

  const { data, error, isValidating, isLoading } = useSWR(
    `${key}?page=${active}&results=${size}&${sorters}&${filters}`,
    runGetData,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  //   const loading = (!data && !error) || isValidating;

  return {
    data: data?.list ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    validating: isValidating,
    pagination: {
      current: active,
      setPage,
      size,
      setSize: (val: number) => {
        setSize(val);
        setPage(1);
      },
      total: totalPage ?? 10,
    },
    onSort,
    onFilter,
  };
};
