import { cn } from "@/lib/clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import UiButton from "../Buttons/UiButton";

interface IUiModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  isLoading?: boolean;
  zIndex?: string;
  headSection?: ReactNode;
  containerClass?: string;
  children: ReactNode;
  disableCloseButton?: boolean;
  loaderComponent?: ReactNode;
}

const defaultLoaderComponent = (
  <div className="h-72 w-full animate-pulse rounded-lg bg-surface-muted" />
);

const UiModal = ({
  isOpen,
  isLoading = false,
  headSection,
  containerClass,
  children,
  disableCloseButton = false,
  handleCloseModal,
  zIndex = "z-50",
  loaderComponent = defaultLoaderComponent,
}: IUiModalProps) => {
  const closeModal = () => {
    if (!disableCloseButton) handleCloseModal();
  };

  return (
    <Dialog
      as="div"
      className={cn("relative focus:outline-none", zIndex)}
      open={isOpen}
      onClose={closeModal}
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-heading/45 backdrop-blur-[2px]"
      />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-panel duration-150 ease-out data-closed:scale-95 data-closed:opacity-0",
              containerClass,
            )}
          >
            {headSection}
            {!disableCloseButton && (
              <UiButton
                aria-label="Close modal"
                className="absolute right-4 top-4 size-9! border-0! bg-transparent! p-0! text-text-muted shadow-none! hover:bg-surface-muted!"
                onClick={closeModal}
              >
                <X className="size-5" />
              </UiButton>
            )}
            {isLoading ? loaderComponent : children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UiModal;
export type { IUiModalProps };
