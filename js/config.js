/**
 * Wedding Invitation - Configuration File
 * Cấu hình thiệp cưới
 *
 * Chỉnh sửa các giá trị bên dưới để tùy chỉnh thiệp cưới của bạn
 */

const CONFIG = {
    // ===================================
    // THÔNG TIN NGÀY CƯỚI
    // ===================================
    // Format: "YYYY-MM-DD HH:MM:SS" hoặc "Month DD, YYYY HH:MM:SS"
    // Ví dụ: "2025-03-15 10:00:00" hoặc "March 15, 2025 10:00:00"
    weddingDate: "2026-03-22 10:00:00",

    // ===================================
    // CÀI ĐẶT SLIDESHOW
    // ===================================
    slideshow: {
        // Thời gian chuyển ảnh (milliseconds)
        // 5000 = 5 giây, 3000 = 3 giây
        interval: 5000,

        // Hiệu ứng chuyển ảnh
        // Có thể là: "fade", "slide" (hiện tại chỉ hỗ trợ fade)
        effect: "fade"
    },

    // ===================================
    // THÔNG TIN CÔ DÂU - CHÚ RỂ
    // ===================================
    couple: {
        groom: {
            name: "Nguyễn Đức Thông",
            fatherName: "Nguyễn Đức Thảo",
            motherName: "Lê Thị Mười",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            photo: "images/groom.jpg",
            facebook: "#",
            instagram: "#"
        },
        bride: {
            name: "Nguyễn Thu Trang",
            fatherName: "Trần Văn C",
            motherName: "Lê Thị D",
            address: "456 Đường XYZ, Quận 3, TP.HCM",
            photo: "images/bride.jpg",
            facebook: "#",
            instagram: "#"
        }
    },

    // ===================================
    // THÔNG TIN SỰ KIỆN
    // ===================================
    events: {
        vuquy: {
            title: "Lễ Vu Quy",
            date: "Thứ Bảy, 15/03/2025",
            time: "08:00 - 11:00",
            address: "456 Đường XYZ, Quận 3, TP.HCM",
            mapUrl: "https://maps.google.com/?q=456+Đường+XYZ+Quận+3+TPHCM"
        },
        thanhhon: {
            title: "Lễ Thành Hôn",
            date: "Thứ Bảy, 15/03/2025",
            time: "11:00 - 14:00",
            address: "Nhà hàng ABC, 789 Đường DEF, Quận 1, TP.HCM",
            mapUrl: "https://maps.google.com/?q=Nhà+hàng+ABC+789+Đường+DEF+Quận+1+TPHCM"
        },
        tieccuoi: {
            title: "Tiệc Cưới",
            date: "Chủ Nhật, 16/03/2025",
            time: "18:00 - 21:00",
            address: "Trung tâm tiệc cưới XYZ, 123 Đường GHI, Quận 7, TP.HCM",
            mapUrl: "https://maps.google.com/?q=Trung+tâm+tiệc+cưới+XYZ+123+Đường+GHI+Quận+7+TPHCM"
        }
    },

    // ===================================
    // DANH SÁCH ẢNH
    // ===================================
    // Để sử dụng ảnh của bạn, thay đường dẫn bên dưới
    // Ví dụ: "images/wedding-1.jpg" hoặc URL trực tiếp
    images: {
        // Ảnh slideshow banner (4 ảnh) - Thay bằng ảnh cưới của bạn
        banner: [
            "images/slideshow1.jpg",
            "images/slideshow2.jpg",
            "images/slideshow3.jpg"
        ],

        // Ảnh gallery (8 ảnh) - Thay bằng ảnh album cưới của bạn
        gallery: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop"
        ],

        // Ảnh cô dâu chú rể - Thay bằng ảnh của bạn
        groom: "images/groom.jpg",
        bride: "images/bride.jpg"
    },

    // ===================================
    // CHUYỆN TÌNH YÊU (TIMELINE)
    // ===================================
    story: [
        {
            title: "Lần đầu gặp gỡ",
            date: "15/03/2020",
            description: "Chúng tôi gặp nhau lần đầu tại một buổi họp mặt bạn bè. Ánh mắt đầu tiên đã khiến tim tôi rung động...",
            icon: "heart"
        },
        {
            title: "Buổi hẹn đầu tiên",
            date: "22/03/2020",
            description: "Một tuần sau, chúng tôi có buổi hẹn cà phê đầu tiên. Cuộc trò chuyện kéo dài đến tận khuya...",
            icon: "coffee"
        },
        {
            title: "Chính thức yêu nhau",
            date: "14/02/2021",
            description: "Vào ngày Valentine, anh đã ngỏ lời và em đã đồng ý. Đó là ngày hạnh phúc nhất của chúng tôi...",
            icon: "heart"
        },
        {
            title: "Lời cầu hôn",
            date: "14/02/2024",
            description: "Sau 3 năm bên nhau, anh đã quỳ gối cầu hôn em tại nơi chúng ta gặp nhau lần đầu...",
            icon: "ring"
        }
    ],

    // ===================================
    // CÀI ĐẶT MÀN MỞ ĐẦU (CURTAIN)
    // ===================================
    curtain: {
        // Ảnh nền full màn hình phía sau màn
        // Ví dụ: "images/curtain-background.jpg" hoặc URL ảnh
        backgroundImage: "images/curtain-bg.jpg",

        // Ảnh chữ Hỷ ở giữa màn hình (sẽ được chia đôi và kéo sang 2 bên)
        // Ví dụ: "images/xi-image.png" hoặc URL ảnh
        xiImage: "images/xi-curtain.png",

        // Ảnh cặp đôi hiển thị trong thiệp mời sau khi mở màn
        // Ví dụ: "images/couple-photo.jpg" hoặc URL ảnh
        cardPhoto: "images/couple.jpg",

        // === CÀI ĐẶT TỰ ĐỘNG ===
        // Thời gian hiển thị màn đỏ trước khi tự động mở (milliseconds)
        // 0 = chờ người dùng click, 2000 = 2 giây, 3000 = 3 giây
        autoOpenDelay: 2000,

        // Thời gian hiển thị thiệp trước khi tự động vào trang chính (milliseconds)
        // 0 = chờ người dùng click, 3000 = 3 giây, 5000 = 5 giây
        autoCloseDelay: 3000
    },

    // ===================================
    // TÙY CHỌN HIỂN THỊ
    // ===================================
    display: {
        // Hiển thị section nào
        showStory: true,
        showGallery: true,
        showEvents: true,
        showGuestbook: true,
        showRSVP: true,

        // Hiển thị social links
        showSocialLinks: true,

        // Hiển thị background music (nếu có)
        // Đặt file MP3 vào thư mục "music/" và cập nhật đường dẫn bên dưới
        // Ví dụ: "music/wedding-song.mp3" hoặc URL trực tiếp đến file MP3
        showMusicPlayer: true,
        musicUrl: "music/wedding-song.mp3",

        // Ảnh hiển thị trên đĩa nhạc (để trống sẽ dùng ảnh chú rể)
        // Ví dụ: "images/disc-cover.jpg" hoặc URL ảnh
        discImage: "images/disc-cover.jpg"
    },

    // ===================================
    // GOOGLE SHEETS API (Tùy chọn)
    // ===================================
    // Để lưu RSVP và Lời chúc vào Google Sheets:
    // 1. Tạo Google Sheet và Apps Script (xem file google-apps-script.js)
    // 2. Deploy Apps Script thành Web App
    // 3. Dán URL vào đây
    googleSheets: {
        enabled: true,  // Đổi thành true để bật tính năng
        apiUrl: "https://script.google.com/macros/s/AKfycbzjhFRt-jMYlQ-NNeBT79VQ-uqZlxTYAEo2IFNED3_vtO2jA08fbjEqipzVjFfwDO5n1Q/exec"       // Dán URL Web App của Google Apps Script vào đây
        // Ví dụ: "https://script.google.com/macros/s/AKfycbw.../exec"
    }
};

/**
 * HƯỚNG DẪN SỬ DỤNG THIỆP MỜI CÁ NHÂN HÓA
 * =====================================
 *
 * Để gửi thiệp mời có tên người nhận, thêm parameter vào URL:
 *
 * Cách 1: Sử dụng parameter "to"
 * https://your-domain.com/?to=Nguyễn%20Văn%20A
 *
 * Cách 2: Sử dụng parameter "guest"
 * https://your-domain.com/?guest=Anh%20Minh
 *
 * Cách 3: Sử dụng parameter "name"
 * https://your-domain.com/?name=Cô%20Hằng
 *
 * Lưu ý: Các ký tự đặc biệt và dấu tiếng Việt cần được encode
 * Sử dụng: encodeURIComponent("Nguyễn Văn A") để encode
 *
 * Ví dụ các link thiệp mời:
 * - ?to=Anh%20Minh%20%26%20Ch%E1%BB%8B%20Hoa (Anh Minh & Chị Hoa)
 * - ?to=Gia%20%C4%91%C3%ACnh%20anh%20Nam (Gia đình anh Nam)
 * - ?to=B%E1%BA%A1n%20Lan (Bạn Lan)
 */
