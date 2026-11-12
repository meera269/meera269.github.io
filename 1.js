
$(document).ready(function () {

  const $window = $(window);
  const $navbar = $(".navbar");
  const $backToTop = $("#backToTop");
  const $progress = $("#scrollProgress");
  const $sections = $("main section[id]");

  // =========================
  // PAGE LOADER
  // =========================

  function hideLoader() {
    $("#pageLoader").addClass("is-hidden");
  }

  $(window).on("load", hideLoader);

  // Fallback if page is already loaded
  setTimeout(hideLoader, 1200);

  // =========================
  // CURRENT YEAR
  // =========================

  $("#year").text(new Date().getFullYear());

  // =========================
  // SCROLL EFFECTS
  // =========================

  function handleScroll() {

    const scrollTop = $window.scrollTop();

    const scrollable =
      $(document).height() - $window.height();

    const progress = scrollable > 0
      ? (scrollTop / scrollable) * 100
      : 0;

    // Scroll progress bar
    $progress.css("width", progress + "%");

    // Navbar background effect
    $navbar.toggleClass("scrolled", scrollTop > 30);

    // Back to top button
    $backToTop.toggleClass("show", scrollTop > 400);

    // Active navbar link
    let current = "";

    $sections.each(function () {

      if (scrollTop >= $(this).offset().top - 160) {
        current = this.id;
      }

    });

    $(".navbar .nav-link").removeClass("active");

    if (current) {
      $('.navbar .nav-link[href="#' + current + '"]')
        .addClass("active");
    }
  }

  $window.on("scroll", handleScroll);

  handleScroll();

  // =========================
  // SMOOTH SCROLLING
  // =========================

  $('a[href^="#"]').on("click", function (event) {

    const selector = $(this).attr("href");
    const $target = $(selector);

    if ($target.length) {

      event.preventDefault();

      $("html, body").stop().animate({
        scrollTop: $target.offset().top - 74
      }, 650);

      // Close mobile navbar
      $(".navbar-collapse").collapse("hide");
    }

  });

  // Back to top
  $backToTop.on("click", function () {

    $("html, body").stop().animate({
      scrollTop: 0
    }, 650);

  });

  // =========================
  // REVEAL ANIMATIONS
  // =========================

  const revealTargets = [
    ".section-heading",
    "#about .about-lead",
    "#about .body-copy",
    ".quick-facts",
    ".skill-card",
    ".timeline-item",
    ".project-card",
    ".education-card",
    ".certification",
    ".contact-inner > *"
  ];

  $(revealTargets.join(",")).addClass("reveal");

  // Stagger animation for cards
  $(".skill-card, .project-card").each(function (index) {

    $(this)
      .css("--delay", (index % 4) * 110 + "ms")
      .addClass("stagger-item");

  });

  // Intersection Observer
  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      function (entries, obs) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    document.querySelectorAll(".reveal").forEach(function (element) {
      observer.observe(element);
    });

  } else {

    $(".reveal").addClass("is-visible");

  }

  // =========================
  // TYPING ANIMATION
  // =========================

  const phrases = [
    "meaningful insights.",
    "smarter decisions.",
    "data-driven solutions.",
    "useful experiences."
  ];

  const typingElement = document.getElementById("typedText");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typingElement && !reduceMotion) {

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    function typeLoop() {

      const phrase = phrases[phraseIndex];

      if (deleting) {

        characterIndex--;

        typingElement.textContent =
          phrase.substring(0, characterIndex);

        if (characterIndex <= 0) {

          deleting = false;

          phraseIndex = (phraseIndex + 1) % phrases.length;

          setTimeout(typeLoop, 350);
          return;
        }

        setTimeout(typeLoop, 38);

      } else {

        const nextPhrase = phrases[phraseIndex];

        characterIndex++;

        typingElement.textContent =
          nextPhrase.substring(0, characterIndex);

        if (characterIndex >= nextPhrase.length) {

          deleting = true;

          setTimeout(typeLoop, 1700);
          return;
        }

        setTimeout(typeLoop, 65);

      }

    }

    setTimeout(typeLoop, 1800);
  }

  // =========================
  // COUNT UP ANIMATION
  // =========================

  function animateCount(element) {

    const target = Number(element.dataset.count || 0);

    const duration = 1000;

    const start = performance.now();

    function update(now) {

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent =
        Math.round(target * eased) + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      }

    }

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
      function (entries, obs) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            animateCount(entry.target);

            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.7
      }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });

  } else {

    counters.forEach(animateCount);

  }

});
