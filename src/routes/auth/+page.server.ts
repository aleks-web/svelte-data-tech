import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	const isIn = event.url.searchParams.has('in');

	// if (event.locals.user) {
	// 	return redirect(302, resolve('/'));
	// }

	if (!event.locals.user && !isIn && !event.isDataRequest) {
		return redirect(302, resolve('/auth?in'));
	}

	return {
		lockResetPassword: Number(event.cookies.get('lock-reset-password')) as number
	};
};

export const actions: Actions = {
	signInEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, resolve('/'));
	},
	signUpEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';

		if (!name || !password || !email) {
			return fail(500, { message: 'Заполните все поля' });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, resolve(`/auth/up-success?mailReady=${email}`));
	}
};
