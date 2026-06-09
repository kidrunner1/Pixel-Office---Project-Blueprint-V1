import type { TranslationKey } from "@/features/i18n/i18n";

export type PublicCtaLink = {
  href: string;
  labelKey: TranslationKey;
  variant: "primary" | "secondary" | "text";
};

export type PublicFeature = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  detailKey: TranslationKey;
  accent: "amber" | "teal" | "coral" | "blue";
};

export type PublicStep = {
  number: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

export const PUBLIC_CTA_LINKS = [
  {
    href: "/office",
    labelKey: "common.enterOffice",
    variant: "primary",
  },
  {
    href: "/auth/register",
    labelKey: "common.createAccount",
    variant: "secondary",
  },
  {
    href: "/auth/login",
    labelKey: "common.signIn",
    variant: "text",
  },
] as const satisfies readonly PublicCtaLink[];

export const PUBLIC_FEATURES = [
  {
    titleKey: "public.featureMovementTitle",
    descriptionKey: "public.featureMovementDescription",
    detailKey: "public.featureMovementDetail",
    accent: "amber",
  },
  {
    titleKey: "public.featureChatTitle",
    descriptionKey: "public.featureChatDescription",
    detailKey: "public.featureChatDetail",
    accent: "teal",
  },
  {
    titleKey: "public.featureAvatarTitle",
    descriptionKey: "public.featureAvatarDescription",
    detailKey: "public.featureAvatarDetail",
    accent: "coral",
  },
  {
    titleKey: "public.featurePresenceTitle",
    descriptionKey: "public.featurePresenceDescription",
    detailKey: "public.featurePresenceDetail",
    accent: "blue",
  },
] as const satisfies readonly PublicFeature[];

export const PUBLIC_STEPS = [
  {
    number: "01",
    titleKey: "public.stepAvatarTitle",
    descriptionKey: "public.stepAvatarDescription",
  },
  {
    number: "02",
    titleKey: "public.stepJoinTitle",
    descriptionKey: "public.stepJoinDescription",
  },
  {
    number: "03",
    titleKey: "public.stepTogetherTitle",
    descriptionKey: "public.stepTogetherDescription",
  },
] as const satisfies readonly PublicStep[];
