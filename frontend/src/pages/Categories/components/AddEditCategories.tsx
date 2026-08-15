import type { ICategoryResponseSchema } from "@/api/categories/category-api.types";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiInput from "@/components/ui/Input/UiInput";
import UiSwitch from "@/components/ui/Input/UiSwitch";
import UiTextarea from "@/components/ui/Input/UiTextarea";
import UiModal from "@/components/ui/Modal/UiModal";
import { DialogTitle } from "@headlessui/react";
import { Tag } from "lucide-react";
import { Controller } from "react-hook-form";
import { useAddEditCategories } from "../hooks/useAddEditCategories";

interface IAddEditCategoriesProps {
  isOpen: boolean;
  category?: ICategoryResponseSchema;
  onClose: () => void;
}

const AddEditCategories = ({
  isOpen,
  category,
  onClose,
}: IAddEditCategoriesProps) => {
  const { form, submitForm, isEditing, isSubmitting } =
    useAddEditCategories({
      category,
      isOpen,
      onSuccess: onClose,
    });

  return (
    <UiModal
      isOpen={isOpen}
      handleCloseModal={onClose}
      disableCloseButton={isSubmitting}
      containerClass="max-w-xl"
      headSection={
        <div className="flex items-center gap-4 border-b border-border px-6 py-5 pr-16">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Tag className="size-6" aria-hidden="true" />
          </span>
          <div>
            <DialogTitle className="text-xl font-bold text-heading">
              {isEditing ? "Edit category" : "Add category"}
            </DialogTitle>
            <p className="mt-0.5 text-sm text-text-muted">
              {isEditing
                ? `Editing "${category?.name}"`
                : "Categories group products across your catalog."}
            </p>
          </div>
        </div>
      }
    >
      <form onSubmit={submitForm} noValidate>
        <div className="space-y-5 px-6 py-6">
          <UiInput
            label="Name"
            required
            placeholder="e.g. Electronics"
            helperText="Must be unique."
            error={form.formState.errors.name?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            autoFocus
            {...form.register("name")}
          />

          <UiTextarea
            label="Description"
            placeholder="What belongs in this category?"
            helperText="Optional — shown on the category listing."
            error={form.formState.errors.description?.message}
            disabled={isSubmitting}
            {...form.register("description")}
          />

          <Controller
            name="isActive"
            control={form.control}
            render={({ field }) => (
              <UiSwitch
                checked={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                label="Active"
                description="Inactive categories stay hidden from product forms."
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-muted/40 px-6 py-4">
          <UiButton disabled={isSubmitting} onClick={onClose}>
            Cancel
          </UiButton>
          <UiButton
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEditing ? "Save changes" : "Create category"}
          </UiButton>
        </div>
      </form>
    </UiModal>
  );
};

export default AddEditCategories;
export type { IAddEditCategoriesProps };
