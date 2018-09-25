// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors) {
  return errors.reduce((acc, val) => ({ ...acc, [val.field]: val.message }), {})
}
