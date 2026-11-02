/*
  HARSH EDITS — edit your contact details in the CONFIG object below.
  WhatsApp number must include country code, digits only (India: 91XXXXXXXXXX).
*/
const CONFIG = {
  whatsappNumber: "919971920648",
  instagramUrl: "https://www.instagram.com/harshhdedhaa01/",
  emailAddress: "dedhah13@gmail.com"
};

const whatsappLink = document.getElementById("whatsappLink");
const instagramLink = document.getElementById("instagramLink");
const emailLink = document.getElementById("emailLink");

const validWhatsApp = /^\d{10,15}$/.test(CONFIG.whatsappNumber) && !CONFIG.whatsappNumber.includes("X");
const validInstagram = CONFIG.instagramUrl.includes("instagram.com/") && !CONFIG.instagramUrl.includes("YOUR_INSTAGRAM_USERNAME");
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.emailAddress) && !CONFIG.emailAddress.includes("example.com");

if (validWhatsApp) {
  whatsappLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi Harsh! I saw your portfolio and would like to discuss a video editing project.")}`;
} else {
  whatsappLink.href = "#contact";
  whatsappLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Please add your WhatsApp number in script.js first.");
  });
}
if (validInstagram) {
  instagramLink.href = CONFIG.instagramUrl;
} else {
  instagramLink.href = "#contact";
  instagramLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Please add your Instagram profile link in script.js first.");
  });
}
if (validEmail) {
  emailLink.href = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent("Video editing enquiry — HARSH EDITS")}`;
} else {
  emailLink.href = "#contact";
  emailLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Please add your email address in script.js first.");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Portfolio filters
const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    workCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Pricing buttons preselect the enquiry type
document.querySelectorAll("[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const select = document.getElementById("project");
    const option = [...select.options].find(item => item.text.toLowerCase().includes(plan.split(" ")[0].toLowerCase()));
    if (option) select.value = option.value;
  });
});

// Enquiry form opens the visitor's email application; it does not store or transmit data.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!validEmail) {
    alert("Please add your email address in script.js before using the enquiry form.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const subject = `Project enquiry from ${form.get("name")} — HARSH EDITS`;
  const body = [
    `Name: ${form.get("name")}`,
    `Reply email: ${form.get("email")}`,
    `Project type: ${form.get("project")}`,
    "",
    "Project details:",
    form.get("message")
  ].join("\n");
  window.location.href = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
