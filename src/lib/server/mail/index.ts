import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'yandex',
	host: 'smtp.yandex.ru',
	auth: {
		user: 'dok.go@yandex.ru',
		pass: 'wxjvdfpdrmuhiwdm'
	},
	secure: true,
	port: 465
});

export default async function sendMail(
	from?: string,
	to?: string,
	subject?: string,
	html?: string
) {
	await transporter.sendMail({
		from: from ?? 'dok.go@yandex.ru',
		to: to ?? 'dok.go@yandex.ru',
		subject: subject ?? 'test',
		html: html ?? '<h1>Test</h1>'
	});
}