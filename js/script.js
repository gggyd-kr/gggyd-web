// Horizontal scroll functionality
const gallery = document.querySelector('.gallery-container');

if (gallery) {
    // Check if mobile (window width)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Mouse wheel scroll
    gallery.addEventListener('wheel', (e) => {
        if (!isMobile()) {
            // Desktop: horizontal scroll
            e.preventDefault();
            gallery.scrollLeft += e.deltaY;
        }
        // Mobile: vertical scroll (default behavior, no preventDefault)
    }, { passive: false });

    // Mouse drag to scroll (desktop only)
    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
        if (isMobile()) return;
        
        isDown = true;
        gallery.style.cursor = 'grabbing';
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        e.preventDefault();
    });

    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        if (!isMobile()) {
            gallery.style.cursor = 'grab';
        }
    });

    gallery.addEventListener('mouseup', () => {
        isDown = false;
        if (!isMobile()) {
            gallery.style.cursor = 'grab';
        }
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown || isMobile()) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2;
        gallery.scrollLeft = scrollLeft - walk;
    });

    // Keyboard navigation (desktop only)
    document.addEventListener('keydown', (e) => {
        if (isMobile()) return;
        
        if (e.key === 'ArrowRight') {
            gallery.scrollBy({ left: 400, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            gallery.scrollBy({ left: -400, behavior: 'smooth' });
        }
    });

    // Hide scroll indicator after first scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let scrollTimeout;

    gallery.addEventListener('scroll', () => {
        if (scrollIndicator && !isMobile()) {
            scrollIndicator.style.opacity = '0';
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollIndicator.style.opacity = '1';
            }, 1000);
        }
    });

    // Prevent link click when dragging (desktop only)
    let clickStartX;
    const allItems = gallery.querySelectorAll('.gallery-item');
    
    allItems.forEach(item => {
        item.addEventListener('mousedown', (e) => {
            if (isMobile()) return;
            clickStartX = e.pageX;
        });

        item.addEventListener('click', (e) => {
            if (isMobile()) return;
            if (Math.abs(e.pageX - clickStartX) > 10) {
                e.preventDefault();
            }
        });
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            gallery.style.cursor = 'grab';
        } else {
            gallery.style.cursor = 'default';
        }
    });
}
