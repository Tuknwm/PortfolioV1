document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });

    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.MHMenu');
    const mobileMenu = document.querySelector('.MHNavBagi');
    const currentSectionSpan = document.querySelector('.MHNavbar');
    const mobileNavItems = document.querySelectorAll('.MHButtonNav');
    const navLinks = document.querySelectorAll('.Nav');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.Card');
    const timeline = document.getElementById('timeline');

    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        header.classList.toggle('active');
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionName = e.target.getAttribute('data-section') || 
                                e.target.getAttribute('href').substring(1);
            if (currentSectionSpan) {
                currentSectionSpan.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
            }
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        }
    });

    const updateActiveNav = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const sectionName = id.charAt(0).toUpperCase() + id.slice(1);

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                mobileNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });

                if (currentSectionSpan) {
                    currentSectionSpan.textContent = sectionName;
                }
            }
        });
    };

    const observer = new IntersectionObserver(updateActiveNav, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const centerX = (x - 0.5) * 1;
            const centerY = (y - 0.5) * 1;
            const rotateX = -centerY * 20;
            const rotateY = centerX * 20;
            const scale = 1 + Math.abs(centerX) * 0.01 + Math.abs(centerY) * 0.01;
            const translateZ = Math.abs(centerX) * 20 + Math.abs(centerY) * 20;
            const shadowX = centerX * 20;
            const shadowY = centerY * 20;
            const shadowBlur = 30 + Math.abs(centerX) * 20 + Math.abs(centerY) * 20;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(${scale})
                translateZ(${translateZ}px)
            `;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.4),
                0 0 0 1px rgba(255,255,255,0.1) inset
            `;
            card.style.setProperty('--x', x * 100 + '%');
            card.style.setProperty('--y', y * 100 + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg) 
                rotateY(0deg) 
                scale(1)
                translateZ(0px)
            `;
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
        });
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());
});

  const form = document.querySelector('.ContactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        alert('Telah terkirim!');

        form.reset();
    });