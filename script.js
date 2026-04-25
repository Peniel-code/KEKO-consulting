// Optimisations de performance
document.addEventListener("DOMContentLoaded", () => {
  // Lazy loading des images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Animation au défilement pour les sections (optimisée)
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    // Vérifier si la section est déjà visible au chargement
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Section déjà visible, l'afficher immédiatement
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    } else {
      // Section pas visible, la cacher et observer
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    }
  });

  // Animation pour les cartes de service
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Effet au survol des cartes de services (amélioration du survol)
  const allServiceCards = document.querySelectorAll('.service-card');
  allServiceCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
  });
});

// Gestion du formulaire de contact étendu
const form = document.getElementById("whatsapp-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("telephone").value.trim();
    const company = document.getElementById("entreprise").value.trim();
    const subject = document.getElementById("sujet").value;
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      const fullMessage = `Bonjour, je suis ${name} de ${company || 'N/A'}.
Email: ${email}
Téléphone: ${phone || 'N/A'}
Sujet: ${subject}
Message: ${message}`;

      const whatsappUrl = `https://wa.me/22891237742?text=${encodeURIComponent(fullMessage)}`;
      window.open(whatsappUrl, '_blank');
      form.reset();
    } else {
      alert('Veuillez remplir les champs obligatoires (Nom, Email, Message).');
    }
  });
}

// Animation du header au scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  }
});

// Bouton "Retour en haut" (smooth scroll)
window.addEventListener('scroll', () => {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }
});

// Créer le bouton retour en haut et ajouter le style
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '&#8593;';
backToTopButton.classList.add('back-to-top');
backToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #005599;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: none;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
`;

backToTopButton.addEventListener('mouseenter', () => {
  backToTopButton.style.backgroundColor = '#003366';
  backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
  backToTopButton.style.backgroundColor = '#005599';
  backToTopButton.style.transform = 'scale(1)';
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

if (document.body) {
  document.body.appendChild(backToTopButton);
}

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
