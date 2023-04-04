export function creationDate() {
  let currentDate = new Date();

  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  console.log(new Date().getDate());

  return `${month}/${day}/${year}`;
}
