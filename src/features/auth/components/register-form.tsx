"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { registerUser } from "@/features/auth/api/auth-api";
import { AUTH_FORM_STYLES } from "@/features/auth/components/auth-form-styles";
import { useTranslation } from "@/features/i18n/use-translation";
import { useAuthStore } from "@/stores/auth-store";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
};

export function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const setUser = useAuthStore((state) => state.setUser);
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user = await registerUser(values);
      setUser(user);
      router.push("/office");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      setErrorMessage(
        message === "An account with this email already exists."
          ? t("auth.accountExists")
          : message === "Invalid registration data."
            ? t("auth.invalidRegistrationData")
            : t("auth.registerError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={AUTH_FORM_STYLES.card}>
      <div className="mb-7">
        <p className={AUTH_FORM_STYLES.eyebrow}>{t("auth.newTeammate")}</p>
        <h2 className={AUTH_FORM_STYLES.title}>{t("auth.claimYourDesk")}</h2>
        <p className={AUTH_FORM_STYLES.description}>
          {t("auth.registerDescription")}
        </p>
      </div>

      <form className={AUTH_FORM_STYLES.form} onSubmit={handleSubmit}>
        <div className={AUTH_FORM_STYLES.field}>
          <label
            className={AUTH_FORM_STYLES.label}
            htmlFor="name"
          >
            {t("auth.name")}
          </label>
          <input
            autoComplete="name"
            className={AUTH_FORM_STYLES.input}
            id="name"
            minLength={2}
            name="name"
            onChange={(event) =>
              setValues((currentValues) => ({
                ...currentValues,
                name: event.target.value,
              }))
            }
            placeholder={t("auth.namePlaceholder")}
            required
            type="text"
            value={values.name}
          />
        </div>

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
            autoComplete="new-password"
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
          {isSubmitting ? t("auth.creatingAccount") : t("auth.createIdentity")}
        </button>
      </form>

      <p className={AUTH_FORM_STYLES.footer}>
        {t("auth.alreadyHaveAccount")}{" "}
        <Link
          className={AUTH_FORM_STYLES.link}
          href="/auth/login"
        >
          {t("auth.logIn")}
        </Link>
      </p>
    </div>
  );
}
