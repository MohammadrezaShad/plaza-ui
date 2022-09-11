export function isPlainObject(item: unknown) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export default function deepMerge(
  target: any,
  source: any,
  options = {clone: true},
) {
  const output = options.clone ? {...target} : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      // Avoid prototype pollution
      if (key === '__proto__') return;

      if (isPlainObject(source[key]) && key in target) {
        output[key] = deepMerge(target[key], source[key], options);
      } else output[key] = source[key];
    });
  }

  return output;
}
