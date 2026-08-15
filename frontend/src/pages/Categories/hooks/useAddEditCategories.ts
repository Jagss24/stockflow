import type { ICategoryResponseSchema } from "@/api/categories/category-api.types";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/api/categories/category.mutation";
import { setApiFormErrors } from "@/lib/formErrors";
import { handleSuccessToast } from "@/lib/toast";
import {
  categoryFormSchema,
  type TCategoryFormSchema,
} from "@/pages/Categories/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUseAddEditCategoriesProps {
  category?: ICategoryResponseSchema;
  isOpen: boolean;
  onSuccess: () => void;
}

const getDefaultValues = (
  category?: ICategoryResponseSchema,
): TCategoryFormSchema => ({
  name: category?.name ?? "",
  description: category?.description ?? "",
  isActive: category?.isActive ?? true,
});

const useAddEditCategories = ({
  category,
  isOpen,
  onSuccess,
}: IUseAddEditCategoriesProps) => {
  const form = useForm<TCategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: getDefaultValues(category),
  });
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();
  const isEditing = Boolean(category);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isOpen) form.reset(getDefaultValues(category));
  }, [category, form, isOpen]);

  const submitForm = form.handleSubmit(async (values) => {
    const payload = {
      name: values.name,
      description: values.description || undefined,
      isActive: values.isActive,
    };

    try {
      if (category) {
        await updateMutation.mutateAsync({ id: category.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      handleSuccessToast({
        message: isEditing
          ? "Category updated successfully."
          : "Category created successfully.",
      });
      onSuccess();
    } catch (error) {
      setApiFormErrors(error, form.setError);
    }
  });

  return {
    form,
    submitForm,
    isEditing,
    isSubmitting,
  };
};

export { useAddEditCategories };
