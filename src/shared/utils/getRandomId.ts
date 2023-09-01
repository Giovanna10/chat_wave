export const getRandomId = () => {
  const caratteriPermesse =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 4; i++) {
    const indiceCasuale = Math.floor(Math.random() * caratteriPermesse.length);
    id += caratteriPermesse.charAt(indiceCasuale);
  }

  return id;
};
