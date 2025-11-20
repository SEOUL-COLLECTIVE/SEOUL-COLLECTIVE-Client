import * as nodemailer from 'nodemailer';

// ------------------------------
// Nodemailer 설정
// ------------------------------
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // 💡 Gmail 사용 시 '앱 비밀번호(App Password)'를 사용해야 합니다.
    },
})

/**
 * @param to - 수신자 이메일 주소
 * @param code - 6자리 인증 코드
 */
export async function sendVerificationEmail(to: string, code: string): Promise<void> {
    const mailOptions = {
        from: `${process.env.SMTP_USER}`,
        to: to,
        subject: '[Seoul Collective] 비밀번호 재설정 인증 코드',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">비밀번호 재설정 요청</h2>
                <p>비밀번호를 재설정하려면 다음 인증 코드를 사용하십시오:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px;">
                    <h1 style="color: #007bff; margin: 0; font-size: 28px;">${code}</h1>
                </div>
                <p style="margin-top: 15px;">이 코드는 1시간 동안 유효합니다.</p>
                <p>만약 본인이 요청한 것이 아니라면 이 이메일을 무시하십시오.</p>
            </div>
        `,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log(`[EMAIL] Sent successfully to ${to}`)
    } catch (error) {
        console.error(`[ERROR - Email] Failed to send email to ${to}:`, error)
        throw new Error('[Error] Email sending failed.')
    }
}