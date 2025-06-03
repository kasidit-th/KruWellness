exports.file_idgenerate = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1); // Months are 0-indexed
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `D${day}M${month}Y${year}T${hours}${minutes}${seconds}`;
};

exports.Thai_to_ISO = (input_day, input_month, input_year) => {
  const thaiMonths = {
    มกราคม: 0,
    กุมภาพันธ์: 1,
    มีนาคม: 2,
    เมษายน: 3,
    พฤษภาคม: 4,
    มิถุนายน: 5,
    กรกฎาคม: 6,
    สิงหาคม: 7,
    กันยายน: 8,
    ตุลาคม: 9,
    พฤศจิกายน: 10,
    ธันวาคม: 11,
  };

  const clean = (val) =>
    String(val)
      .replace(/^["']|["']|[,]$/g, "")
      .trim();

  const inputday = parseInt(clean(input_day), 10);
  const inputmonth = clean(input_month);
  const inputyear = parseInt(clean(input_year), 10);

  const gregorianYear = inputyear - 543;
  const month = thaiMonths[inputmonth];
  const day = inputday;

  if (isNaN(day) || isNaN(gregorianYear) || month === undefined) {
    throw new Error("Invalid Thai date input");
  }

  const dateObj = new Date(gregorianYear, month, day);
  return dateObj.toISOString();
};

exports.ISO_to_Thai = (isoString) => {
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const date = new Date(isoString);

  if (isNaN(date)) {
    throw new Error("Invalid ISO date input");
  }

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const thaiYear = date.getFullYear() + 543;

  return [day,month,thaiYear];
};

exports.checkCard = (isoDateString) => {
  const inputDate = new Date(isoDateString);
  const now = new Date();

  const fourYearsLater = new Date(inputDate);
  fourYearsLater.setFullYear(inputDate.getFullYear() + 4);

  return now >= fourYearsLater;
}