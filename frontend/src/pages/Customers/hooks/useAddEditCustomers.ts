import type { ICustomerResponseSchema } from "@/api/customers/customer-api.types";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "@/api/customers/customer.mutation";
import { setApiFormErrors } from "@/lib/formErrors";
import { handleSuccessToast } from "@/lib/toast";
import {
  customerFormSchema,
  type TCustomerFormSchema,
} from "@/pages/Customers/customer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUseAddEditCustomersProps {
  customer?: ICustomerResponseSchema;
  isOpen: boolean;
  onSuccess: () => void;
}

const getDefaultValues = (
  customer?: ICustomerResponseSchema,
): TCustomerFormSchema => ({
  businessName: customer?.businessName ?? "",
  contactPersonName: customer?.contactPersonName ?? "",
  email: customer?.email ?? "",
  phone: customer?.phone ?? "",
  billingAddress: customer?.billingAddress ?? "",
  shippingAddress: customer?.shippingAddress ?? "",
  city: customer?.city ?? "",
  state: customer?.state ?? "",
  gstNumber: customer?.gstNumber ?? "",
  isActive: customer?.isActive ?? true,
});

const useAddEditCustomers = ({
  customer,
  isOpen,
  onSuccess,
}: IUseAddEditCustomersProps) => {
  const form = useForm<TCustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: getDefaultValues(customer),
  });
  const createMutation = useCreateCustomerMutation();
  const updateMutation = useUpdateCustomerMutation();
  const isEditing = Boolean(customer);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isOpen) form.reset(getDefaultValues(customer));
  }, [customer, form, isOpen]);

  const submitForm = form.handleSubmit(async (values) => {
    const payload = {
      businessName: values.businessName,
      contactPersonName: values.contactPersonName,
      email: values.email,
      phone: values.phone,
      billingAddress: values.billingAddress,
      shippingAddress: values.shippingAddress,
      city: values.city,
      state: values.state,
      gstNumber: values.gstNumber,
      isActive: values.isActive,
    };

    try {
      if (customer) {
        await updateMutation.mutateAsync({ id: customer.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      handleSuccessToast({
        message: isEditing
          ? "Customer updated successfully."
          : "Customer created successfully.",
      });
      onSuccess();
    } catch (error) {
      setApiFormErrors(error, form.setError);
    }
  });

  return { form, submitForm, isEditing, isSubmitting };
};

export { useAddEditCustomers };
