import type { IWarehouseResponseSchema } from "@/api/warehouses/warehouse-api.types";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiDrawer from "@/components/ui/Drawer/UiDrawer";
import UiInput from "@/components/ui/Input/UiInput";
import UiSwitch from "@/components/ui/Input/UiSwitch";
import UiTextarea from "@/components/ui/Input/UiTextarea";
import { Warehouse } from "lucide-react";
import { Controller } from "react-hook-form";
import { useAddEditWarehouses } from "../hooks/useAddEditWarehouses";

interface IAddEditWarehousesProps {
  isOpen: boolean;
  warehouse?: IWarehouseResponseSchema;
  onClose: () => void;
}

const WAREHOUSE_FORM_ID = "add-edit-warehouse-form";

const AddEditWarehouses = ({
  isOpen,
  warehouse,
  onClose,
}: IAddEditWarehousesProps) => {
  const { form, submitForm, isEditing, isSubmitting } =
    useAddEditWarehouses({
      warehouse,
      isOpen,
      onSuccess: onClose,
    });

  return (
    <UiDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      size="xl"
      title={isEditing ? "Edit warehouse" : "Add warehouse"}
      description={
        isEditing
          ? `Editing "${warehouse?.name}"`
          : "Register a new stocking location."
      }
      icon={<Warehouse className="size-5" aria-hidden="true" />}
      bodyClassName="p-6"
      footer={
        <div className="flex items-center justify-between gap-3">
          <UiButton disabled={isSubmitting} onClick={onClose}>
            Cancel
          </UiButton>
          <UiButton
            type="submit"
            form={WAREHOUSE_FORM_ID}
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEditing ? "Save changes" : "Create warehouse"}
          </UiButton>
        </div>
      }
    >
      <form
        id={WAREHOUSE_FORM_ID}
        className="space-y-5"
        onSubmit={submitForm}
        noValidate
      >
        <UiInput
          label="Warehouse name"
          required
          placeholder="e.g. Main Warehouse"
          error={form.formState.errors.name?.message}
          inputClassName="h-11 rounded-lg"
          disabled={isSubmitting}
          autoFocus
          {...form.register("name")}
        />

        <UiInput
          label="Code"
          required
          placeholder="WH-NY-01"
          helperText="Must be unique, for example WH-NY-01."
          error={form.formState.errors.code?.message}
          inputClassName="h-11 rounded-lg uppercase"
          disabled={isSubmitting}
          {...form.register("code")}
        />

        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-soft">
            Location
          </h3>
        </div>

        <UiTextarea
          label="Address"
          placeholder="Street, building, floor..."
          error={form.formState.errors.address?.message}
          textareaClassName="min-h-24"
          disabled={isSubmitting}
          {...form.register("address")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <UiInput
            label="City"
            required
            placeholder="New York"
            error={form.formState.errors.city?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("city")}
          />
          <UiInput
            label="State / Region"
            placeholder="NY"
            error={form.formState.errors.state?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("state")}
          />
        </div>

        <Controller
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <UiSwitch
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              label="Active"
              description="Inactive warehouses can't receive new stock."
            />
          )}
        />
      </form>
    </UiDrawer>
  );
};

export default AddEditWarehouses;
export type { IAddEditWarehousesProps };
