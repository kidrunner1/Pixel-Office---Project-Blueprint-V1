import { RegisterForm } from "@/features/auth/components/register-form";
import { PublicAuthLayout } from "@/features/public/components/public-auth-layout";

export default function RegisterPage() {
  return (
    <PublicAuthLayout variant="register">
      <RegisterForm />
    </PublicAuthLayout>
  );
}
