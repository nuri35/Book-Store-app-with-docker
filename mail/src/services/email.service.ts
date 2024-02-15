import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { logger } from '@logger/custom.logger';
import { EmailTypes } from '@bestnetlib/common';

class EmailService {
  private _transporter: nodemailer.Transporter;

  public async send(
    template: string,
    email: string,
    type: EmailTypes
  ): Promise<void> {
    try {
      if (!this._transporter) {
        throw new Error('Transporter is not ready yet');
      }
      const mailOptions = {
        from: process.env.USER_MAIL_AUTH,
        to: email,
        subject: type,
        html: template,
      };
      await this._transporter.sendMail(mailOptions);
    } catch (err: any) {
      throw err;
    }
  }

  public init(): void {
    this._transporter = nodemailer.createTransport(
      smtpTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
          user: process.env.USER_MAIL_AUTH,
          pass: process.env.USER_MAIL_PASSWORD,
        },
      })
    );

    this._transporter.verify((err, success) => {
      if (err) {
        logger.client.error(err.message);
      }
      if (success) {
        logger.client.info('Mail service is ready to take our messages:: ...');
      }
    });
  }
}

export const emailService = new EmailService();
