import React, { CSSProperties } from "react";
import { Pagination } from "@mui/material";
interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
  styles: CSSProperties | undefined;
}

export const BasePagination = ({
  totalItems,
  itemsPerPage,
  styles,
  page,
  setPage,
}: PaginationProps) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <Pagination
      count={Math.ceil(totalItems / itemsPerPage)}
      page={page}
      onChange={handlePageChange}
      style={styles}
    />
  );
};
