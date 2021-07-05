export function formatDate(date) {
  const newDate = new Date(date).toLocaleDateString("pt-BR", {
    dayPeriod: "narrow",
    hour: "2-digit",
    minute: "2-digit",
  });

  const splitedDate = newDate.split(" ");
  return `${splitedDate[0]} às ${splitedDate[1]}`;
}
