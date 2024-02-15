import { IMailTemplate } from '@common-types/interfaces/template.interface';
import { Template } from '@bestnetlib/common';

export class VerifyEmailTemplate extends Template {
  constructor(private emailObj: IMailTemplate) {
    super();
  }
  generateBody(): string {
    return `
     <!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Posta Onayı</title>
    <style>
        /* Genel stiller */
        body {
            margin: 0;
            padding: 0;
            background-color: #F5F7FA;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        /* İçerik stilleri */
        .content {
            background-color: #FFFFFF;
            border-radius: 5px;
            padding: 40px 30px;
            margin: 20px;
            text-align: center;
        }

        .content h2 {
            margin-bottom: 20px;
            font-size: 20px;
            color: #5E6063;
        }

        .content p {
            font-size: 18px;
            color: #252930;
            margin: 10px 0;
        }

        .content a {
            display: inline-block;
            text-decoration: none;
            background-color: #3B82F6;
            color: #fff;
            border-radius: 4px;
            padding: 16px;
            font-size: 18px;
            font-weight: 500;
            margin-top: 20px;
        }

        /* Altbilgi stilleri */
        .footer {
            text-align: center;
            background-color: #FFFFFF;
            padding: 20px;
            border-top: 1px solid #DFD9D9;
        }

        .footer p {
            margin: 10px 0;
            font-size: 14px;
            color: #797B7F;
        }
    </style>
</head>

<body>

    <div class="content">
        <h2>Merhaba ${this.emailObj.content.fullName},</h2>
        <p>E-postanızı onaylamak için lütfen aşağıdaki bağlantıya tıklayın:</p>
        <a href="${this.emailObj.content.token}">Onayla</a>
        <p>Saygılarımla,<br>E-ADAM</p>
    </div>

    
</body>

</html>


      `;
  }
}
