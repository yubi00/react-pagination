import { useState } from "react";
import { XGrid } from "@material-ui/x-grid";

export default function Table({
  rows,
  columns,
  pagination,
  selected,
  setSelected,
  selection,
  visibleSelection,
  rowsPerPageOptions = [5, 10, 15]
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(rowsPerPageOptions[0]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <XGrid
        rows={rows}
        columns={columns}
        selectionModel={selected}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection={selection}
        pagination={pagination}
        page={page}
        onPageSizeChange={({ pageSize }) => {
          setPageSize(pageSize);
          setSelected([]);
        }}
        onPageChange={({ page }) => {
          setPage(page);
          setSelected([]);
        }}
        onSelectionModelChange={({ selectionModel }) => {
          //if visibleSelection props is defined and select all checkbox is checked
          if (visibleSelection && selectionModel.length === rows.length) {
            setSelected(
              selectionModel.slice(page * pageSize, page * pageSize + pageSize)
            );
            return;
          }

          //else, i.e if row is selected one by one
          setSelected(selectionModel);
        }}
      />
    </div>
  );
}
