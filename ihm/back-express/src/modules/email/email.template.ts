export const notificationEmail = (roomName: string) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email centré</title>
      </head>
      <body style="margin: 0; padding: 0; height: 100%; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="border-collapse: collapse;">
          <tr>
            <td align="center" valign="middle" style="padding: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; padding: 20px; max-width: 600px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" style="padding: 20px;">
                    <p style="font-size: 16px; color: #333333; margin: 0; line-height: 1.5;">Il semblerait qu'une erreur ai lieu dans la pièce suivante: <span>${roomName}</span></p>
                    <p style="font-size: 16px; color: #333333; margin-top: 10px; line-height: 1.5;">Il est possible que vous chauffiez une salle vide.</p>
                    <p style="font-size: 16px; color: #333333; margin-top: 10px; line-height: 1.5;">Retrouvez l'ensemble des informations sur votre compte Celsius.</p>
                    <p style="font-size: 16px; color: #333333; margin-top: 10px; line-height: 1.5;"><a style="color: #007bff;" href="http://celsius.ovh" target="_blank">Celsius.ovh</a></p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px; font-size: 14px; color: #666666; margin-top: 20px;">
                    © 2024 Celsius - Tous droits réservés.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html> 
    `;
};
