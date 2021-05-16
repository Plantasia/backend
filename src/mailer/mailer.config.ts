import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, 'templates'),
    },
  },
  transport: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  //plantasia.fatec@gmail.com
  //Plantasia@123#
  //`smtps://plantasia.fatec@gmail.com:Plantasia@123#@smtp.gmail.com`,
};
