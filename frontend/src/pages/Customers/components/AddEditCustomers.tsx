import type { ICustomerResponseSchema } from "@/api/customers/customer-api.types";
import UiButton from "@/components/ui/Buttons/UiButton";
import UiDrawer from "@/components/ui/Drawer/UiDrawer";
import UiInput from "@/components/ui/Input/UiInput";
import UiSwitch from "@/components/ui/Input/UiSwitch";
import UiTextarea from "@/components/ui/Input/UiTextarea";
import { Building2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { useAddEditCustomers } from "../hooks/useAddEditCustomers";

interface IAddEditCustomersProps {
  isOpen: boolean;
  customer?: ICustomerResponseSchema;
  onClose: () => void;
}

const CUSTOMER_FORM_ID = "add-edit-customer-form";

const AddEditCustomers = ({
  isOpen,
  customer,
  onClose,
}: IAddEditCustomersProps) => {
  const { form, submitForm, isEditing, isSubmitting } = useAddEditCustomers({
    customer,
    isOpen,
    onSuccess: onClose,
  });

  return (
    <UiDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      size="xl"
      title={isEditing ? "Edit customer" : "Add customer"}
      description={
        isEditing
          ? `Editing "${customer?.businessName}"`
          : "Register a new business customer."
      }
      icon={<Building2 className="size-5" aria-hidden="true" />}
      bodyClassName="p-6"
      footer={
        <div className="flex items-center justify-between gap-3">
          <UiButton disabled={isSubmitting} onClick={onClose}>
            Cancel
          </UiButton>
          <UiButton
            type="submit"
            form={CUSTOMER_FORM_ID}
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEditing ? "Save changes" : "Create customer"}
          </UiButton>
        </div>
      }
    >
      <form
        id={CUSTOMER_FORM_ID}
        className="space-y-5"
        onSubmit={submitForm}
        noValidate
      >
        <UiInput
          label="Business name"
          required
          placeholder="e.g. Acme Retail Pvt. Ltd."
          error={form.formState.errors.businessName?.message}
          inputClassName="h-11 rounded-lg"
          disabled={isSubmitting}
          autoFocus
          {...form.register("businessName")}
        />

        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-soft">
            Primary contact
          </h3>
        </div>

        <UiInput
          label="Contact person"
          required
          placeholder="Full name"
          error={form.formState.errors.contactPersonName?.message}
          inputClassName="h-11 rounded-lg"
          disabled={isSubmitting}
          {...form.register("contactPersonName")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <UiInput
            type="tel"
            label="Phone"
            required
            placeholder="+91 98765 43210"
            error={form.formState.errors.phone?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("phone")}
          />
          <UiInput
            type="email"
            label="Email"
            placeholder="contact@business.com"
            error={form.formState.errors.email?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("email")}
          />
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-soft">
            Addresses
          </h3>
        </div>

        <UiTextarea
          label="Billing address"
          required
          placeholder="Street, building, area..."
          error={form.formState.errors.billingAddress?.message}
          textareaClassName="min-h-24"
          disabled={isSubmitting}
          {...form.register("billingAddress")}
        />

        <UiTextarea
          label="Shipping address"
          required
          placeholder="Street, building, area..."
          error={form.formState.errors.shippingAddress?.message}
          textareaClassName="min-h-24"
          disabled={isSubmitting}
          {...form.register("shippingAddress")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <UiInput
            label="City"
            required
            placeholder="Bengaluru"
            error={form.formState.errors.city?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("city")}
          />
          <UiInput
            label="State / Region"
            placeholder="Karnataka"
            error={form.formState.errors.state?.message}
            inputClassName="h-11 rounded-lg"
            disabled={isSubmitting}
            {...form.register("state")}
          />
        </div>

        <UiInput
          label="GST number"
          placeholder="29ABCDE1234F1Z5"
          error={form.formState.errors.gstNumber?.message}
          inputClassName="h-11 rounded-lg uppercase"
          disabled={isSubmitting}
          {...form.register("gstNumber")}
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
              description="Inactive customers cannot be selected for new orders."
            />
          )}
        />
      </form>
    </UiDrawer>
  );
};

export default AddEditCustomers;
export type { IAddEditCustomersProps };
