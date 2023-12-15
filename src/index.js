import express from "express";
import nodeMailer from "nodemailer";
import { SENDER_APP_PASSWORD, SENDER_EMAIL } from "../utils/envParser.js";

const app = express();
app.use(express.json());

const html = `
    <h1>Hello World!</h1>
    <p>This is mail</p>
`

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_APP_PASSWORD,
    }
})

function sendMail(toMail) {
    const mailContent = {
        from: SENDER_EMAIL,
        to: toMail,
        subject: "Subject",
        // text: "Email Text",
        html: html,
    }

    transporter.sendMail(mailContent, (err, data) => {
        if (err) {
            console.log("Failed to send email", err)
        }
        else {
            console.log("Email sent Successfully", data)
        }
    })
}

app.post('/send', (request, response) => {
    sendMail(request.body.to)
    response.status(200).send({
        message: 'Mail Sent Successfully'
    })
})

app.listen(4000, () => console.log("Server listening in Port 4000"))