export default function useModDateTime(
  pubDateTime: Date | string,
  modDateTime: Date | string | undefined | null
) {
  return modDateTime && modDateTime > pubDateTime;
}
