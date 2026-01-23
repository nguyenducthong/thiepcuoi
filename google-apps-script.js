/**
 * Google Apps Script - Wedding RSVP & Guestbook
 *
 * HƯỚNG DẪN QUAN TRỌNG:
 * 1. Tạo Google Sheet mới
 * 2. Tạo 2 sheet con (tab) tên CHÍNH XÁC: "RSVP" và "Wishes"
 * 3. Vào Extensions > Apps Script
 * 4. Xóa code mặc định, dán toàn bộ code này vào
 * 5. Click "Deploy" > "New deployment"
 * 6. Chọn type: "Web app"
 * 7. Execute as: "Me" (tài khoản của bạn)
 * 8. Who has access: "Anyone" (BẮT BUỘC)
 * 9. Click "Deploy" và copy URL
 * 10. Dán URL vào file config.js của website
 *
 * LƯU Ý: Mỗi khi sửa code, phải Deploy lại với version mới!
 */

// Xử lý POST request
function doPost(e) {
  try {
    // Parse data từ request
    let data;

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    if (!data) {
      return createResponse({ success: false, message: 'No data received' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'rsvp') {
      // Lưu RSVP
      let rsvpSheet = sheet.getSheetByName('RSVP');
      if (!rsvpSheet) {
        // Tạo sheet nếu chưa có
        rsvpSheet = sheet.insertSheet('RSVP');
        rsvpSheet.appendRow(['Thời gian', 'Họ tên', 'Số điện thoại', 'Số người', 'Sự kiện']);
      }

      rsvpSheet.appendRow([
        new Date().toLocaleString('vi-VN'),
        data.name || '',
        data.phone || '',
        data.guests || '',
        data.event || ''
      ]);

      return createResponse({ success: true, message: 'RSVP saved!' });
    }

    if (data.type === 'wish') {
      // Lưu lời chúc
      let wishSheet = sheet.getSheetByName('Wishes');
      if (!wishSheet) {
        // Tạo sheet nếu chưa có
        wishSheet = sheet.insertSheet('Wishes');
        wishSheet.appendRow(['Thời gian', 'Họ tên', 'Lời chúc']);
      }

      wishSheet.appendRow([
        new Date().toLocaleString('vi-VN'),
        data.name || '',
        data.message || ''
      ]);

      return createResponse({ success: true, message: 'Wish saved!' });
    }

    return createResponse({ success: false, message: 'Unknown type: ' + data.type });

  } catch (error) {
    return createResponse({ success: false, message: error.toString() });
  }
}

// Xử lý GET request (để test và fallback)
function doGet(e) {
  // Nếu có parameter, xử lý như POST
  if (e.parameter && e.parameter.type) {
    return doPost(e);
  }

  // Nếu yêu cầu lấy danh sách lời chúc
  if (e.parameter && e.parameter.action === 'getWishes') {
    return getWishes();
  }

  return createResponse({
    status: 'Wedding API is running!',
    message: 'Use POST request to submit data'
  });
}

// Lấy danh sách lời chúc từ Google Sheets
function getWishes() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const wishSheet = sheet.getSheetByName('Wishes');

    if (!wishSheet) {
      return createResponse({ success: true, wishes: [] });
    }

    const data = wishSheet.getDataRange().getValues();
    const wishes = [];

    // Bỏ qua hàng đầu tiên (header)
    for (let i = 1; i < data.length; i++) {
      wishes.push({
        id: i,
        date: data[i][0] || '',
        name: data[i][1] || '',
        message: data[i][2] || ''
      });
    }

    // Sắp xếp lời chúc mới nhất lên trước
    wishes.reverse();

    return createResponse({ success: true, wishes: wishes });
  } catch (error) {
    return createResponse({ success: false, message: error.toString(), wishes: [] });
  }
}

// Helper function để tạo response với CORS headers
function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - chạy trong Apps Script để test
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        type: 'wish',
        name: 'Test User',
        message: 'Test message'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
