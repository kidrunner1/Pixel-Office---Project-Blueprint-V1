import { LoginForm } from "@/features/auth/components/login-form";
import { PublicAuthLayout } from "@/features/public/components/public-auth-layout";

export default function LoginPage() {
  return (
    <PublicAuthLayout variant="login">
      <LoginForm />
    </PublicAuthLayout>
  );
}
