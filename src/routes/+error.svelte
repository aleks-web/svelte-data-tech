<script lang="ts">
    import { page } from '$app/state';
    import { resolve } from "$app/paths";
</script>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
        <h1 class="mt-4 text-5xl text-indigo-600 font-semibold tracking-tight text-balance sm:text-7xl">{page.status}</h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{page?.error?.message}</p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href={resolve('/')} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Главная</a>
            <a href={resolve('/auth?in')} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Вход</a>
        </div>
    </div>
</main>