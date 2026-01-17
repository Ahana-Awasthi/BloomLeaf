// Mobile Menu Toggle (Basic - expands nav on hamburger click)
        document.querySelector('.hamburger').addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // CTA Button Smooth Scroll to Story Section
        document.querySelector('.cta-btn').addEventListener('click', () => {
            document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
        });

        // Team Modals Functionality
        const modals = document.querySelectorAll('.team-member');
        const modalElements = document.querySelectorAll('.modal');
        const closes = document.querySelectorAll('.close');

        modals.forEach(member => {
            member.addEventListener('click', () => {
                const modalId = member.dataset.modal;
                document.getElementById(modalId).style.display = 'block';
            });
        });

        closes.forEach(close => {
            close.addEventListener('click', () => {
                close.closest('.modal').style.display = 'none';
            });
        });

        // Close modal on outside click (backdrop)
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Fade-in Animation on Scroll (using Intersection Observer)
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe sections for fade-in effect
        document.querySelectorAll('.story, .mission, .team, .why-us').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Navigation Links Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after click (if open)
                    const navLinks = document.querySelector('.nav-links');
                    if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                    }
                }
            });
        });

        // Additional Interactivity: Hero Image Parallax Effect (Optional Enhancement)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });