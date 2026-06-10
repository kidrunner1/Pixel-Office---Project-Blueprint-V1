import type { TranslationKey } from "@/features/i18n/i18n";
import type { RoomMemberStatus } from "@/types/room";

export type StatusTone =
  | "active"
  | "focus"
  | "meeting"
  | "break"
  | "away";

export type StatusPresentation = {
  icon: string;
  labelKey: TranslationKey;
  tone: StatusTone;
};

const statusPresentations = {
  online: {
    icon: "\u{1F7E2}",
    labelKey: "status.active",
    tone: "active",
  },
  focus: {
    icon: "\u{1F4BB}",
    labelKey: "status.focus",
    tone: "focus",
  },
  meeting: {
    icon: "\u{1F5E3}",
    labelKey: "status.meeting",
    tone: "meeting",
  },
  break: {
    icon: "\u2615",
    labelKey: "status.break",
    tone: "break",
  },
  away: {
    icon: "\u{1F319}",
    labelKey: "status.away",
    tone: "away",
  },
} as const satisfies Record<RoomMemberStatus, StatusPresentation>;

export function getStatusPresentation(
  status: RoomMemberStatus,
): StatusPresentation {
  return statusPresentations[status];
}
