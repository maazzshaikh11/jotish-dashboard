export const calculateVisibleRows = (
  data,
  scrollTop,
  rowHeight,
  containerHeight
) => {
  const buffer = 5;

  const visibleCount = Math.ceil(containerHeight / rowHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);

  const endIndex = Math.min(
    data.length,
    startIndex + visibleCount + buffer * 2
  );

  const visibleData = data.slice(startIndex, endIndex);

  const offsetY = startIndex * rowHeight;

  return {
    visibleData,
    offsetY,
    totalHeight: data.length * rowHeight,
  };
};