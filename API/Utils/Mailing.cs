using System;
using System.Net.Mail;

namespace API.Utils
{
    public class Mailing
    {
        internal static void SendPasswordMail(string email, string guid, string name)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("jack44ripper@gmail.com");
                mail.To.Add(email);
                mail.Subject = $"Your Password for Leave Application {DateTime.Now}";
                mail.Body = $"Hi {name},\nThis is your new password : {guid}";
                using (SmtpClient smpt = new SmtpClient("smtp.gmail.com", 587))
                {
                    smpt.Credentials = new System.Net.NetworkCredential("", "");
                    smpt.EnableSsl = true;
                    smpt.Send(mail);
                }
            }
        }
    }
}
