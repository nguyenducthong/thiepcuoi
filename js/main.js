/**
 * Wedding Invitation - Main JavaScript
 * Thiệp Cưới Online
 */

// ===================================
// SLIDESHOW
// ===================================
let slideIndex = 0;
let slideInterval;

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Auto slideshow
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, CONFIG.slideshow.interval);

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, CONFIG.slideshow.interval);
        });
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');

    slideIndex += direction;

    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');

    slideIndex = index - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// ===================================
// COUNTDOWN TIMER
// ===================================
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const weddingDate = new Date(CONFIG.weddingDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Wedding day has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// GALLERY LIGHTBOX
// ===================================
let currentImageIndex = 0;
const galleryImages = [];

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach((img, index) => {
        galleryImages.push(img.src);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    });

    // Close on background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightbox.classList.add('active');
    lightboxImg.src = galleryImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;

    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentImageIndex];
}

// ===================================
// GUEST NAME FROM URL
// ===================================
function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name');

    if (guestName) {
        const guestNameElement = document.getElementById('guestName');
        if (guestNameElement) {
            // Decode URI component and display
            guestNameElement.textContent = decodeURIComponent(guestName);
        }
    }
}

// ===================================
// MOBILE NAVIGATION
// ===================================
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===================================
// GOOGLE SHEETS API
// ===================================
async function sendToGoogleSheets(data) {
    if (!CONFIG.googleSheets || !CONFIG.googleSheets.enabled || !CONFIG.googleSheets.apiUrl) {
        console.log('Google Sheets not enabled or no API URL');
        return false;
    }

    try {
        // Sử dụng URL parameters thay vì JSON body để tương thích tốt hơn
        const params = new URLSearchParams(data).toString();
        const url = `${CONFIG.googleSheets.apiUrl}?${params}`;

        // Sử dụng phương pháp fetch với redirect: 'follow'
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });

        console.log('Google Sheets response:', response.status);
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Fallback: thử với image beacon (luôn hoạt động)
        try {
            const params = new URLSearchParams(data).toString();
            const img = new Image();
            img.src = `${CONFIG.googleSheets.apiUrl}?${params}`;
            return true;
        } catch (e) {
            return false;
        }
    }
}

// ===================================
// GUESTBOOK
// ===================================
function initGuestbook() {
    const form = document.getElementById('guestbookForm');
    const wishesList = document.getElementById('wishesList');

    if (!form) return;

    // Load saved wishes from localStorage
    loadWishes();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('wishName').value.trim();
        const message = document.getElementById('wishMessage').value.trim();

        if (!name || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Create wish object
        const wish = {
            id: Date.now(),
            name: name,
            message: message,
            date: new Date().toLocaleDateString('vi-VN')
        };

        // Save to localStorage
        saveWish(wish);

        // Send to Google Sheets if enabled
        sendToGoogleSheets({
            type: 'wish',
            name: name,
            message: message
        });

        // Add to DOM
        addWishToDOM(wish, true);

        // Reset form
        form.reset();

        // Show success message
        showNotification('Cảm ơn bạn đã gửi lời chúc!');
    });
}

function saveWish(wish) {
    let wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
    wishes.unshift(wish);
    localStorage.setItem('weddingWishes', JSON.stringify(wishes));
}

function loadWishes() {
    // Xóa các lời chúc mẫu có sẵn trong HTML
    const wishesList = document.getElementById('wishesList');
    if (wishesList) {
        wishesList.innerHTML = '';
    }

    // Load từ Google Sheets nếu đã bật
    if (CONFIG.googleSheets && CONFIG.googleSheets.enabled && CONFIG.googleSheets.apiUrl) {
        loadWishesFromGoogleSheets();
    } else {
        // Fallback: load từ localStorage
        const wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
        wishes.forEach(wish => addWishToDOM(wish, false));
    }
}

// Load lời chúc từ Google Sheets
async function loadWishesFromGoogleSheets() {
    try {
        const url = `${CONFIG.googleSheets.apiUrl}?action=getWishes`;
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });

        const result = await response.json();

        if (result.success && result.wishes && result.wishes.length > 0) {
            result.wishes.forEach(wish => {
                addWishToDOM({
                    id: wish.id,
                    name: wish.name,
                    message: wish.message,
                    date: wish.date
                }, false);
            });
        }
    } catch (error) {
        console.error('Error loading wishes from Google Sheets:', error);
        // Fallback: load từ localStorage nếu fetch thất bại
        const wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
        wishes.forEach(wish => addWishToDOM(wish, false));
    }
}

