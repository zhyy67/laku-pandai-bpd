/* ============================================
   LANDING PAGE LAKU PANDAI BPD SMKN 1 BANTUL
   JavaScript - Interaksi & Animasi
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const faqItems = document.querySelectorAll('.faq-item');

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ==========================================
    // MOBILE MENU
    // ==========================================
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Create/remove overlay
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        overlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking overlay
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-overlay')) {
            toggleMobileMenu();
        }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    function smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(targetId);
            }
        });
    });

    // Also handle the hero buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href && href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    function handleBackToTop() {
        if (window.pageYOffset > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.about-card, .service-card, .step-card, .info-card, .faq-item');

        reveals.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                // Add staggered delay based on position
                const parent = element.parentElement;
                const siblings = parent ? Array.from(parent.children) : [];
                const siblingIndex = siblings.indexOf(element);

                element.style.transitionDelay = `${siblingIndex * 0.1}s`;
                element.classList.add('reveal', 'active');
            }
        });
    }

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // ==========================================
    // RESIZE HANDLER
    // ==========================================
    function handleResize() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    window.addEventListener('resize', handleResize);

    // ==========================================
    // INITIALIZATION
    // ==========================================
    console.log('🚀 Laku Pandai BPD SMKN 1 Bantul - Landing Page Ready');
    console.log('📱 Responsive: Desktop, Tablet, Mobile');
    console.log('✨ Animations: Scroll Reveal, Hover Effects, Smooth Scroll');
    console.log('💬 WhatsApp Integration: Active');
    console.log('📋 FAQ Accordion: Interactive');
    console.log('🗺️  Location Map: Embedded');
});


// ==========================================
// FUNGSI FORMULIR TRANSAKSI (BARU)
// ==========================================

/**
 * Fungsi untuk membuka formulir, menyembunyikan halaman utama,
 * dan otomatis mencentang jenis transaksi.
 */
function bukaFormulir(jenisLayanan, namaPetugas) {
    // 1. Sembunyikan semua section utama
    const sectionsToHide = ['.navbar', '.hero', '.about', '.features', '.services', '.procedure', '.location', '.faq', '.cta', '.footer'];
    sectionsToHide.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.display = 'none';
    });

    // 2. Tampilkan bagian formulir
    const formSection = document.getElementById('formSection');
    if (formSection) {
        formSection.style.display = 'block';
    }

    // 3. Tampilkan info petugas yang dipilih
    const petugasInfo = document.getElementById('petugasInfo');
    if (petugasInfo) {
        petugasInfo.innerText = "Petugas: " + namaPetugas;
    }

    // 4. Set tanggal otomatis ke hari ini
    const tanggalInput = document.getElementById('tanggal');
    if (tanggalInput) {
        tanggalInput.valueAsDate = new Date();
    }

    // 5. Reset semua checkbox terlebih dahulu
    const checkboxes = document.querySelectorAll('#jenis-transaksi input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    // 6. Centang otomatis checkbox sesuai layanan yang diklik
    if (jenisLayanan === 'Aktivasi Rekening Baru') document.getElementById('cb-aktivasi').checked = true;
    if (jenisLayanan === 'Cek Saldo') document.getElementById('cb-ceksaldo').checked = true;
    if (jenisLayanan === 'Setoran Tunai') document.getElementById('cb-setoran').checked = true;
    if (jenisLayanan === 'Tarik Tunai') document.getElementById('cb-tarik').checked = true;
    if (jenisLayanan === 'Transfer') document.getElementById('cb-transfer').checked = true;
    if (jenisLayanan === 'Pembayaran') document.getElementById('cb-pembayaran').checked = true;
    if (jenisLayanan === 'Pembelian') document.getElementById('cb-pembelian').checked = true;

    // 7. Gulir layar ke atas dengan halus
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Fungsi untuk menutup formulir dan mengembalikan tampilan halaman utama.
 */
function tutupFormulir() {
    // 1. Sembunyikan formulir
    const formSection = document.getElementById('formSection');
    if (formSection) {
        formSection.style.display = 'none';
    }

    // 2. Munculkan kembali semua section utama
    const sectionsToShow = ['.navbar', '.hero', '.about', '.features', '.services', '.procedure', '.location', '.faq', '.cta', '.footer'];
    sectionsToShow.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            // Navbar butuh display: flex, section lain block
            if (selector === '.navbar') {
                el.style.display = 'block'; 
            } else {
                el.style.display = 'block';
            }
        }
    });

    // 3. Gulir kembali ke bagian layanan (agar user tidak bingung)
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}