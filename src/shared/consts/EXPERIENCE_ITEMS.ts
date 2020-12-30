export const EXPERIENCE_ITEMS = Array.from({ length: 30 }, (_, idx) => idx + 1).map((idx) =>
  idx !== 1 ? `${idx} years` : `${idx} year`
);
