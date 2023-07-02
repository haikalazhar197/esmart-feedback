import type { XOR } from "./lib";

interface ColumnData<Record> {
  title: string;
  dataIndex: keyof Record & string;
  width?: string;
  align?: "left" | "right" | "center";
  sorter?: boolean;
}

interface ColumnRender<Record> {
  render: (value: any, record: Record, index: number) => JSX.Element;
  title: string;
  key: string;
  width?: string;
  align?: "left" | "right" | "center";
  sorter?: boolean;
}

export type Column<Record> = XOR<ColumnData<Record>, ColumnRender<Record>>;

export type Columns<Record> = Column<Record>[];

export interface ExpandableConfig<Record> {
  expandedRowRender?: (
    record: Record,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode;
  rowExpandable?: (record: Record) => boolean;
}

export interface PaginationConfig {
  current: number;
  size: number;
  total: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export interface TableProps<Record> {
  columns: Columns<Record>;
  data: Record[];
  expandable?: ExpandableConfig<Record>;
  pagination?: PaginationConfig | boolean;
  loading?: boolean;
  onSort?: (
    sorter: { key: keyof Record & string; order: "asc" | "desc" }[]
  ) => void;
  sortMultiple?: boolean;
  paginationType?: "buttons" | "pages";
}
