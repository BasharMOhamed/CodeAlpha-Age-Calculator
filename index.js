const checkError = (element, elementInput) => {
  if (!element.classList.contains("error")) {
    element.classList.add("error");
    elementInput.classList.add("error");
  }
};

const clearError = (element, elementInput) => {
  if (element.classList.contains("error")) {
    element.classList.remove("error");
    elementInput.classList.remove("error");
    const Ps = document.getElementsByTagName("p");
    for (let i = 0; i < Ps.length; i++) {
      Ps[i].classList.remove("shown");
    }
  }
};

const calculate = () => {
  const day = document.getElementById("Day");
  const month = document.getElementById("Month");
  const year = document.getElementById("Year");

  const dayInput = document.getElementById("day-input");
  const monthInput = document.getElementById("month-input");
  const yearInput = document.getElementById("year-input");

  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");
  let correct = true;
  const currentDate = new Date();
  const birthDate = new Date(`${year.value}-${month.value}-${day.value}`);

  // Clear previous errors
  clearError(day, dayInput);
  clearError(month, monthInput);
  clearError(year, yearInput);

  if (currentDate - birthDate < 0) {
    checkError(day, dayInput);
    checkError(month, monthInput);
    checkError(year, yearInput);
    correct = false;
    dayError.classList.add("shown");
    dayError.innerHTML = "Must be a valid date";
  }
  // Check for invalid day
  if (day.value < 1 || day.value > 31) {
    checkError(day, dayInput);
    correct = false;
    dayError.classList.add("shown");
    dayError.innerHTML = "Must be a valid day";
  }

  // Check for invalid month
  if (month.value < 1 || month.value > 12) {
    console.log(typeof month);
    checkError(month, monthInput);
    correct = false;
    monthError.classList.add("shown");
    monthError.innerHTML = "Must be a valid month";
  }

  // Check for invalid year
  if (year.value > currentDate.getFullYear()) {
    checkError(year, yearInput);
    correct = false;
    yearError.classList.add("shown");
    yearError.innerHTML = "Must be a valid year";
  }

  // Check for empty values
  if (
    day.value.trim() === 0 ||
    month.value.trim() === 0 ||
    year.value.trim() == 0
  ) {
    correct = false;
    if (!day.value) {
      checkError(day, dayInput);
      dayError.classList.add("shown");
      dayError.innerHTML = "This value is required";
    }
    if (!monthInput.value) {
      checkError(month, monthInput);
      monthError.classList.add("shown");
      monthError.innerHTML = "This value is required";
    }
    if (!yearInput.value) {
      checkError(year, yearInput);
      yearError.classList.add("shown");
      yearError.innerHTML = "This value is required";
    }
  }

  if (!correct) {
    const spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
      spans[i].innerHTML = "--";
    }
  }
  if (correct) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    console.log(`${years} years ${months} months ${days} days`);
    document.getElementById("days").innerHTML = days;
    document.getElementById("months").innerHTML = months;
    document.getElementById("years").innerHTML = years;
  }
};

document.getElementById("submit-btn").addEventListener("click", calculate);
