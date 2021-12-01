export const saveToLS = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const getFromLS = (name = "myData") =>
  JSON.parse(localStorage.getItem(name));
export const removeFromLS = (name = "myData") => localStorage.removeItem(name);
export const getToken = () => {
  return JSON.parse(localStorage.getItem("myData")).token;
};
