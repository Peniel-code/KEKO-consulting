// Animation au défilement pour les sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Navigation fluide
const links = document.querySelectorAll("a[href^='#']");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Ajustez pour compenser la hauteur du header
        behavior: "smooth",
      });
    }
  });
});

// Gestion du formulaire de contact
const form = document.getElementById("whatsapp-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("nom").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && message) {
      const whatsappUrl = `https://wa.me/22891237742?text=${encodeURIComponent(
        `Bonjour, je suis ${name}. ${message}`
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("Veuillez remplir tous les champs avant d'envoyer votre message.");
    }
  });
}

// Effet au survol des cartes de services
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  });
});

// Bouton "Retour en haut"
const backToTopButton = document.createElement("button");
backToTopButton.textContent = "↑";
backToTopButton.classList.add("back-to-top");
document.body.appendChild(backToTopButton);

backToTopButton.style.position = "fixed";
backToTopButton.style.bottom = "20px";
backToTopButton.style.right = "20px";
backToTopButton.style.padding = "10px 15px";
backToTopButton.style.fontSize = "1.2rem";
backToTopButton.style.backgroundColor = "#005baa";
backToTopButton.style.color = "#fff";
backToTopButton.style.border = "none";
backToTopButton.style.borderRadius = "50%";
backToTopButton.style.cursor = "pointer";
backToTopButton.style.display = "none";
backToTopButton.style.zIndex = "1000";

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      // Cache le header quand on défile vers le bas
      header.classList.remove("visible");
    } else {
      // Affiche le header quand on défile vers le haut
      header.classList.add("visible");
    }
    lastScrollY = window.scrollY;
  });

  // Affiche le header au chargement initial
  header.classList.add("visible");
});
