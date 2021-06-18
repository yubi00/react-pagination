import { useState } from "react";
import { XGrid } from "@material-ui/x-grid";

export default function Table({
  rows,
  columns,
  pagination,
  rowsPerPageOptions = [5,10,15]
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(rowsPerPageOptions[0]);
  const [selected, setSelected] = useState([]);

  const handleSelectAll = (newSelection, page, pageSize) => {
    if (JSON.stringify(selected) === JSON.stringify(newSelection)) {
      setSelected(newSelection);
      return;
    }
    setSelected(
      newSelection.slice(page * pageSize, page * pageSize + pageSize)
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <XGrid
        rows={rows}
        columns={columns}
        selectionModel={selected}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection
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
        onSelectionModelChange={({ selectionModel }) =>
          handleSelectAll(selectionModel, page, pageSize)
        }
      />
    </div>
  );
}
