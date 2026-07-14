const DOWNLOAD_URL = "https://quicks.school/download";
const LOGO_URL = "https://quicks.school/email/logo-2x.png";
const WORDMARK_URL = "https://quicks.school/email/wordmark-3x.png";

export const DOWNLOAD_EMAIL_SUBJECT = "Your Quicks download link";

export const DOWNLOAD_EMAIL_TEXT = `You're all set! Here are your download links to get started with Quicks.

Quicks records your lessons and automatically creates homework, quizzes, flashcards, and much more.

Download for free: ${DOWNLOAD_URL}
`;

/** Production HTML for Cloudflare Email Sending (hosted assets, no data-URIs). */
export function getDownloadEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${DOWNLOAD_EMAIL_SUBJECT}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f3f3;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f3f3;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="700" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:700px;background:#ffffff;border:1px solid #e8e8e8;border-radius:20px;">
            <tr>
              <td style="padding:32px 40px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" valign="middle">
                      <a href="https://quicks.school/en" style="display:inline-block;text-decoration:none;color:#111111;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td valign="middle" style="padding:0 8px 0 0;">
                              <img src="${LOGO_URL}" width="28" height="28" alt="Quicks" style="display:block;width:28px;height:28px;border:0;-ms-interpolation-mode:bicubic;" />
                            </td>
                            <td valign="middle">
                              <img src="${WORDMARK_URL}" width="80" height="26" alt="quicks" style="display:block;width:80px;height:26px;border:0;-ms-interpolation-mode:bicubic;" />
                            </td>
                          </tr>
                        </table>
                      </a>
                    </td>
                    <td align="right" valign="middle">
                      <a href="${DOWNLOAD_URL}" style="display:inline-block;padding:8px 14px;border:1px solid #e5e5e5;border-radius:999px;background:#ffffff;color:#111111;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:500;line-height:18px;text-decoration:none;">Download</a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:36px;">
                  <tr>
                    <td style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:24px;color:#111111;">
                      You’re all set! Here are your download links to get started with Quicks.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:20px;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;color:#111111;">
                      Quicks records your lessons and automatically creates homework, quizzes, flashcards, and much more.
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td align="center">
                      <a href="${DOWNLOAD_URL}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#111111;color:#ffffff;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;line-height:20px;text-decoration:none;">Download for free</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
