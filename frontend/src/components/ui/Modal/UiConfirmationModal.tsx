import { DialogTitle } from "@headlessui/react";
import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import UiButton from "../Buttons/UiButton";
import UiModal from "./UiModal";

interface IUiConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

const UiConfirmationModal = ({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
}: IUiConfirmationModalProps) => {
  return (
    <UiModal
      isOpen={isOpen}
      handleCloseModal={onCancel}
      disableCloseButton={isLoading}
      containerClass="max-w-md"
      headSection={
        <div className="flex gap-4 px-6 pb-3 pt-6 pr-16">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-error-soft text-error">
            <TriangleAlert className="size-5" aria-hidden="true" />
          </span>
          <div>
            <DialogTitle className="text-xl font-bold text-heading">
              {title}
            </DialogTitle>
            <div className="mt-2 text-sm leading-6 text-text-muted">
              {description}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex justify-end gap-3 px-6 pb-6 pt-3">
        <UiButton disabled={isLoading} onClick={onCancel}>
          {cancelLabel}
        </UiButton>
        <UiButton
          variant="destructive"
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </UiButton>
      </div>
    </UiModal>
  );
};

export default UiConfirmationModal;
export type { IUiConfirmationModalProps };
