import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  transport:{
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "plantasia.fatec@gmail.com",
      pass: "Plantasia@123#"
    },
    tls:{
        rejectUnauthorized: false
    }

  }
  //plantasia.fatec@gmail.com
  //Plantasia@123#  
  //`smtps://plantasia.fatec@gmail.com:Plantasia@123#@smtp.gmail.com`,
};