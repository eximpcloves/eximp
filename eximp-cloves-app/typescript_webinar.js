/**
 * Google Apps Script for Monthly Webinar Registration: Future READY
 */

const CONFIG = {
    SHEET_NAME: 'Registrations',
    EMAIL_SUBJECT: 'Confirmation: Future READY - Monthly Practical Webinar & Training',
    CALENDAR_LINK: 'https://calendar.app.google/U8cpbpLHcCia3pqk9',
    FROM_NAME: 'Eximp & Cloves Marketing Team'
};

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME) ||
            SpreadsheetApp.getActiveSpreadsheet().insertSheet(CONFIG.SHEET_NAME);

        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Consent']);
        }

        // Handle optional phone and consent
        const phone = data.phone || 'Not Provided';
        const consent = data.consent || 'No';

        sheet.appendRow([new Date(), data.name, data.email, phone, consent]);

        sendConfirmationEmail(data.name, data.email);

        return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function sendConfirmationEmail(name, email) {
    const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
      <div style="background: #000; padding: 40px; text-align: center;">
        <h1 style="color: #FF9D42; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Future READY</h1>
        <p style="color: #fff; margin: 10px 0 0; opacity: 0.8;">Equipping Professionals, Entrepreneurs & Leaders for Tomorrow</p>
      </div>
      
      <div style="padding: 40px;">
        <h2 style="margin-top: 0; color: #1a1a1a;">Hello ${name},</h2>
        <p>Your spot for the <strong>Future READY</strong> monthly practical webinar has been saved!</p>
        <p>We are excited to help equip you with practical insights, actionable strategies, and real-world knowledge to succeed in today’s rapidly evolving environment.</p>
        
        <div style="background: #fdf6ee; padding: 25px; border-left: 4px solid #FF9D42; border-radius: 8px; margin: 30px 0;">
          <h3 style="margin-top: 0; color: #FF9D42;">What to expect:</h3>
          <ul style="padding-left: 20px; margin-bottom: 0;">
            <li>Actionable Strategies for Career Advancement &amp; Business Growth</li>
            <li>Real-World Knowledge in Leadership &amp; Personal Effectiveness</li>
            <li>Fresh Viewpoints &amp; Insights Led by Industry Experts</li>
            <li>Monthly Platform to Learn, Connect, and Prepare for Future Opportunities</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${CONFIG.CALENDAR_LINK}" style="background: #FF9D42; color: #000; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Add to My Calendar</a>
        </div>
        
        <p style="font-size: 14px; color: #666; font-style: italic;">The meeting link can be found in the calendar link above.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;">
        
        <p style="margin-bottom: 0;">See you soon,</p>
        <p style="margin-top: 5px;"><strong>${CONFIG.FROM_NAME}</strong></p>
      </div>
    </div>
  `;

    MailApp.sendEmail({
        to: email,
        subject: CONFIG.EMAIL_SUBJECT,
        htmlBody: htmlBody,
        name: CONFIG.FROM_NAME
    });
}


