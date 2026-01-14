// Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");
  const langLinks = document.querySelectorAll(".lang-link");

  function closeMenu() {
    if (menuToggle) menuToggle.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (menuToggle) menuToggle.classList.add("active");
    if (menuOverlay) menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Toggle menu
  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener("click", () => {
      if (menuOverlay.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button
    if (menuClose) {
      menuClose.addEventListener("click", closeMenu);
    }

    // Close menu when clicking on overlay nav links
    const overlayLinks = menuOverlay.querySelectorAll(".overlay-nav a");
    overlayLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // Language switching
  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = link.getAttribute("data-lang");

      // Update active state
      langLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Store language preference
      localStorage.setItem("language", lang);

      // Show/hide Shop menu in overlay based on language
      const overlayShopLinks = document.querySelectorAll(
        '.overlay-nav a[href*="shop"]'
      );
      overlayShopLinks.forEach((shopLink) => {
        if (lang === "en") {
          shopLink.style.display = "none";
        } else {
          shopLink.style.display = "";
        }
      });

      // Apply language change immediately
      applyLanguageChange(lang);
    });
  });

  // Function to apply language changes
  function applyLanguageChange(lang) {
    // Update Shop menu visibility in header
    const headerShopLinks = document.querySelectorAll(
      'header nav a[href*="shop"]'
    );
    headerShopLinks.forEach((link) => {
      if (lang === "en") {
        link.style.display = "none";
      } else {
        link.style.display = "";
      }
    });

    // Trigger language switcher if available
    if (window.languageSwitcher) {
      window.languageSwitcher.switchLanguage(lang);
    }

    // Update all data-i18n elements manually
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      // This will be handled by languageSwitcher, but we ensure it happens
      const key = element.getAttribute("data-i18n");
      if (window.languageSwitcher) {
        const translation = window.languageSwitcher.getTranslation(key, lang);
        if (translation) {
          element.textContent = translation;
        }
      }
    });

    // Update Shop tooltips if available
    if (window.updateShopTooltips) {
      window.updateShopTooltips(lang);
    }

    // Update project loader if available
    if (window.projectLoader) {
      window.projectLoader.updateLanguage(lang);
    }
  }

  // Load saved language preference and apply to overlay menu
  const savedLang = localStorage.getItem("language") || "kr";
  langLinks.forEach((link) => {
    if (link.getAttribute("data-lang") === savedLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Apply initial language state to overlay menu
  const overlayShopLinks = document.querySelectorAll(
    '.overlay-nav a[href*="shop"]'
  );
  overlayShopLinks.forEach((shopLink) => {
    if (savedLang === "en") {
      shopLink.style.display = "none";
    } else {
      shopLink.style.display = "";
    }
  });

  // Apply saved language to page on load
  if (savedLang) {
    // Wait a bit for languageSwitcher to be ready
    setTimeout(() => {
      if (
        window.languageSwitcher &&
        window.languageSwitcher.getCurrentLang() !== savedLang
      ) {
        window.languageSwitcher.switchLanguage(savedLang);
      }
    }, 100);
  }
});
