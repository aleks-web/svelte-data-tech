<script lang="ts">
	import type { PageProps } from './$types';
    import { page } from "$app/state";
	let { data }: { data: PageProps } = $props();
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Проверьте электронную почту</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative flex flex-col justify-center items-center text-center">
        <p>Письмо с ссылкой на подтверждение выслано на Email {page.url.searchParams.get('mailReady')}. Пожалуйста, <b>проверьте</b> электронную почту и <b>перейдите</b> по ссылке</p>
    </div>
</div>