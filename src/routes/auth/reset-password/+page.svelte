<script lang="ts">
    import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
    import { page } from "$app/state";
	let { params, form }: PageProps = $props();

    function hasGetParam(param: string) {
        return page.url.searchParams.has(param)
    }
</script>

<svelte:head>
    <title>
        {hasGetParam('mailReady') ? 'Подтверждение выслано на email' : ''}
        {hasGetParam('token') ? 'Сброс пароля' : ''}
    </title>
</svelte:head>


{#if page.url.searchParams.has('start')}
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Введите email</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative flex flex-col justify-center items-center">
            <form class="w-full" method="post" action="?/sendMail" use:enhance>
                <div class="flex flex-col gap-4">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Ваш Email</label>
                        <div class="mt-2">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value="dok.go@yandex.ru"
                                placeholder="Ваш Email"
                                required
                                autocomplete="email"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Сбросить пароль
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}

{#if page.url.searchParams.has('mailReady')}
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Проверьте электронную почту</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative flex flex-col justify-center items-center text-center">
            <p>Письмо с ссылкой на подтверждение сброса пароля отправлена на ваш email ({page.url.searchParams.get('mailReady')}). Пожалуйста, <b>проверьте</b> электронную почту и <b>перейдите</b> по ссылке</p>
        </div>
    </div>
{/if}

{#if !page.url.searchParams.has('start') && page.url.searchParams.has('token')}
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Сброс пароля</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative flex flex-col justify-center items-center">
            <form class="w-full" method="post" action="?/resetPassword" use:enhance>
                <input
                    type="hidden"
                    name="token"
                    value={page.url.searchParams.get('token')}
                />

                <div class="flex flex-col gap-4">
                    <div>
                        <label for="new-password" class="block text-sm/6 font-medium text-gray-900">Новый пароль</label>
                        <div class="mt-2">
                            <input
                                    id="new-password"
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
                        Сбросить пароль
                    </button>
                </div>
            </form>

            <div class="text-center mt-2 absolute top-full m-auto">{form?.message ?? ''}</div>
        </div>
    </div>
{/if}