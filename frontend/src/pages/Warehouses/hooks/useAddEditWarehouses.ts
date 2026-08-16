import type { IWarehouseResponseSchema } from "@/api/warehouses/warehouse-api.types";
import {
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
} from "@/api/warehouses/warehouse.mutation";
import { setApiFormErrors } from "@/lib/formErrors";
import { handleSuccessToast } from "@/lib/toast";
import {
  warehouseFormSchema,
  type TWarehouseFormSchema,
} from "@/pages/Warehouses/warehouse.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUseAddEditWarehousesProps {
  warehouse?: IWarehouseResponseSchema;
  isOpen: boolean;
  onSuccess: () => void;
}

const getDefaultValues = (
  warehouse?: IWarehouseResponseSchema,
): TWarehouseFormSchema => ({
  name: warehouse?.name ?? "",
  code: warehouse?.code ?? "",
  address: warehouse?.address ?? "",
  city: warehouse?.city ?? "",
  state: warehouse?.state ?? "",
  isActive: warehouse?.isActive ?? true,
});

const useAddEditWarehouses = ({
  warehouse,
  isOpen,
  onSuccess,
}: IUseAddEditWarehousesProps) => {
  const form = useForm<TWarehouseFormSchema>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: getDefaultValues(warehouse),
  });
  const createMutation = useCreateWarehouseMutation();
  const updateMutation = useUpdateWarehouseMutation();
  const isEditing = Boolean(warehouse);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isOpen) form.reset(getDefaultValues(warehouse));
  }, [form, isOpen, warehouse]);

  const submitForm = form.handleSubmit(async (values) => {
    const payload = {
      name: values.name,
      code: values.code.toUpperCase(),
      address: values.address || undefined,
      city: values.city,
      state: values.state || undefined,
      isActive: values.isActive,
    };

    try {
      if (warehouse) {
        await updateMutation.mutateAsync({ id: warehouse.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      handleSuccessToast({
        message: isEditing
          ? "Warehouse updated successfully."
          : "Warehouse created successfully.",
      });
      onSuccess();
    } catch (error) {
      setApiFormErrors(error, form.setError);
    }
  });

  return { form, submitForm, isEditing, isSubmitting };
};

export { useAddEditWarehouses };
