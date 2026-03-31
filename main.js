document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll reveal animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Trigger counter animation if it's the hero section or contains a counter
        const counters = entry.target.querySelectorAll(".counter");
        if (counters.length > 0) {
          animateCounters(counters);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
  });

  // Sticky header background blur effect
  const navWrap = document.querySelector(".nav-wrap");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navWrap.classList.add("scrolled");
    } else {
      navWrap.classList.remove("scrolled");
    }
  });

  // Number Counter Animation
  function animateCounters(counters) {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-count");
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  }

  // Interactive Background Animation: Molecules / Network Connections
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }

    window.addEventListener("resize", resizeCanvas);

    // Mouse interaction
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(14, 165, 233, 0.6)"; // Matches --brand-2
        ctx.fill();
      }

      update() {
        // Bounce off walls
        if (this.x + this.size > width || this.x - this.size < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.size > height || this.y - this.size < 0) {
          this.dy = -this.dy;
        }

        // Connect points to mouse if nearby (interactive repel)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 3;
            const directionY = forceDirectionY * force * 3;

            this.x -= directionX;
            this.y -= directionY;
          }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    function initParticles() {
      particles = [];
      const numberOfParticles = Math.min((width * height) / 12000, 120); // Responsive amount of particles
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (width - size * 2) + size;
        let y = Math.random() * (height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    }

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      connectParticles();
    }

    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacityValue * 0.4})`; // Matches --brand-2
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    resizeCanvas();
    animateParticles();
  }

  // =========================================================================
  // Advanced Visual Enhancements
  // =========================================================================

  // Custom Cursor
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Smooth trailing ring physics
    function animateCursor() {
      let dx = mouseX - ringX;
      let dy = mouseY - ringY;
      ringX += dx * 0.15;
      ringY += dy * 0.15;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    animateCursor();

    // Hover effect bounds
    const hoverables = document.querySelectorAll("a, button, .lightbox-trigger, .lightbox-close");
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hovering");
        cursorRing.classList.add("hovering");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hovering");
        cursorRing.classList.remove("hovering");
      });
    });
  }

  // Magnetic Links
  const magneticLinks = document.querySelectorAll('.magnetic-link');
  magneticLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const position = link.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;

      // Move slightly towards cursor
      link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translate(0px, 0px)';
    });
  });

  // Parallax Scrolling
  const parallaxItems = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    parallaxItems.forEach(item => {
      let speed = item.getAttribute('data-speed') || 0.05;
      item.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // Typewriter Text Reveal
  const typewriterElement = document.querySelector('.typewriter-text');
  if (typewriterElement) {
    const text = typewriterElement.innerText;
    typewriterElement.innerHTML = '';

    // Wrap each character in a span
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'typewriter-char';
      span.style.animationDelay = `${i * 0.03}s`;
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      typewriterElement.appendChild(span);
    });
  }

  // Lightbox Modal Implementation
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

  if (lightbox) {
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        lightboxImg.src = trigger.src;
        lightbox.classList.add("active");
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        lightbox.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // Enquiry Form Branching Logic & Mailto Submission
  // =========================================================================
  const form = document.getElementById("enquiry-form");
  const profileRadios = document.querySelectorAll('input[name="profile"]');
  const commonFields = document.getElementById("common-fields");
  const formActions = document.getElementById("form-actions");
  const branchGroups = document.querySelectorAll('.branch-group');

  if (form) {
    // 1. Handle Branching
    profileRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        const selectedProfile = e.target.value;

        // Show common fields & submit button
        commonFields.classList.remove("hidden");
        commonFields.classList.add("fade-in");
        formActions.classList.remove("hidden");
        formActions.classList.add("fade-in");

        // Hide all branch groups, remove required attributes if applied to inputs
        branchGroups.forEach(group => {
          group.classList.add("hidden");
          group.classList.remove("fade-in");
        });

        // Show the selected branch group
        const targetGroup = document.getElementById(`branch-${selectedProfile}`);
        if (targetGroup) {
          targetGroup.classList.remove("hidden");
          targetGroup.classList.add("fade-in");
        }

        // Scroll slightly to bring fields into view smoothly
        const formRect = form.getBoundingClientRect();
        if (formRect.bottom > window.innerHeight) {
          window.scrollBy({ top: 300, behavior: 'smooth' });
        }
      });
    });

    // 2. Handle Submission via mailto
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const profileCode = formData.get("profile");

      // Determine profile readable name
      const profileMap = {
        'pharmacy_clinic': 'Pharmacy / Clinic',
        'patient': 'Patient',
        'supplier': 'Supplier / Manufacturer',
        'general': 'General Enquiry'
      };
      const profileName = profileMap[profileCode];

      // Contact Info
      const name = formData.get("contact_name");
      const email = formData.get("contact_email");
      const phone = formData.get("contact_phone");
      const location = formData.get("location");

      // Email construct
      let subject = `Oscar Labs Enquiry: ${profileName} - ${name}`;
      let body = `New Enquiry from Oscar Labs Website\n`;
      body += `-------------------------------------------------\n`;
      body += `Profile: ${profileName}\n`;
      body += `Name: ${name}\n`;
      body += `Email: ${email}\n`;
      body += `Phone: ${phone}\n`;
      body += `Location: ${location || 'N/A'}\n\n`;

      // Append Branch Specifics
      if (profileCode === 'pharmacy_clinic') {
        body += `--- Facility Details ---\n`;
        body += `Facility Name: ${formData.get("facility_name")}\n`;
        body += `Facility Type: ${formData.get("facility_type") || 'N/A'}\n`;
        body += `Patient Volume: ${formData.get("patient_volume") || 'N/A'}\n`;
        body += `Main Challenge:\n${formData.get("main_challenge") || 'None specified'}\n`;
      }
      else if (profileCode === 'patient') {
        body += `--- Patient Details ---\n`;
        body += `Specific Test Needed: ${formData.get("test_needed") || 'N/A'}\n`;
        body += `Interested in CareCova (DNPL): ${formData.get("dnpl_interest") ? 'Yes' : 'No'}\n`;
      }
      else if (profileCode === 'supplier') {
        body += `--- Supplier Details ---\n`;
        body += `Company Name: ${formData.get("company_name")}\n`;
        body += `Product Types: ${formData.get("product_type") || 'N/A'}\n`;
      }
      else if (profileCode === 'general') {
        // Override subject if they provided one
        const userSubject = formData.get("subject");
        if (userSubject) subject = `Oscar Labs Enquiry: ${userSubject}`;

        body += `--- Message ---\n`;
        body += `${formData.get("message") || 'No message provided'}\n`;
      }

      body += `\n-------------------------------------------------\n`;

      // Generate mailto link
      const mailtoLink = `mailto:support@oscardiagnostics.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Button interaction feedback
      const btn = form.querySelector('.submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>Opening Email...</span> ✓`;

      // Trigger native email client
      window.location.href = mailtoLink;

      // Reset button after small delay
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 3000);
    });
  }

});
