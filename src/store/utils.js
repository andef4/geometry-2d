export function addPrefix (prefix, obj) {
  const keyValues = Object.keys(obj).map(key => {
    return { [prefix + key]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}