function addWishToDOM(wish, prepend = false) {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;

    const wishHTML = `
        <div class="wish-item" data-id="${wish.id}">
            <div class="wish-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="wish-content">
                <h4 class="wish-name">${escapeHTML(wish.name)}</h4>
                <p class="wish-message">${escapeHTML(wish.message)}</p>
                <span class="wish-date">${wish.date}</span>
            </div>
        </div>
    `;

    if (prepend) {
        wishesList.insertAdjacentHTML('afterbegin', wishHTML);
    } else {
        wishesList.insertAdjacentHTML('beforeend', wishHTML);
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===================================
// RSVP FORM
// ===================================
function initRSVP() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('rsvpName').value.trim(),
            phone: document.getElementById('rsvpPhone').value.trim(),
            guests: document.getElementById('rsvpGuests').value,
            event: document.getElementById('rsvpEvent').value
        };

        // Validate
        if (!formData.name || !formData.phone || !formData.guests || !formData.event) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Save to localStorage
        let rsvpList = JSON.parse(localStorage.getItem('weddingRSVP')) || [];
        rsvpList.push({
            ...formData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('weddingRSVP', JSON.stringify(rsvpList));

        // Send to Google Sheets if enabled
        sendToGoogleSheets({
            type: 'rsvp',
            name: formData.name,
            phone: formData.phone,
            guests: formData.guests,
            event: formData.event
        });

        // Reset form
        form.reset();

        // Show success message
        showNotification('Cảm ơn bạn đã xác nhận tham dự!!');
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .person, .timeline-item, .event-card, .gallery-item');

    elements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===================================
// STICKY NAVIGATION
// ===================================
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    if (!navbar || !heroSection) return;

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY > heroBottom - 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// NOTIFICATION
// ===================================
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// PRELOAD IMAGES
// ===================================
function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

// ===================================
// LOAD CONTENT FROM CONFIG
// ===================================
function initContentFromConfig() {
    // Tên cô dâu chú rể trên banner
    const coupleNames = document.querySelector('.couple-names');
    if (coupleNames && CONFIG.couple) {
        const groomFirstName = CONFIG.couple.groom.name.split(' ').pop();
        const brideFirstName = CONFIG.couple.bride.name.split(' ').pop();
        coupleNames.innerHTML = `${groomFirstName} <span>&</span> ${brideFirstName}`;
    }

    // Load ảnh banner từ config nếu có
    if (CONFIG.images && CONFIG.images.banner && CONFIG.images.banner.length > 0) {
        const slides = document.querySelectorAll('.slide img');
        CONFIG.images.banner.forEach((src, index) => {
            if (slides[index]) {
                slides[index].src = src;
            }
        });
    }

    // Load ảnh gallery từ config nếu có
    if (CONFIG.images && CONFIG.images.gallery && CONFIG.images.gallery.length > 0) {
        const galleryImgs = document.querySelectorAll('.gallery-item img');
        CONFIG.images.gallery.forEach((src, index) => {
            if (galleryImgs[index]) {
                galleryImgs[index].src = src;
            }
        });
    }

    // Thông tin chú rể
    const groomSection = document.querySelector('.person.groom');
    if (groomSection && CONFIG.couple && CONFIG.couple.groom) {
        const groom = CONFIG.couple.groom;
        groomSection.querySelector('.person-name').textContent = groom.name;
        groomSection.querySelector('.person-description').innerHTML = `
            Con trai ông <strong>${groom.fatherName}</strong><br>
            và bà <strong>${groom.motherName}</strong><br>
            Địa chỉ: ${groom.address}
        `;
        // Ảnh chú rể - ưu tiên từ CONFIG.images, sau đó từ couple.groom.photo
        const groomPhoto = (CONFIG.images && CONFIG.images.groom) || groom.photo;
        if (groomPhoto) {
            groomSection.querySelector('.person-image img').src = groomPhoto;
        }
        // Social links
        const socialLinks = groomSection.querySelectorAll('.social-links a');
        if (socialLinks.length >= 2) {
            socialLinks[0].href = groom.facebook || '#';
            socialLinks[1].href = groom.instagram || '#';
        }
    }

    // Thông tin cô dâu
    const brideSection = document.querySelector('.person.bride');
    if (brideSection && CONFIG.couple && CONFIG.couple.bride) {
        const bride = CONFIG.couple.bride;
        brideSection.querySelector('.person-name').textContent = bride.name;
        brideSection.querySelector('.person-description').innerHTML = `
            Con gái ông <strong>${bride.fatherName}</strong><br>
            và bà <strong>${bride.motherName}</strong><br>
            Địa chỉ: ${bride.address}
        `;
        // Ảnh cô dâu - ưu tiên từ CONFIG.images, sau đó từ couple.bride.photo
        const bridePhoto = (CONFIG.images && CONFIG.images.bride) || bride.photo;
        if (bridePhoto) {
            brideSection.querySelector('.person-image img').src = bridePhoto;
        }
        // Social links
        const socialLinks = brideSection.querySelectorAll('.social-links a');
        if (socialLinks.length >= 2) {
            socialLinks[0].href = bride.facebook || '#';
            socialLinks[1].href = bride.instagram || '#';
        }
    }

    // Thông tin sự kiện
    if (CONFIG.events) {
        const eventCards = document.querySelectorAll('.event-card');
        const eventKeys = ['vuquy', 'thanhhon', 'tieccuoi'];

        eventCards.forEach((card, index) => {
            const eventKey = eventKeys[index];
            const event = CONFIG.events[eventKey];
            if (event) {
                card.querySelector('.event-title').textContent = event.title;
                const infos = card.querySelectorAll('.event-info span');
                if (infos.length >= 3) {
                    infos[0].textContent = event.date;
                    infos[1].textContent = event.time;
                    infos[2].textContent = event.address;
                }
                const mapBtn = card.querySelector('a.btn');
                if (mapBtn && event.mapUrl) {
                    mapBtn.href = event.mapUrl;
                }
            }
        });
    }

    // Chuyện tình yêu (Timeline)
    if (CONFIG.story && CONFIG.story.length > 0) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        CONFIG.story.forEach((story, index) => {
            if (timelineItems[index]) {
                const item = timelineItems[index];
                const content = item.querySelector('.timeline-content');
                if (content) {
                    content.querySelector('h3').textContent = story.title;
                    content.querySelector('.timeline-date').textContent = story.date;
                    content.querySelector('p').textContent = story.description;
                }
                // Update icon
                const iconElement = item.querySelector('.timeline-icon i');
                if (iconElement && story.icon) {
                    iconElement.className = `fas fa-${story.icon}`;
                }
            }
        });
    }

    // Footer
    const footerTitle = document.querySelector('.footer-title');
    const footerDate = document.querySelector('.footer-date');
    if (footerTitle && CONFIG.couple) {
        const groomFirstName = CONFIG.couple.groom.name.split(' ').pop();
        const brideFirstName = CONFIG.couple.bride.name.split(' ').pop();
        footerTitle.textContent = `${groomFirstName} & ${brideFirstName}`;
    }
    if (footerDate && CONFIG.weddingDate) {
        const date = new Date(CONFIG.weddingDate);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        footerDate.textContent = formattedDate;
    }

    // Page title
    if (CONFIG.couple) {
        const groomFirstName = CONFIG.couple.groom.name.split(' ').pop();
        const brideFirstName = CONFIG.couple.bride.name.split(' ').pop();
        document.title = `Thiệp Cưới - ${groomFirstName} & ${brideFirstName}`;
    }
}

// ===================================
// MUSIC PLAYER - Vinyl Disc
// ===================================
function initMusicPlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const bgMusic = document.getElementById('bgMusic');
    const musicDisc = document.getElementById('musicDisc');
    const discImage = document.getElementById('discImage');
    const playIcon = musicDisc?.querySelector('.disc-play-icon i');

    if (!musicPlayer || !bgMusic || !musicDisc) return;

    // Kiểm tra config
    if (!CONFIG.display || !CONFIG.display.showMusicPlayer || !CONFIG.display.musicUrl) {
        musicPlayer.style.display = 'none';
        return;
    }

    // Set nguồn nhạc từ config
    bgMusic.src = CONFIG.display.musicUrl;

    // Set ảnh đĩa nhạc từ config (nếu có)
    if (discImage && CONFIG.display.discImage) {
        discImage.src = CONFIG.display.discImage;
    } else if (discImage) {
        // Ảnh mặc định - ảnh cặp đôi
        discImage.src = CONFIG.images?.groom || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop';
    }

    let isPlaying = false;

    // Function to play music
    const playMusic = () => {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicDisc.classList.add('playing');
            if (playIcon) playIcon.className = 'fas fa-pause';
        }).catch(e => {
            console.log('Autoplay blocked:', e);
        });
    };

    // Function to pause music
    const pauseMusic = () => {
        bgMusic.pause();
        isPlaying = false;
        musicDisc.classList.remove('playing');
        if (playIcon) playIcon.className = 'fas fa-play';
    };

    // Toggle play/pause khi click vào đĩa
    musicDisc.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // Tự động phát nhạc ngay khi trang load
    // Thử phát ngay lập tức
    bgMusic.play().then(() => {
        isPlaying = true;
        musicDisc.classList.add('playing');
        if (playIcon) playIcon.className = 'fas fa-pause';
    }).catch(e => {
        // Nếu autoplay bị chặn, phát khi user click bất kỳ đâu
        console.log('Autoplay blocked, waiting for user interaction');

        const autoPlayOnInteraction = () => {
            if (!isPlaying) {
                playMusic();
            }
            document.removeEventListener('click', autoPlayOnInteraction);
            document.removeEventListener('touchstart', autoPlayOnInteraction);
            document.removeEventListener('scroll', autoPlayOnInteraction);
        };

        document.addEventListener('click', autoPlayOnInteraction);
        document.addEventListener('touchstart', autoPlayOnInteraction);
        document.addEventListener('scroll', autoPlayOnInteraction, { once: true });
    });
}

// ===================================
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Load content from config first
    initContentFromConfig();

    // Initialize all functions
    initGuestName();
    initSlideshow();
    initCountdown();
    initLightbox();
    initMobileNav();
    initGuestbook();
    initRSVP();
    initBackToTop();
    initScrollAnimations();
    initStickyNav();
    initSmoothScroll();
    initMusicPlayer();
    preloadImages();

    console.log('Wedding Invitation Website Initialized!');
    console.log('Wedding Date:', CONFIG.weddingDate);
});

// Make functions globally available for onclick handlers
window.currentSlide = currentSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
