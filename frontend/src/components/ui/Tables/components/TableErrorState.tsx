import { CircleAlert, RefreshCcw } from "lucide-react";
import { TableCell, TableRow } from "./TableRow";
import UiButton from "../../Buttons/UiButton";

interface ITableErrorStateProps {
  colSpan: number;
  message?: string;
  onRefetch?: () => void;
}

const TableErrorState = ({
  colSpan,
  message = "Something went wrong while loading the data.",
  onRefetch,
}: ITableErrorStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-2 text-sm text-error"
        >
          <CircleAlert aria-hidden="true" className="size-5" />
          <span>{message}</span>
        </div>
        {onRefetch && (
          <UiButton
            className="shadow-none h-8 mt-4"
            variant="default"
            leftIcon={<RefreshCcw className="size-4 text-text-muted" />}
          >
            Refetch
          </UiButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableErrorState;
export type { ITableErrorStateProps };
