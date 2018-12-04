export function createPlaceholderWith(thisProperty, thisValue) {
  const placeholder = {};

  placeholder[thisProperty] = thisValue || '-';

  return placeholder;
}