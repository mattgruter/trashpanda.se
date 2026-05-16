(function() {
  "use strict";

  // ─── 1. Raccoon Counter Animation ────────────────────────────────

  function animateCounter(target, duration) {
    var counter = document.getElementById("raccoon-counter");
    if (!counter) return;

    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString("sv-SE");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target.toLocaleString("sv-SE");
      }
    }

    requestAnimationFrame(step);
  }

  // ─── 2. Floating Emoji Background ────────────────────────────────

  function createFloatingEmojis() {
    var emojis = ["\uD83E\uDD9D", "\uD83D\uDDD1\uFE0F"];
    var count = 12 + Math.floor(Math.random() * 4);

    for (var i = 0; i < count; i++) {
      var span = document.createElement("span");
      var emoji = emojis[Math.floor(Math.random() * emojis.length)];

      span.textContent = emoji;
      span.style.position = "fixed";
      span.style.left = Math.random() * 100 + "vw";
      span.style.bottom = -(20 + Math.random() * 60) + "px";
      span.style.fontSize = (20 + Math.random() * 20) + "px";
      span.style.opacity = "0.1";
      span.style.pointerEvents = "none";
      span.style.zIndex = "0";
      span.style.userSelect = "none";

      var duration = 8 + Math.random() * 12;
      var delay = -(Math.random() * duration);
      span.style.animation = "floatUp " + duration + "s ease-in " + delay + "s infinite";

      document.body.appendChild(span);
    }

    var styleEl = document.createElement("style");
    styleEl.textContent = "@keyframes floatUp{0%{transform:translateY(0) rotate(0deg);opacity:0.1}50%{opacity:0.15}100%{transform:translateY(-110vh) rotate(360deg);opacity:0}}";
    document.head.appendChild(styleEl);
  }

  // ─── 3. FAQ Accordion ────────────────────────────────────────────

  function initFAQ() {
    var questions = document.querySelectorAll(".faq-question");

    for (var i = 0; i < questions.length; i++) {
      (function(q) {
        q.addEventListener("click", function() {
          var item = q.parentElement;
          var isOpen = item.classList.contains("faq-open");
          item.classList.toggle("faq-open", !isOpen);
        });

        q.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            q.click();
          }
        });
      })(questions[i]);
    }
  }

  // ─── 4. Hero Raccoon Click Easter Egg ────────────────────────────

  var swenglishPhrases = [
    "Jag kan ALDRIG sova. Det är en proffesionell nackdel.",
    "Har du någonsin hört om Stawis? Det är våra hjärnans måltid.",
    "Vi har STÖRRE händer än björnar. Tänk på det.",
    "Lagom är inte lagom för NÅGON. Vi äter SKräp.",
    "Min svenska är inte bra... men min trash game är LEGENDARY.",
    "Jag är inte liten. Jag är kompakt som en kanadensisk RÅKKÖN.",
    "Jag har redan koll på IKEA. Ge mig den röda låda. Jag tar kontrollen."
  ];

  function initHeroEasterEgg() {
    var heroRaccoon = document.getElementById("hero-raccoon");
    if (!heroRaccoon) return;

    heroRaccoon.addEventListener("click", function(e) {
      var phrase = swenglishPhrases[Math.floor(Math.random() * swenglishPhrases.length)];

      var bubble = document.createElement("div");
      bubble.style.position = "fixed";
      bubble.style.left = (e.clientX - 80) + "px";
      bubble.style.top = (e.clientY - 40) + "px";
      bubble.style.background = "#fff";
      bubble.style.color = "#1a1a1a";
      bubble.style.borderRadius = "12px";
      bubble.style.padding = "12px 18px";
      bubble.style.fontSize = "14px";
      bubble.style.fontWeight = "600";
      bubble.style.maxWidth = "280px";
      bubble.style.textAlign = "center";
      bubble.style.whiteSpace = "normal";
      bubble.style.zIndex = "1000";
      bubble.style.pointerEvents = "none";
      bubble.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15), 0 0 0 2px rgba(92,107,57,0.3)";
      bubble.style.transition = "all 0.4s ease-out";
      bubble.style.lineHeight = "1.4";
      bubble.textContent = phrase;

      document.body.appendChild(bubble);

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          bubble.style.opacity = "0";
          bubble.style.transform = "translateY(-60px) scale(0.9)";
        });
      });

      setTimeout(function() {
        if (bubble.parentNode) {
          bubble.parentNode.removeChild(bubble);
        }
      }, 3000);
    });
  }

  // ─── 5. Scroll-Triggered Fade-In Animations ──────────────────────

  function initFadeInAnimations() {
    var fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function(entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              entries[i].target.classList.add("visible");
              observer.unobserve(entries[i].target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      for (var i = 0; i < fadeElements.length; i++) {
        observer.observe(fadeElements[i]);
      }
    } else {
      for (var j = 0; j < fadeElements.length; j++) {
        fadeElements[j].classList.add("visible");
      }
    }
  }

  // ─── 6. Smooth Scrolling for Nav Links ───────────────────────────

  function initSmoothScroll() {
    var navLinks = document.querySelectorAll('nav a[href^="#"], .nav-link[href^="#"]');

    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function(e) {
        var href = this.getAttribute("href");
        if (!href || href.length < 2) return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });

          setTimeout(function() {
            this.blur();
          }.bind(this), 500);
        }
      });
    }
  }

  // ─── 7. Nav Styling on Scroll ────────────────────────────────────

  function initNavScroll() {
    var nav = document.querySelector("nav");
    var hero = document.getElementById("hero");
    var heroHeight = hero ? hero.offsetHeight : 600;

    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 50 || window.scrollY > heroHeight - 200) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ─── Init ────────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", function() {
    animateCounter(1337, 2000);
    createFloatingEmojis();
    initFAQ();
    initHeroEasterEgg();
    initFadeInAnimations();
    initSmoothScroll();
    initNavScroll();
  });

})();
