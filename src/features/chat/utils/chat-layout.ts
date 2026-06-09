export const EXPANDED_DESKTOP_CHAT_WIDTH = 304;
export const COLLAPSED_DESKTOP_CHAT_WIDTH = 44;

export function getDesktopChatWidth(isExpanded: boolean): number {
  return isExpanded
    ? EXPANDED_DESKTOP_CHAT_WIDTH
    : COLLAPSED_DESKTOP_CHAT_WIDTH;
}
