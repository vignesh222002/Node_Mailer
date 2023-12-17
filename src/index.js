import express from "express";
import nodeMailer from "nodemailer";
import { config } from "dotenv";

const app = express();
app.use(express.json());


config();


const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_APP_PASSWORD = process.env.SENDER_APP_PASSWORD;

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

function sendMail(toMail, response) {
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
            response.status(500).send({
                message: 'Something went Wrong',
                error: err
            })
        }
        else {
            console.log("Email sent Successfully", data)
            response.status(200).send({
                message: 'Mail Sent Successfully',
                response: data
            })
        }
    })
}

app.post('/send', (request, response) => {
    sendMail(request.body.to, response)
})

app.listen(4000, () => console.log("Server listening in Port 4000"))