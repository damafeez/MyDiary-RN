export const truncate = (string, length) => {
  const _string = string.replace(/\n/g, " ");
  const truncated = `${_string.substring(0, length).trim()}...`;
  return _string.length <= truncated.length ? _string : truncated;
}
