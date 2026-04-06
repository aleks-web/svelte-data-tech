import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import sendMail from '$lib/server/mail';
import { i18n } from '@better-auth/i18n';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	basePath: '/api/auth',
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'mysql' }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		revokeSessionsOnPasswordReset: true,
		callbackURL: '/auth/reset-password',
		sendResetPassword: async ({ user, url, token }) => {
			return sendMail('dok.go@yandex.ru', 'dok.go@yandex.ru', 'Тестовое сообщение', url);
		},
		onPasswordReset: async ({ user }, request) => {
			return sendMail(
				'dok.go@yandex.ru',
				'dok.go@yandex.ru',
				'Пароль успешно изменён',
				`${user.name}, Ваш пароль успешно изменён!`
			);
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent),
		i18n({
			translations: {
				ru: {
					USER_NOT_FOUND: 'Пользователь не найден',
					INVALID_EMAIL_OR_PASSWORD: 'Email или пароль не верны',
					INVALID_PASSWORD: 'Пароль не верный',
					CREDENTIAL_ACCOUNT_NOT_FOUND: 'Учётные данные не верны',
					EMAIL_NOT_VERIFIED: 'Email не подтверждён'
				}
			},
			detection: ['session'],
			userLocaleField: 'locale'
		})
	],
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ url }) => {
			await sendMail('dok.go@yandex.ru', 'dok.go@yandex.ru', 'Подтвердите Email', url);
		}
	},
	user: {
		additionalFields: {
			locale: { type: 'string', required: false, defaultValue: 'ru' }
		}
	}
});
