/**
 * Miracle Media Entertainment - Core Application Engine
 * Premium Website Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // INITIALIZATION & DOM CACHING
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.querySelector('.back-to-top');
    const statNumbers = document.querySelectorAll('.stat-number');
    const scrollAnims = document.querySelectorAll('.scroll-anim');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // ==========================================================================
    // THEME MANAGEMENT ENGINE (Dark/Light Core)
    // ==========================================================================
    const initTheme = () => {
        const savedTheme = localStorage.getItem('mme-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('mme-theme', isDark ? 'dark' : 'light');
        });
    }

    // ==========================================================================
    // STICKY NAVIGATION & BACK TO TOP CONTROLLERS
    // ==========================================================================
    const handleScrollMetrics = () => {
        const scrollY = window.scrollY;

        // Sticky Navbar state
        if (scrollY > 50) {
            navbar?.classList.add('sticky');
        } else {
            navbar?.classList.remove('sticky');
        }

        // Back to top appearance threshold
        if (scrollY > 400) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScrollMetrics, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // MOBILE NAVIGATION INTERFACE (Hamburger Mechanics)
    // ==========================================================================
    const toggleMobileMenu = () => {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        
        // Prevent body background scroll when menu is active
        const isMenuOpen = navMenu?.classList.contains('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ==========================================================================
    // HARDWARE-ACCELERATED INTERSECTION OBSERVER ENGINES
    // ==========================================================================
    
    // 1. Scroll-Driven Reveal Animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollAnims.forEach(element => animationObserver.observe(element));

    // 2. Performance-First Statistical Counters
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const duration = 2000; // Animation running time in milliseconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;

        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                counter.textContent = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
                clearInterval(timer);
            } else {
                counter.textContent = current.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            }
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ==========================================================================
    // DYNAMIC FILTER ENGINE (Portfolio Showcase)
    // ==========================================================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update Active Class
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Smooth CSS Layout Transition
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // FAQ COLLAPSIBLE ACCORDION LOGIC
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const isOpen = currentItem.classList.contains('active');
            
            // Close all items first for a clean accordion user experience
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle target element state
            if (!isOpen) {
                currentItem.classList.add('active');
            }
        });
    });

    // Run Engine Initializations
    initTheme();
});
