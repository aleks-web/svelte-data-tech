import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	if (event.url.searchParams.has('start') || event.url.searchParams.has('mailReady')) {
		return {};
	}

	const token = event.url.searchParams.get('token');
	const rottenToken = event.url.searchParams.get('error');

	if (rottenToken) {
		error(400, { message: 'Ссылка для сброса пароля - устарела' });
	}

	if (token) {
		return {};
	}

	error(400, { message: 'Ссылка для сброса пароля - устарела' });
};

export const actions: Actions = {
	resetPassword: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get('password')?.toString() ?? '';
		const token = formData.get('token')?.toString() ?? '';

		try {
			await auth.api.resetPassword({
				body: {
					newPassword: password,
					token
				}
			});
		} catch (e) {
			if (e instanceof APIError) {
				error(500, { message: 'Не удалось сбросить пароль. Попробуйте еще раз' });
			}
		}

		redirect(302, resolve('/auth?in&lockResetPassword'));
	},
	sendMail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';

		try {
			const { status } = await auth.api.requestPasswordReset({
				body: {
					email: email,
					redirectTo: '/auth/reset-password'
				}
			});
		} catch (e) {
			if (e instanceof APIError) {
				error(500, { message: 'Не удалось отправить письмо для сброса пароля' });
			}
		}

		event.cookies.set('lock-reset-password', (new Date()).getTime().toString(), {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 3600
		});

		redirect(302, resolve(`/auth/reset-password?mailReady=${email}`));
	}
};