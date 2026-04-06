<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { data, form }: PageProps = $props();
	let isIn = $derived(page.url.searchParams.has('in'));
	let unLockResetPasswordMinutes = $derived.by(() => {
		const nowTime = new Date();
		const timeLockResetPassword = new Date();
		timeLockResetPassword.setTime(data.lockResetPassword);

		const differenceInMilliseconds = nowTime - timeLockResetPassword;

		const differenceInSeconds = differenceInMilliseconds / 1000;
		const differenceInMinutes = differenceInSeconds / 60;

		return 60 - Math.round(differenceInMinutes);
	});
</script>

<svelte:head>
	<title>{ isIn ? 'Вход' : 'Регистрация' }</title>
</svelte:head>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
			{ isIn ? 'Вход' : 'Регистрация' }
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative flex flex-col justify-center items-center">
		<form class="w-full" method="post" action="{isIn ? '?/signInEmail' : '?/signUpEmail'}" use:enhance>
			<div class="flex flex-col gap-4">

				{#if !isIn}
					<div>
						<label for="username" class="block text-sm/6 font-medium text-gray-900">Имя</label>
						<div class="mt-2">
							<input
								id="username"
								type="text"
								name="name"
								autocomplete="username"
								class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
				{/if}

				<div>
					<label for="email" class="block text-sm/6 font-medium text-gray-900">Email адрес</label>
					<div class="mt-2">
						<input
							id="email"
							type="email"
							name="email"
							value="dok.go@yandex.ru"
							required
							autocomplete="email"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm/6 font-medium text-gray-900">Пароль</label>
						<div class="text-sm">
							{#if unLockResetPasswordMinutes}
								<span class="text-indigo-600 flex flex-col items-end">
									<span>Пароль изменён</span>
									{#if unLockResetPasswordMinutes}
										<span class="text-[11px] text-[#9d9d9d]">(следующее изменение возможно через {unLockResetPasswordMinutes} мин)</span>
									{/if}
								</span>
							{:else}
								{#if isIn}
									<a href={resolve('/auth/reset-password?start')}
									   class="font-semibold text-indigo-600 hover:text-indigo-500">
										Сбросить пароль
									</a>
								{/if}
							{/if}
						</div>
					</div>
					<div class="mt-2">
						<input
							id="password"
							type="password"
							name="password"
							value="testTestTest"
							required
							autocomplete="current-password"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<button
					type="submit"
					class="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{#if isIn}Вход{:else}Регистрация{/if}
				</button>

				{#if isIn}
					<a href={ resolve('/auth?up') } class="max-w-max text-[15px] m-auto underline text-indigo-600">Регистрация</a>
				{:else}
					<a href={ resolve('/auth?in') } class="max-w-max text-[15px] m-auto underline text-indigo-600">Вход</a>
				{/if}
			</div>
		</form>

		<div class="text-center mt-2 absolute top-full m-auto">{form?.message ?? ''}</div>
	</div>
</div>