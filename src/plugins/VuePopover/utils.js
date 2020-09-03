const first = (array) => {
    return Array.isArray(array) && array.length > 0 ? array[0] : null;
  };
  
  export const initializeBinding = (
    defaultPosition,
    { arg = "", modifiers = {}, value = {} }
  ) => {
    const mods = Object.keys(modifiers);
    const name = typeof value === "object" && value.name ? value.name : arg;
    const position = first(mods) || value.position || defaultPosition;
  
    return { name, position, value };
  };
  