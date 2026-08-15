import { TableCell, TableRow } from "./TableRow";

interface ITableLoadingStateProps {
  colSpan: number;
}

const TableLoadingState = ({ colSpan }: ITableLoadingStateProps) => {
  return (
    <TableRow aria-busy="true">
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
          />
          <span>Loading data...</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableLoadingState;
