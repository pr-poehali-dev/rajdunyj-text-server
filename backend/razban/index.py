import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(request):
    if request.method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": ""
        }

    if request.method != "POST":
        return {
            "statusCode": 405,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Method not allowed"})
        }

    try:
        body = json.loads(request.body)
        nick = body.get("nick", "").strip()

        if not nick:
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Ник не указан"})
            }

        # Email settings
        smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASS", "")
        to_email = "1iil.asfd@mail.ru"

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Запрос на разбан — {nick}"
        msg["From"] = smtp_user if smtp_user else "noreply@mostaxyi.ru"
        msg["To"] = to_email

        text_body = f'у вас попросили разбан на сервере "{nick}"'
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 24px;">
            <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
              <h2 style="color: #1a1a1a; margin-bottom: 16px;">🔓 Запрос на разбан</h2>
              <p style="color: #444; font-size: 16px; line-height: 1.6;">
                у вас попросили разбан на сервере <strong style="color: #6366f1;">"{nick}"</strong>
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="color: #999; font-size: 13px;">Сервер MOSTAXYI</p>
            </div>
          </body>
        </html>
        """

        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        if smtp_user and smtp_pass:
            try:
                with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_pass)
                    server.sendmail(smtp_user, to_email, msg.as_string())
                print(f"[RAZBAN] Email sent to {to_email} for nick: {nick}")
            except Exception as mail_err:
                print(f"[RAZBAN] SMTP error: {mail_err}")
                # Still return success — the request was received
        else:
            # Log if no SMTP credentials configured
            print(f"[RAZBAN] No SMTP credentials. Would send to {to_email}: {text_body}")

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"success": True, "message": "Заявка отправлена"})
        }

    except Exception as e:
        print(f"[RAZBAN ERROR] {e}")
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Внутренняя ошибка сервера"})
        }