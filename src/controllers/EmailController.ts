import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { environment } from "../enviroment";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

let htmlCreateAccount = fs.readFileSync(path.resolve(__dirname, './email/create-account.html'), 'utf8');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "joohn123game@gmail.com",
    pass: "xenr xevw pizj qhah",
  },
});

export default {
  async createAccount(req: Request, res: Response) {

    const token = jsonwebtoken.sign({ user: req.body }, environment.jwtSecretKey, { expiresIn: '10m' });

    htmlCreateAccount = htmlCreateAccount.replace("{username}", req.body.name);

    const href = `http://localhost:4200/confirm-account/${token}`;

    htmlCreateAccount = htmlCreateAccount.replace("{href}", href);

    const mailOptions = {
      from: email,
      to: req.body.email,
      subject: 'Confirmação de criação de conta',
      html: htmlCreateAccount
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log("Email enviado: " + info.response);
        res.status(200).send("Email enviado: " + info.response);
      }
    });
  }
};