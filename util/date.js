export const getFormattedDate = (date) => {
  // let month = date.getMonth() + 1;
  // if (month < 10) {
  //   month = "0" + month;
  // }

  // let day = date.getDate();
  // if (day < 10) {
  //   day = "0" + day;
  // }

  // return `${date.getFullYear()}-${month}-${day}`;
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
