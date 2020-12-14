export const isWindowScrollBottom = (offset = 200): boolean =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
