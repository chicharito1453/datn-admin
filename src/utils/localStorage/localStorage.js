export const saveToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const getFromLocalStorage = (name) =>
  JSON.parse(localStorage.getItem(name));
