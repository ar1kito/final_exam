const form = document.querySelector(".inputs form");
const fields = {
  fn: {
    el: document.getElementById("fn"),
    regex: /^[a-zA-Z\s]{2,}$/,
    msg: "First name must be at least 2 letters.",
  },
  ln: {
    el: document.getElementById("ln"),
    regex: /^[a-zA-Z\s]{2,}$/,
    msg: "Last name must be at least 2 letters.",
  },
  em: {
    el: document.getElementById("em"),
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    msg: "Enter a valid email address.",
  },
  phone: {
    el: document.getElementById("phone"),
    regex: /^\+?[\d\s\-]{7,15}$/,
    msg: "Enter a valid phone number.",
  },
  msg: {
    el: document.getElementById("msg"),
    regex: /^.{5,}$/,
    msg: "Message must be at least 5 characters.",
  },
};

const err = (el) => el.nextElementSibling;

const showError = (el, msg) => {
  err(el).textContent = msg;
  el.style.borderColor = "red";
};
const clearError = (el) => {
  err(el).textContent = "";
  el.style.borderColor = "";
};

Object.values(fields).forEach(({ el, regex, msg }) => {
  el.addEventListener("blur", () =>
    regex.test(el.value.trim()) ? clearError(el) : showError(el, msg),
  );
  el.addEventListener(
    "input",
    () => regex.test(el.value.trim()) && clearError(el),
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  Object.values(fields).forEach(({ el, regex, msg }) => {
    regex.test(el.value.trim())
      ? clearError(el)
      : (showError(el, msg), (valid = false));
  });
  if (valid) {
    alert("Message sent successfully!");
    form.reset();
  }
});
const cookiePopup = document.getElementById("cookiePopup");
const acceptBtn = document.getElementById("acceptCookies");

if (localStorage.getItem("cookiesAccepted")) {
  cookiePopup.classList.add("hide");
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  cookiePopup.classList.add("hide");
});
async function loadQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    const data = await response.json();

    document.getElementById("quote").textContent = `"${data.quote}"`;

    document.getElementById("author").textContent = `— ${data.author}`;
  } catch (error) {
    document.getElementById("quote").textContent = "Could not load quote.";

    console.error(error);
  }
}

loadQuote();
