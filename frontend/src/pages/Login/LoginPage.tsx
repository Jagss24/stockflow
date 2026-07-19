import loginIllustration from "@/assets/stockflow-login-illustration.svg";
import { Package } from "lucide-react";
import LoginForm from "./components/LoginForm";
import useLoginForm from "./hooks/useLoginForm";

const LoginPage = () => {
  const { form, loginMutation, onSubmit } = useLoginForm();

  return (
    <main className="grid min-h-screen bg-surface lg:grid-cols-[1.08fr_0.92fr]">
      <section className="hidden min-h-screen flex-col justify-between bg-background px-12 py-12 lg:flex xl:px-20">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-surface shadow-card">
            <Package className="size-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-heading">
            StockFlow
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <img
            src={loginIllustration}
            alt="StockFlow inventory dashboard illustration"
            className="w-full max-w-4xl"
          />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading">
            Real-time inventory, every warehouse, one view.
          </h2>
          <p className="mt-4 text-lg leading-8 text-text-muted">
            Track stock, shipments, and orders across every location — synced
            the moment something moves.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-xl">
          <div className="mb-12 lg:hidden">
            <div className="flex items-center justify-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-surface shadow-card">
                <Package className="size-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-heading">
                StockFlow
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-heading">
              Welcome back
            </h1>
            <p className="mt-3 text-lg font-medium text-text-muted">
              Sign in to your StockFlow account to continue.
            </p>
          </div>

          <LoginForm
            form={form}
            isSubmitting={loginMutation.isPending}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
