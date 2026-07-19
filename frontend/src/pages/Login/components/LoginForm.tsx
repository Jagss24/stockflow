import UiButton from "@/components/ui/Buttons/UiButton";
import UiInput from "@/components/ui/Input/UiInput";
import { LoginRequest } from "@/api/auth/auth-api.types";
import { Mail, LockKeyhole } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

type LoginFormProps = {
  form: UseFormReturn<LoginRequest>;
  isSubmitting: boolean;
  onSubmit: (values: LoginRequest) => void;
};

const LoginForm = ({ form, isSubmitting, onSubmit }: LoginFormProps) => {
  const { handleSubmit, control } = form;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <UiInput
            label="Email address"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={value}
            onChange={onChange}
            leftIcon={<Mail className="size-4" />}
            error={error?.message}
            disabled={isSubmitting}
            inputClassName="h-14 rounded-lg bg-surface-muted px-4 text-base font-medium placeholder:text-text-muted"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <UiInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={value}
            onChange={onChange}
            leftIcon={<LockKeyhole className="size-4" />}
            error={error?.message}
            disabled={isSubmitting}
            inputClassName="h-14 rounded-lg bg-surface-muted px-4 text-base font-medium placeholder:text-text-muted"
          />
        )}
      />

      <div className="-mt-1 flex items-center justify-between gap-4 text-sm font-semibold">
        <label className="flex items-center gap-3 text-text">
          <input
            type="checkbox"
            className="size-4 rounded border-border text-primary accent-primary"
            disabled={isSubmitting}
          />
          <span>Remember me</span>
        </label>

        <a
          href="#"
          className="text-primary transition hover:text-primary-hover"
        >
          Forgot password?
        </a>
      </div>

      <UiButton
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isSubmitting}
        className="mt-4 h-14 rounded-lg text-base shadow-lg shadow-primary-soft"
      >
        Log in
      </UiButton>
    </form>
  );
};

export default LoginForm;
