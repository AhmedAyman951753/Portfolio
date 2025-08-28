// ===== Hero Section Observer (كما كان) =====
const heroText = document.querySelector('.hero-text');
const heroButtons = document.querySelector('.hero-buttons');
const heroImage = document.querySelector('.hero-image');
const heroTech = document.querySelector('.hero-tech');

const heroObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            heroText.classList.add('appear');
            heroButtons.classList.add('appear');
            heroImage.classList.add('appear');
            heroTech.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

heroObserver.observe(heroText);

// ===== About Section Directional Fade =====
const aboutLeftContainers = document.querySelectorAll('.about-left > div, .about-bio-wrapper');
const aboutRightContainers = document.querySelectorAll('.about-right > div');

function setInitialAbout() {
    aboutLeftContainers.forEach(c => {
        c.style.opacity = 0;
        c.style.transform = "translateX(-50px)";
    });
    aboutRightContainers.forEach(c => {
        c.style.opacity = 0;
        c.style.transform = "translateX(50px)";
    });
}

setInitialAbout();

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateX(0)";
        } else {
            // اعادة الحالة للابتعاد عند scroll up
            if(aboutLeftContainers.includes(entry.target)){
                entry.target.style.transform = "translateX(-50px)";
            } else {
                entry.target.style.transform = "translateX(50px)";
            }
            entry.target.style.opacity = 0;
        }
    });
}, { threshold: 0.2 });

[...aboutLeftContainers, ...aboutRightContainers].forEach(c => aboutObserver.observe(c));

// ===== Skills Section Directional Fade + Scale =====
const skillGroups = document.querySelectorAll('.skill-group');

skillGroups.forEach((group, i) => {
    group.style.opacity = 0;
    group.style.transform = "scale(0.8)"; // حجم أصغر في البداية
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        let delay = (index % 3) * 0.15;
        entry.target.style.transition = `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`;

        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "scale(1)"; // الحجم الأصلي عند الدخول
        }
    });
}, { threshold: 0.2 });

skillGroups.forEach(group => skillsObserver.observe(group));

// ===== Experience & Education Directional Fade + Scale =====
const timelineItems = document.querySelectorAll('.timeline-item, .education-item');

timelineItems.forEach((item, i) => {
    item.style.opacity = 0;
    item.style.transform = "scale(0.8) translateX(" + (i % 2 === 0 ? "-50px" : "50px") + ")";
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        let delay = (index % 2) * 0.15;
        entry.target.style.transition = `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`;

        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "scale(1) translateX(0)";
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));


const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => projectObserver.observe(card));



document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  // Toggle sidebar
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');

    // Toggle icon
    if (sidebar.classList.contains('active')) {
      sidebarToggle.classList.remove('fa-bars');
      sidebarToggle.classList.add('fa-xmark');
    } else {
      sidebarToggle.classList.remove('fa-xmark');
      sidebarToggle.classList.add('fa-bars');
    }
  });

  // Close sidebar on link click
  document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarToggle.classList.remove('fa-xmark');
      sidebarToggle.classList.add('fa-bars');
    });
  });

  // Close sidebar on click outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('active');
      sidebarToggle.classList.remove('fa-xmark');
      sidebarToggle.classList.add('fa-bars');
    }
  });
});

const links = document.querySelectorAll('.sidebar-links a');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // منع default
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    sidebar.classList.remove('active'); // إخفاء البار بعد الضغط
    sidebarToggle.textContent = '☰';
  });
});