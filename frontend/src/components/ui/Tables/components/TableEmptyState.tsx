import { Inbox } from "lucide-react";
import { TableCell, TableRow } from "./TableRow";

interface ITableEmptyStateProps {
  colSpan: number;
  message: string;
}

const TableEmptyState = ({ colSpan, message }: ITableEmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-text-muted">
          <Inbox aria-hidden="true" className="size-6 text-text-soft" />
          <span>{message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableEmptyState;
