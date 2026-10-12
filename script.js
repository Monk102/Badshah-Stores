/**
 * Badshah Stores - Official Showcase Website Script
 * Location: Kothi Bazaar, Betul, Madhya Pradesh
 * Phone/WhatsApp: +91 62610 16983
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialise Dynamic Store Timings Indicator
  initStoreStatus();
  setInterval(initStoreStatus, 60000); // Check every minute

  // 2. Initialise Mobile Navigation
  initMobileMenu();

  // 3. Initialise Category Search and Filters
  initCategoryFilters();

  // 4. Initialise Store Tour Carousel
  initStoreTourCarousel();

  // 5. Initialise Quick Action Utilities (Copy Address, Share)
  initUtilityActions();

  // 6. Smooth scroll for anchor links
  initSmoothScroll();
});

/**
 * Calculates whether Badshah Stores is currently Open or Closed
 * Timings: Monday - Sunday, 10:00 AM - 9:30 PM (IST)
 */
function initStoreStatus() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeMinutes = currentHour * 60 + currentMinute;

  const openTimeMinutes = 10 * 60; // 10:00 AM
  const closeTimeMinutes = 21 * 60 + 30; // 9:30 PM

  const isOpen = currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;

  // Header & Section status elements
  const navStatusBadge = document.getElementById('nav-store-status');
  const sectionStatusBadge = document.getElementById('hours-store-status');
  const statusDetailsText = document.getElementById('status-details-text');

  if (isOpen) {
    const minutesLeft = closeTimeMinutes - currentTimeMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsLeft = minutesLeft % 60;
    const closingSoon = minutesLeft <= 60;

    const statusHtml = `
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span class="w-2 h-2 rounded-full bg-emerald-500 open-dot-pulse"></span>
        Open Now <span class="hidden sm:inline font-normal text-emerald-600">• Closes at 9:30 PM</span>
      </span>
    `;

    if (navStatusBadge) navStatusBadge.innerHTML = statusHtml;

    if (sectionStatusBadge) {
      sectionStatusBadge.innerHTML = `
        <div class="flex items-center gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div class="w-3.5 h-3.5 rounded-full bg-emerald-500 open-dot-pulse flex-shrink-0"></div>
          <div>
            <p class="text-sm font-bold text-emerald-900">Store is Open Right Now</p>
            <p class="text-xs text-emerald-700">
              ${closingSoon ? `Closing soon in ${hoursLeft > 0 ? hoursLeft + ' hr ' : ''}${minsLeft} mins!` : 'Welcoming customers today until 9:30 PM'}
            </p>
          </div>
        </div>
      `;
    }

    if (statusDetailsText) {
      statusDetailsText.textContent = 'Visit our showroom in Kothi Bazaar today for instant offline shopping!';
    }
  } else {
    // Closed state
    let opensWhen = '10:00 AM today';
    if (currentTimeMinutes >= closeTimeMinutes) {
      opensWhen = '10:00 AM tomorrow';
    }

    const statusHtml = `
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <span class="w-2 h-2 rounded-full bg-rose-500 closed-dot-pulse"></span>
        Closed Now <span class="hidden sm:inline font-normal text-rose-600">• Opens at ${opensWhen}</span>
      </span>
    `;

    if (navStatusBadge) navStatusBadge.innerHTML = statusHtml;

    if (sectionStatusBadge) {
      sectionStatusBadge.innerHTML = `
        <div class="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
          <div class="w-3.5 h-3.5 rounded-full bg-rose-500 closed-dot-pulse flex-shrink-0"></div>
          <div>
            <p class="text-sm font-bold text-rose-900">Store is Closed Right Now</p>
            <p class="text-xs text-rose-700">Reopens at ${opensWhen}. You can still drop us an order or inquiry on WhatsApp anytime!</p>
          </div>
        </div>
      `;
    }

    if (statusDetailsText) {
      statusDetailsText.textContent = `Doors reopen at ${opensWhen}. WhatsApp messaging is open 24/7 for product reservations.`;
    }
  }
}

/**
 * Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('translate-x-full');
    mobileBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileBackdrop.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Product & Inventory Category Filtering & Search
 */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('category-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryCountEl = document.getElementById('category-count');
  const noResultsEl = document.getElementById('no-results-state');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    categoryCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.category-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.category-desc')?.textContent.toLowerCase() || '';
      const cardTags = card.getAttribute('data-keywords')?.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = !searchQuery || 
        cardTitle.includes(searchQuery) || 
        cardDesc.includes(searchQuery) || 
        cardTags.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (categoryCountEl) {
      categoryCountEl.textContent = `Showing ${visibleCount} of ${categoryCards.length} collections`;
    }

    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.classList.remove('hidden');
      } else {
        noResultsEl.classList.add('hidden');
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-slate-900', 'text-white'));
      filterBtns.forEach(b => b.classList.add('bg-white', 'text-slate-700'));
      btn.classList.add('active', 'bg-slate-900', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');

      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      applyFilters();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      applyFilters();
      searchInput.focus();
    });
  }

  const resetAllBtn = document.getElementById('reset-filters-btn');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.click();
      else {
        activeCategory = 'all';
        applyFilters();
      }
    });
  }
}

/**
 * Store Tour Gallery Carousel
 */
function initStoreTourCarousel() {
  const slides = document.querySelectorAll('.tour-slide');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const carouselContainer = document.getElementById('store-carousel-container');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayInterval = null;

  // Generate indicator dots dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
        index === 0 ? 'bg-amber-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
      }`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        restartAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
      } else {
        slide.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.className = 'w-8 h-3 rounded-full bg-amber-600 transition-all duration-300';
        } else {
          dot.className = 'w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300';
        }
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoPlay();
    });
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) nextSlide();
        else prevSlide();
      }
    }
  }

  updateSlides();
  startAutoPlay();
}

/**
 * Quick Action Utilities (Copy Address, Share Location, Toast Notification)
 */
function initUtilityActions() {
  const copyAddressBtn = document.getElementById('copy-address-btn');
  const shareStoreBtn = document.getElementById('share-store-btn');
  const storeAddressText = "Badshah Stores, Cement Road, In Front of Shyam Fashion Mall, Kothi Bazaar, Betul, Madhya Pradesh - 460001";

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(storeAddressText)
          .then(() => showToast('Store address copied to clipboard! 📋'))
          .catch(() => fallbackCopy(storeAddressText));
      } else {
        fallbackCopy(storeAddressText);
      }
    });
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Store address copied! 📋');
  }

  if (shareStoreBtn) {
    shareStoreBtn.addEventListener('click', () => {
      const shareData = {
        title: 'Badshah Stores - Kothi Bazaar, Betul',
        text: 'Visit Badshah Stores for premium cosmetics, beauty, personal care and lifestyle items in Betul!',
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('Website link copied to share! 🔗');
        }
      }
    });
  }
}

/**
 * Toast Notification System
 */
function showToast(message, duration = 3200) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium border border-slate-700';
  toast.innerHTML = `
    <span class="text-amber-400">✨</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

/**
 * Helper to generate custom WhatsApp links
 */
window.sendWhatsAppInquiry = function(productOrCategory) {
  const phone = '916261016983';
  let message = `Namaste Badshah Stores! I'm visiting your website and would like to check availability for: "${productOrCategory}" at your Kothi Bazar store.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
