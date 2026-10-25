export const seasons = ["primavera", "verano", "otono", "invierno"];
export const seasonNames = {
  primavera: "Primavera",
  verano: "Verano",
  otono: "Otoño",
  invierno: "Invierno",
};
export const normalize = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function matches(entry, query) {
  const text = normalize(
    [
      entry.title,
      entry.summary,
      entry.category,
      ...(entry.tags || []),
      ...(entry.sections || []).map(
        (s) => `${s.title} ${s.text} ${(s.items || []).join(" ")}`,
      ),
    ].join(" "),
  );
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}
export function calculateHarvest(crop, day, plots) {
  const remaining = 28 - Number(day);
  const first = crop.days;
  const harvests =
    remaining < first
      ? 0
      : crop.regrow
        ? 1 + Math.floor((remaining - first) / crop.regrow)
        : Math.floor(remaining / first);
  const seeds = crop.regrow ? 1 : Math.max(1, harvests);
  const yieldPerHarvest =
    { blueberry: 3, cranberries: 2, "coffee-bean": 4 }[crop.id] || 1;
  const revenue = harvests * yieldPerHarvest * crop.sell * Number(plots);
  const cost = crop.seed === null ? null : seeds * crop.seed * Number(plots);
  return {
    harvests,
    yieldPerHarvest,
    revenue,
    cost,
    profit: cost === null ? null : revenue - cost,
  };
}
export function getRoute(hash) {
  try {
    return decodeURIComponent(hash.slice(1)) || "inicio";
  } catch {
    return "pagina-no-encontrada";
  }
}
export function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(`ligia-v1-${key}`));
    if (Array.isArray(fallback))
      return Array.isArray(value) && value.every((v) => typeof v === "string")
        ? value
        : fallback;
    return typeof value === typeof fallback && value !== null
      ? value
      : fallback;
  } catch {
    return fallback;
  }
}
