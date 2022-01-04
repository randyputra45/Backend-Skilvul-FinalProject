const sendGridMail = require("@sendgrid/mail");
const res = require("express/lib/response");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getEmailHtml(emailMessage, url) {
  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
    <style>
      * {
        box-sizing: border-box;
      }

      @media (prefers-color-scheme: light) {
        .light-scheme { background-color: white; }
      }
      
      @media (prefers-color-scheme: dark) {
        .day.dark-scheme   { color: black; }
      }
  
      body {
        margin: 0;
        padding: 0;
      }
  
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }
  
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }
  
      p {
        line-height: inherit
      }
  
      @media (max-width:670px) {
        .row-content {
          width: 100% !important;
        }
  
        .stack .column {
          width: 100%;
          display: block;
        }
      }
    </style>
  </head>
  
  <body class="light-scheme" style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f1ffff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="padding-bottom:25px;padding-top:15px;width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img src="https://i.ibb.co/LNKjhTn/gocure-panjang.png" style="display: block; height: auto; border: 0; width: 130px; max-width: 100%;" width="130" alt="your logo" title="your logo"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f1ffff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #86ffcc; background-image: ; background-repeat: no-repeat; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 45px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td>
                                  <div align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img src="https://i.postimg.cc/85q1vmbY/undraw-secure-login-pdn4.png" style="display: block; height: auto; border: 0; width: 293px; max-width: 100%;" width="293"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="padding-bottom:30px;padding-top:30px;text-align:center;width:100%;">
                                  <h1 class="day dark-scheme" style="margin: 0; color: #292929; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 28px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>${emailMessage.title}</strong></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td style="padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="font-family: Arial, sans-serif">
                                    <div style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #292929; line-height: 1.5;">
                                      <p style="margin: 0; text-align: center; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#000000;">${emailMessage.text}<br></span></p>
                                      <p style="margin: 0; text-align: center; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#000000;"></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td style="padding-bottom:25px;padding-left:10px;padding-right:10px;padding-top:35px;">
                                  <div style="font-family: sans-serif">
                                    <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #000000; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                      <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:42px;"><strong></strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td>
                                  <div align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E1B4FC;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td style="padding-bottom:10px;padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="font-family: Arial, sans-serif">
                                    <div style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                      <p style="margin: 0; mso-line-height-alt: 19.5px;"><span style="font-size:13px;color:#000000;">${emailMessage.buttonMessage}<br></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;">
                                  <div align="center">
                                    <a href=${url} target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#00696e;border-radius:0px;width:auto;border-top:1px solid #00696e;border-right:1px solid #00696e;border-bottom:1px solid #00696e;border-left:1px solid #00696e;padding-top:10px;padding-bottom:10px;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span style="font-size: 14px; line-height: 28px;" data-mce-style="font-size: 14px; line-height: 28px;">${emailMessage.title}<br></span></span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f1ffff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td>
                                  <div align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td>
                                  <div style="font-family: sans-serif">
                                    <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                      <p style="margin: 0; text-align: center;"><span style="font-size:11px;color:#000000;">If you did not make this request, you do not need to do anything.</span></p>
                                      <p style="margin: 0; text-align: center;"><span style="font-size:11px;color:#000000;">Thanks for your time</span></p>
                                      <p style="margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                      <p style="margin: 0; text-align: center;"><span style="font-size:11px;color:#000000;"><span style>Jakarta, Indonesia&nbsp; /&nbsp;&nbsp;GoCure by MS Wellbeing /&nbsp;gocure.netlify.app</span><a href="http://www.example.com" style="color:#000000;"></a></span></p>
                                      <p style="margin: 0; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="social_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td>
                                  <table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                      <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>
  </html>`;
}

function getMessage(emailParams, emailMessage, url) {
  return {
    to: emailParams.email,
    from: "gocure16@gmail.com",
    subject: emailMessage.subject,
    text: `Hey ${emailParams.email}, we have received your password reset request, Use the link below to set up a new password for your account. This link will expire in 4 hours.`,
    html: getEmailHtml(emailMessage, url),
  };
}

async function sendEmail(emailParams, emailMessage, url) {
  try {
    await sendGridMail.send(
      getMessage(emailParams, emailMessage, url)
    );
    return {
      success: true,
      message: `Email sent successfully`,
    };
  } catch (error) {
    const message = `Error sending email`;
    console.error(message);
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    return res.status(200).json({
      success: false,
      message: `Error sending email`,
    });
  }
}

module.exports = {
  sendEmail,
};
