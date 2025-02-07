export const emailtemplet=({emailLink}={})=>{

   return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm your Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding: 20px 0;
              }
              .header h1 {
                  color: #4CAF50;
              }
              .content {
                  text-align: center;
                  margin-top: 20px;
              }
              .content p {
                  font-size: 16px;
                  color: #333;
              }
              .button {
                  display: inline-block;
                  background-color: #4CAF50;
                  color: #fff;
                  font-size: 18px;
                  padding: 12px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 12px;
                  color: #777;
              }
          </style>
      </head>
      <body>
    
          <div class="container">
              <div class="header">
                  <h1> Confirm Your Email Address</h1>
              </div>
              <div class="content">
                  <p>Hi there,</p>
                  <p>Thank you for registering with us! Please click the button below to confirm your email address:</p>
                  <a href="${emailLink}" class="button">Confirm Email</a>
              </div>
              <div class="footer">
                  <p>If you did not register with us, please ignore this email.</p>
                  <p>Best regards, <br> Your Company Team</p>
              </div>
          </div>
    
      </body>
      </html>
      ;
    
    `



}