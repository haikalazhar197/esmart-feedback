/*
    TYPES
*/
import { TableProps } from "./types";

/*
    COMPONENTS
*/
import { UnControlled } from "./components/UnControlled";
import { Controlled } from "./components/Controlled";

/*
    LIB
*/
import { PaginationConfig, paginationSchema } from "./schema";

export const Table = <Record,>({
  pagination = true,
  ...rest
}: TableProps<Record>) => {
  // CHECK IF THE PAGINATION IS CONTROLLED
  const isControlled = paginationSchema.safeParse(pagination);

  // IF THE PAGINATION IS CONTROLLED
  if (isControlled.success) {
    return <Controlled pagination={pagination as PaginationConfig} {...rest} />;
  }

  // IF THE PAGINATION IS NOT CONTROLLED -- CHANGE THIS TO A UNCONTROLLED TABLE
  return <UnControlled pagination={pagination} {...rest} />;
};
