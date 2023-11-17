import nodemailer from "nodemailer";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { environment } from "../enviroment";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

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

    const href = `http://localhost:4200/confirm-account/${token}`;

    const htmlCreateAccount = `
    <div style="background-color: #fff">
  <div
    style="
      margin: 0px auto;
      max-width: 640px;
      background: transparent;
      background-color: #fff;
      border-radius: 10px;
    "
  >
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      style="font-size: 0px; width: 100%; background: transparent"
      align="center"
      border="0"
    >
      <tbody>
        <tr>
          <td
            style="
              text-align: center;
              vertical-align: top;
              direction: ltr;
              font-size: 0px;
              padding: 40px 0px;
            "
          >
            <div
              aria-labelledby="mj-column-per-100"
              class="m_2336313810632876189mj-column-per-100"
              style="
                vertical-align: top;
                display: inline-block;
                direction: ltr;
                font-size: 13px;
                text-align: left;
                width: 100%;
              "
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                border="0"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        word-break: break-word;
                        font-size: 0px;
                        padding: 0px;
                      "
                      align="center"
                    >
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        style="border-collapse: collapse; border-spacing: 0px"
                        align="center"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td style="width: 138px">
                              <img
                                alt=""
                                title=""
                                height="300"
                                src="https://imgur.com/EWX3hv8.png"
                                width="300"
                                class="CToWUd"
                                data-bit="iit"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    style="
      max-width: 640px;
      margin: 0 auto;
      border-radius: 4px;
      overflow: hidden;
    "
  >
    <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        style="font-size: 0px; width: 100%; background: #ffffff"
        align="center"
        border="0"
      >
        <tbody>
          <tr>
            <td
              style="
                text-align: center;
                vertical-align: top;
                direction: ltr;
                font-size: 0px; /* padding:40px 50px; */
              "
            >
              <div
                aria-labelledby="mj-column-per-100"
                class="m_2336313810632876189mj-column-per-100"
                style="
                  vertical-align: top;
                  display: inline-block;
                  direction: ltr;
                  font-size: 13px;
                  text-align: left;
                  width: 100%;
                "
              >
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          word-break: break-word;
                          font-size: 0px;
                          padding: 0px;
                        "
                        align="left"
                      >
                        <div
                          style="
                            color: #737f8d;
                            font-family: Whitney, Helvetica Neue, Helvetica,
                              Arial, Lucida Grande, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            text-align: left;
                          "
                        >
                          <h2
                            style="
                              font-family: Whitney, Helvetica Neue, Helvetica,
                                Arial, Lucida Grande, sans-serif;
                              font-weight: 500;
                              font-size: 20px;
                              text-align: center !important;
                              color: #4f545c;
                              letter-spacing: 0.27px;
                            "
                          >
                            Olá,
                            <span style="color: #008fe8; font-weight: bold"
                              >${req.body.name}</span
                            >!
                          </h2>
                          <div
                            style="
                              box-sizing: border-box;
                              line-height: inherit;
                              text-align: left !important;
                              margin: -30px 120px auto !important;
                            "
                          >
                            <table
                              align="center"
                              style="
                                box-sizing: border-box;
                                border-spacing: 0;
                                background: transparent;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      box-sizing: border-box;
                                      vertical-align: top;
                                      color: #444;
                                      min-width: auto !important;
                                      font-size: 14px;
                                      max-width: 50%;
                                      line-height: inherit;
                                      font-family: Helvetica, Arial, sans-serif;
                                    "
                                  >
                                    <table
                                      style="
                                        box-sizing: border-box;
                                        border-spacing: 0;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            style="
                                              color: #444;
                                              line-height: 1.3;
                                              font-family: PT Sans, Arial,
                                                sans-serif;
                                              min-width: auto !important;
                                              font-size: 14px;
                                              padding-bottom: 4px;
                                            "
                                          >
                                            <table
                                              style="
                                                box-sizing: border-box;
                                                border-spacing: 0;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <th
                                                    style="
                                                      color: #444;
                                                      line-height: 1.3;
                                                      font-family: PT Sans,
                                                        Arial, sans-serif;
                                                      min-width: auto !important;
                                                      font-size: 14px;
                                                    "
                                                  >
                                                    &nbsp;
                                                  </th>
                                                  <th
                                                    style="
                                                      color: #444;
                                                      line-height: 1.3;
                                                      font-family: PT Sans,
                                                        Arial, sans-serif;
                                                      min-width: auto !important;
                                                      font-size: 14px;
                                                    "
                                                  ></th>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div
                              bgcolor="#f3189e"
                              style="
                                box-sizing: border-box;
                                background: #008fe8;
                                border-radius: 10px;
                                text-align: center;
                                color: #fff;
                                text-transform: uppercase;
                                font-family: PT Sans, Arial, sans-serif;
                                font-size: 20px;
                                font-weight: 700;
                                min-width: auto !important;
                                line-height: inherit;
                              "
                            >
                            <a
                            href="${href}"
                            style="
                              line-height: inherit;
                              padding: 15px 35px;
                              color: #fff;
                              text-decoration: none;
                              display: block;
                            "
                          >Clique aqui</a
                          >
                            </div>
                          </div>
                          <p style="text-align: center !important">
                            Clique no botão acima para confirmar seu email e
                            criar sua conta!
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          word-break: break-word;
                          font-size: 0px;
                          padding: 30px 0px;
                        "
                      >
                        <p
                          style="
                            font-size: 1px;
                            margin: 0px auto;
                            border-top: 1px solid #dcddde;
                            width: 100%;
                          "
                        ></p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          word-break: break-word;
                          font-size: 0px;
                          padding: 0px;
                        "
                        align="left"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    `

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