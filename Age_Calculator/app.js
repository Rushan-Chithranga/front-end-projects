document.addEventListener("DOMContentLoaded", () => {
  const flatpickrInput = flatpickr("#birthdate", {
    dateFormat: "d/m/Y",
  });

  const form = document.getElementById("age-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const birthdateValue = document.getElementById("birthdate").value;

    if (!birthdateValue) {
      resultDiv.textContent = "Please enter a valid date.";
      return;
    }

    const [day, month, year] = birthdateValue.split("/").map(Number);
    const birthDate = luxon.DateTime.fromObject({ day, month, year });
    const today = luxon.DateTime.now();

    if (!birthDate.isValid || birthDate > today) {
      resultDiv.textContent = "Please enter a valid past date.";
      return;
    }

    const diff = today.diff(birthDate, ["years", "months", "days"]).toObject();
    const ageYears = Math.floor(diff.years);
    const ageMonths = Math.floor(diff.months);
    const ageDays = Math.floor(diff.days);

    resultDiv.innerHTML = `You are <strong>${ageYears} years ${ageMonths} months</strong> old.`;
  });
});
