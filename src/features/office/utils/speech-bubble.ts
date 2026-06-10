export const SPEECH_BUBBLE_MAX_GRAPHEMES = 40;

const graphemeSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, {
        granularity: "grapheme",
      })
    : null;

function splitGraphemes(message: string): string[] {
  if (!graphemeSegmenter) {
    return Array.from(message);
  }

  return Array.from(
    graphemeSegmenter.segment(message),
    ({ segment }) => segment,
  );
}

export function formatSpeechBubbleMessage(message: string): string {
  const normalizedMessage = message.trim().replace(/\s+/gu, " ");
  const graphemes = splitGraphemes(normalizedMessage);

  if (graphemes.length <= SPEECH_BUBBLE_MAX_GRAPHEMES) {
    return normalizedMessage;
  }

  return `${graphemes
    .slice(0, SPEECH_BUBBLE_MAX_GRAPHEMES - 1)
    .join("")
    .trimEnd()}…`;
}
