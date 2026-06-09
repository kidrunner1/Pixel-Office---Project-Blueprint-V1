"use client";

import { useEffect, useState } from "react";

import { AvatarPreview } from "@/features/avatar/components/avatar-preview";
import type { TranslationKey } from "@/features/i18n/i18n";
import { useTranslation } from "@/features/i18n/use-translation";
import {
  avatarAccessoryOptions,
  avatarFaceOptions,
  avatarHairColorOptions,
  avatarHairOptions,
  avatarPantsOptions,
  avatarShirtColorOptions,
  avatarShirtOptions,
  avatarSkinColorOptions,
} from "@/lib/validations/avatar";
import { useAvatarStore } from "@/stores/avatar-store";
import type {
  AvatarAccessory,
  AvatarConfig,
  UpdateAvatarInput,
} from "@/types/avatar";

type AvatarFieldConfig = {
  id: keyof UpdateAvatarInput;
  labelKey: TranslationKey;
  options: readonly string[];
};

const defaultAvatar: AvatarConfig = {
  hair: "short",
  hairColor: "black",
  face: "default",
  skinColor: "medium",
  shirt: "basic",
  shirtColor: "blue",
  pants: "basic",
  accessory: null,
};

const fields: AvatarFieldConfig[] = [
  { id: "hair", labelKey: "avatar.hair", options: avatarHairOptions },
  {
    id: "hairColor",
    labelKey: "avatar.hairColor",
    options: avatarHairColorOptions,
  },
  { id: "face", labelKey: "avatar.face", options: avatarFaceOptions },
  {
    id: "skinColor",
    labelKey: "avatar.skinColor",
    options: avatarSkinColorOptions,
  },
  { id: "shirt", labelKey: "avatar.shirt", options: avatarShirtOptions },
  {
    id: "shirtColor",
    labelKey: "avatar.shirtColor",
    options: avatarShirtColorOptions,
  },
  { id: "pants", labelKey: "avatar.pants", options: avatarPantsOptions },
  {
    id: "accessory",
    labelKey: "avatar.accessory",
    options: avatarAccessoryOptions,
  },
];

function normalizeAccessory(value: string): AvatarAccessory | null {
  return value === "none" ? null : (value as AvatarAccessory);
}

type AvatarCustomizerProps = {
  compact?: boolean;
};

export function AvatarCustomizer({
  compact = false,
}: AvatarCustomizerProps) {
  const { t } = useTranslation();
  const isLoading = useAvatarStore((state) => state.isLoading);
  const storeError = useAvatarStore((state) => state.error);
  const fetchAvatar = useAvatarStore((state) => state.fetchAvatar);
  const updateAvatar = useAvatarStore((state) => state.updateAvatar);
  const [draftAvatar, setDraftAvatar] = useState<AvatarConfig>(defaultAvatar);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAvatar() {
      const loadedAvatar = await fetchAvatar();

      if (isMounted && loadedAvatar) {
        setDraftAvatar(loadedAvatar);
      }
    }

    void loadAvatar();

    return () => {
      isMounted = false;
    };
  }, [fetchAvatar]);

  async function handleSave() {
    setSuccessMessage(null);
    setLocalError(null);

    try {
      await updateAvatar(draftAvatar);
      setSuccessMessage(t("avatar.saved"));
    } catch {
      setLocalError(t("avatar.saveError"));
    }
  }

  return (
    <section
      className={
        compact
          ? ""
          : "rounded-md border-2 border-slate-800 bg-[#0b1730] p-5 shadow-[4px_4px_0_#030712]"
      }
    >
      <div
        className={
          compact ? "space-y-4" : "flex flex-col gap-6 lg:flex-row"
        }
      >
        <div className={compact ? "" : "lg:w-56"}>
          <h2
            className={
              compact
                ? "text-base font-semibold text-cyan-100"
                : "text-lg font-semibold text-cyan-100"
            }
          >
            {t("avatar.customizer")}
          </h2>
          <p
            className={[
              "mt-1 text-cyan-200",
              compact ? "text-xs leading-5" : "mt-2 text-sm leading-6",
            ].join(" ")}
          >
            {t("avatar.description")}
          </p>

          <div
            className={
              compact
                ? "mt-3 flex justify-center border border-slate-800 bg-slate-950/50 py-2"
                : "mt-6"
            }
          >
            <AvatarPreview
              avatar={draftAvatar}
              showCaption={!compact}
              size={compact ? "small" : "large"}
            />
          </div>
        </div>

        <div className="flex-1">
          <div
            className={
              compact
                ? "grid grid-cols-2 gap-2"
                : "grid gap-4 sm:grid-cols-2"
            }
          >
            {fields.map((field) => {
              const selectedValue =
                field.id === "accessory"
                  ? draftAvatar.accessory ?? "none"
                  : draftAvatar[field.id];

              return (
                <label
                  className={compact ? "space-y-1" : "space-y-2"}
                  htmlFor={field.id}
                  key={field.id}
                >
                  <span
                    className={[
                      "block font-medium text-cyan-200",
                      compact ? "text-[11px]" : "text-sm",
                    ].join(" ")}
                  >
                    {t(field.labelKey)}
                  </span>
                  <select
                    className={[
                      "w-full rounded border-2 border-cyan-900 bg-slate-950 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20",
                      compact ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm",
                    ].join(" ")}
                    disabled={isLoading}
                    id={field.id}
                    onChange={(event) => {
                      const value = event.target.value;

                      setDraftAvatar((currentAvatar) => ({
                        ...currentAvatar,
                        [field.id]:
                          field.id === "accessory"
                            ? normalizeAccessory(value)
                            : value,
                      }));
                    }}
                    value={selectedValue}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {t(`avatar.option.${option}` as TranslationKey)}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>

          {storeError || localError ? (
            <p className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {localError ?? (storeError ? t("avatar.loadError") : null)}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {successMessage}
            </p>
          ) : null}

          <div
            className={[
              "flex justify-end",
              compact ? "mt-4" : "mt-6",
            ].join(" ")}
          >
            <button
              className="rounded border-2 border-cyan-200 bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-[3px_3px_0_#155e75] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
              disabled={isLoading}
              onClick={handleSave}
              type="button"
            >
              {isLoading ? t("common.saving") : t("avatar.save")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
