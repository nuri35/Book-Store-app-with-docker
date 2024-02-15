export function transformProperty(value: any, propertyName?: string) {
  if (typeof value !== 'string') {
    return false;
  }

  if (propertyName === 'mail') {
    return value.toLowerCase();
  }

  const lowerCased = value.toLowerCase();
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
}
