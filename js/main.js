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
        const decodedName = decodeURIComponent(guestName);

        // Cập nhật tên khách trong envelope
        const envelopeGuestName = document.getElementById('envelopeGuestName');
        if (envelopeGuestName) {
            envelopeGuestName.textContent = decodedName;
        }

        // Cập nhật tên khách trong invitation header
        const guestNameElement = document.getElementById('guestName');
        if (guestNameElement) {
            guestNameElement.textContent = decodedName;
        }
    }
}

// ===================================
// CURTAIN ANIMATION - Màn kéo mở đầu
// ===================================
function initEnvelope() {
    const curtainOverlay = document.getElementById('curtain-overlay');
    const curtainContainer = document.getElementById('curtainContainer');
    const curtainContent = document.getElementById('curtainContent');

    if (!curtainOverlay || !curtainContainer) return;

    // Cập nhật thông tin từ CONFIG
    if (CONFIG.couple) {
        const groomFirstName = CONFIG.couple.groom.name.split(' ').pop();
        const brideFirstName = CONFIG.couple.bride.name.split(' ').pop();

        // Tên cặp đôi
        const curtainCoupleName = document.getElementById('curtainCoupleName');
        if (curtainCoupleName) {
            curtainCoupleName.textContent = `${groomFirstName} & ${brideFirstName}`;
        }
    }

    // Cập nhật ngày cưới và thời gian
    if (CONFIG.weddingDate) {
        const date = new Date(CONFIG.weddingDate);
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const dayName = days[date.getDay()];

        // Ngày cưới
        const curtainWeddingDate = document.getElementById('curtainWeddingDate');
        if (curtainWeddingDate) {
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
            curtainWeddingDate.textContent = formattedDate;
        }

        // Thời gian (lấy từ sự kiện chính nếu có)
        const curtainWeddingTime = document.getElementById('curtainWeddingTime');
        if (curtainWeddingTime) {
            let timeText = dayName;
            if (CONFIG.events && CONFIG.events.thanhhon && CONFIG.events.thanhhon.time) {
                const eventTime = CONFIG.events.thanhhon.time.split(' - ')[0];
                timeText = `${dayName.toUpperCase()} - ${eventTime}`;
            }
            curtainWeddingTime.textContent = timeText;
        }
    }

    // Cập nhật ảnh cặp đôi
    const curtainCouplePhoto = document.getElementById('curtainCouplePhoto');
    if (curtainCouplePhoto) {
        const photoSrc = (CONFIG.curtain && CONFIG.curtain.cardPhoto) ||
                        (CONFIG.images && CONFIG.images.couple) ||
                        (CONFIG.images && CONFIG.images.banner && CONFIG.images.banner[0]);
        if (photoSrc) {
            curtainCouplePhoto.src = photoSrc;
        }
    }

    // Cập nhật tên khách mời trong thiệp
    const curtainGuestName = document.getElementById('curtainGuestName');
    if (curtainGuestName) {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name');
        if (guestName) {
            curtainGuestName.textContent = decodeURIComponent(guestName);
        }
    }

    // Biến trạng thái
    let isOpened = false;
    let isClosed = false;

    // Lấy cấu hình thời gian
    const autoOpenDelay = (CONFIG.curtain && CONFIG.curtain.autoOpenDelay) || 0;
    const autoCloseDelay = (CONFIG.curtain && CONFIG.curtain.autoCloseDelay) || 0;

    // Hàm mở màn
    const openCurtain = () => {
        if (isOpened) return;
        isOpened = true;

        // Mở màn ra 2 bên
        curtainContainer.classList.add('opened');
        curtainOverlay.classList.add('opened');

        // Tự động đóng thiệp nếu có cấu hình
        if (autoCloseDelay > 0) {
            setTimeout(closeCurtain, autoCloseDelay);
        }
    };

    // Hàm đóng thiệp và vào trang chính
    const closeCurtain = () => {
        if (isClosed) return;
        isClosed = true;

        // Ẩn overlay hoàn toàn
        curtainOverlay.style.display = 'none';
        curtainOverlay.classList.add('hidden');

        // Phát nhạc tự động (nếu có)
        const bgMusic = document.getElementById('bgMusic');
        const musicDisc = document.getElementById('musicDisc');
        const playIcon = musicDisc?.querySelector('.disc-play-icon i');

        if (bgMusic && bgMusic.src) {
            bgMusic.play().then(() => {
                musicDisc?.classList.add('playing');
                if (playIcon) playIcon.className = 'fas fa-pause';
            }).catch(e => {
                console.log('Music autoplay:', e);
            });
        }
    };

    // Tự động mở màn nếu có cấu hình
    if (autoOpenDelay > 0) {
        setTimeout(openCurtain, autoOpenDelay);
    }

    // Click vào màn để mở (nếu chưa tự động mở)
    curtainContainer.addEventListener('click', openCurtain);

    // Click vào nội dung phía sau để vào trang chính
    if (curtainContent) {
        curtainContent.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCurtain();
        });
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
        const groomNameEl = groomSection.querySelector('.person-name');
        if (groomNameEl) groomNameEl.textContent = groom.name;

        // Ảnh chú rể - ưu tiên từ CONFIG.images, sau đó từ couple.groom.photo
        const groomPhoto = (CONFIG.images && CONFIG.images.groom) || groom.photo;
        const groomImg = groomSection.querySelector('.person-image img');
        if (groomPhoto && groomImg) {
            groomImg.src = groomPhoto;
        }
    }

    // Thông tin cô dâu
    const brideSection = document.querySelector('.person.bride');
    if (brideSection && CONFIG.couple && CONFIG.couple.bride) {
        const bride = CONFIG.couple.bride;
        const brideNameEl = brideSection.querySelector('.person-name');
        if (brideNameEl) brideNameEl.textContent = bride.name;

        // Ảnh cô dâu - ưu tiên từ CONFIG.images, sau đó từ couple.bride.photo
        const bridePhoto = (CONFIG.images && CONFIG.images.bride) || bride.photo;
        const brideImg = brideSection.querySelector('.person-image img');
        if (bridePhoto && brideImg) {
            brideImg.src = bridePhoto;
        }
    }

    // Cập nhật thông tin gia đình (Nhà Trai & Nhà Gái)
    if (CONFIG.couple) {
        // Nhà trai
        const groomFamily = document.querySelector('.groom-family');
        if (groomFamily && CONFIG.couple.groom) {
            const groom = CONFIG.couple.groom;
            const parentNames = groomFamily.querySelectorAll('.parent-name');
            if (parentNames.length >= 2) {
                parentNames[0].innerHTML = `Ông <strong>${groom.fatherName}</strong>`;
                parentNames[1].innerHTML = `Bà <strong>${groom.motherName}</strong>`;
            }
        }

        // Nhà gái
        const brideFamily = document.querySelector('.bride-family');
        if (brideFamily && CONFIG.couple.bride) {
            const bride = CONFIG.couple.bride;
            const parentNames = brideFamily.querySelectorAll('.parent-name');
            if (parentNames.length >= 2) {
                parentNames[0].innerHTML = `Ông <strong>${bride.fatherName}</strong>`;
                parentNames[1].innerHTML = `Bà <strong>${bride.motherName}</strong>`;
            }
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

    // Không tự động phát nhạc - nhạc sẽ phát khi mở phong bì
    // Lưu reference để có thể gọi từ initEnvelope
    window.playWeddingMusic = playMusic;
    window.pauseWeddingMusic = pauseMusic;
}

// ===================================
// FALLING HEARTS - Trái tim rơi lấp lánh
// ===================================
function initFallingHearts() {
    const container = document.getElementById('fallingHearts');
    if (!container) return;

    // Cấu hình
    const config = {
        maxHearts: 20,           // Số lượng hearts tối đa trên màn hình
        spawnInterval: 1000,      // Thời gian giữa mỗi lần tạo heart (ms)
        minDuration: 6,          // Thời gian rơi tối thiểu (giây)
        maxDuration: 12,         // Thời gian rơi tối đa (giây)
        minSize: 14,             // Kích thước tối thiểu (px)
        maxSize: 28              // Kích thước tối đa (px)
    };

    // Các class màu sắc cánh đào
    const petalColors = [
        'petal-light',
        'petal-medium',
        'petal-dark'
    ];

    // 3 kích thước
    const sizes = ['small', 'medium', 'large'];

    let activeHearts = 0;

    function createHeart() {
        if (activeHearts >= config.maxHearts) return;

        const heart = document.createElement('div');
        heart.className = 'heart';

        // Random màu cánh đào
        const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
        heart.classList.add(colorClass);

        // Random kích thước (3 loại)
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        heart.classList.add(sizeClass);

        // Cánh hoa (dùng CSS để tạo hình)

        // Random vị trí ngang
        const leftPosition = Math.random() * 100;
        heart.style.left = leftPosition + '%';

        // Random thời gian rơi
        const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
        const swayDuration = Math.random() * 2 + 2; // 2-4 giây cho mỗi chu kỳ lắc lư
        const rotateDuration = Math.random() * 2 + 3; // 3-5 giây cho mỗi vòng quay
        heart.style.animationDuration = duration + 's, ' + swayDuration + 's, ' + rotateDuration + 's';

        // Random delay cho hiệu ứng
        const swayDelay = Math.random() * 2;
        heart.style.animationDelay = '0s, ' + swayDelay + 's, 0s';

        // Thêm vào container
        container.appendChild(heart);
        activeHearts++;

        // Xóa heart sau khi animation kết thúc
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
                activeHearts--;
            }
        }, duration * 1000);
    }

    // Tạo hearts liên tục
    setInterval(createHeart, config.spawnInterval);

    // Tạo vài hearts ngay khi load
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// ===================================
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Load content from config first
    initContentFromConfig();

    // Initialize all functions
    initGuestName();
    initEnvelope();
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
    initFallingHearts();
    preloadImages();

    console.log('Wedding Invitation Website Initialized!');
    console.log('Wedding Date:', CONFIG.weddingDate);
});

// Make functions globally available for onclick handlers
window.currentSlide = currentSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
