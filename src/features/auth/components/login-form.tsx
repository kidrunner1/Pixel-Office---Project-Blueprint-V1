"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { loginUser } from "@/features/auth/api/auth-api";
import { AUTH_FORM_STYLES } from "@/features/auth/components/auth-form-styles";
import { useTranslation } from "@/features/i18n/use-translation";
import { useAuthStore } from "@/stores/auth-store";

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const setUser = useAuthStore((state) => state.setUser);
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user = await loginUser(values);
      setUser(user);
      router.push("/office");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      setErrorMessage(
        message === "Invalid email or password."
          ? t("auth.invalidCredentials")
          : message === "Invalid login data."
            ? t("auth.invalidLoginData")
            : t("auth.loginError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={AUTH_FORM_STYLES.card}>
      <div className="mb-7">
        <p className={AUTH_FORM_STYLES.eyebrow}>{t("auth.memberLogin")}</p>
        <h2 className={AUTH_FORM_STYLES.title}>{t("auth.welcomeBack")}</h2>
        <p className={AUTH_FORM_STYLES.description}>
          {t("auth.loginDescription")}
        </p>
      </div>

      <form className={AUTH_FORM_STYLES.form} onSubmit={handleSubmit}>
        <div className={AUTH_FORM_STYLES.field}>
          <label
            className={AUTH_FORM_STYLES.label}
            htmlFor="email"
          >
            {t("auth.email")}
          </label>
          <input
            autoComplete="email"
            className={AUTH_FORM_STYLES.input}
            id="email"
            name="email"
            onChange={(event) =>
              setValues((currentValues) => ({
                ...currentValues,
                email: event.target.value,
              }))
            }
            placeholder={t("auth.emailPlaceholder")}
            required
            type="email"
            value={values.email}
          />
        </div>

        <div className={AUTH_FORM_STYLES.field}>
          <label
            className={AUTH_FORM_STYLES.label}
            htmlFor="password"
          >
            {t("auth.password")}
          </label>
          <input
            autoComplete="current-password"
            className={AUTH_FORM_STYLES.input}
            id="password"
            minLength={8}
            name="password"
            onChange={(event) =>
              setValues((currentValues) => ({
                ...currentValues,
                password: event.target.value,
              }))
            }
            placeholder={t("auth.passwordPlaceholder")}
            required
            type="password"
            value={values.password}
          />
        </div>

        {errorMessage ? (
          <p
            aria-live="polite"
            className={AUTH_FORM_STYLES.error}
          >
            {errorMessage}
          </p>
        ) : null}

        <button
          className={AUTH_FORM_STYLES.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? t("auth.loggingIn") : t("auth.enterOffice")}
        </button>
      </form>

      <p className={AUTH_FORM_STYLES.footer}>
        {t("auth.newToPixelOffice")}{" "}
        <Link
          className={AUTH_FORM_STYLES.link}
          href="/auth/register"
        >
          {t("auth.createAnAccount")}
        </Link>
      </p>
    </div>
  );
}
