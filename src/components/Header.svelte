<script lang="ts">
	import { resolve } from "$app/paths";
	import gravatarUrl from 'gravatar-url';
	import { createAvatar, melt } from '@melt-ui/svelte';

	const {
		elements: { image },
	} = createAvatar({
		src: gravatarUrl('dok.go@yandex.ru', {size: 40}),
	});

</script>

<header class="relative flex h-(--header-height) flex-col items-center justify-between gap-4 rounded-2xl bg-(--color-block) px-6 py-4 sm:flex-row bg-white">
	<div class="max-w-[135px] cursor-pointer">
		test
	</div>

	<div class="flex w-full items-center justify-center gap-4 sm:justify-end">

		<div class="rounded-full w-10 aspect-1 overflow-hidden">
			<img use:melt={$image} alt="Avatar" class="h-full w-full" />
		</div>

		<div class="flex items-center justify-between gap-6">
			<a data-sveltekit-preload-data="false" class="text-blue-800 hover:text-blue-600 transition-colors flex items-center justify-center gap-1" href={resolve('/auth/sign-out')}>
				<span>Выход</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
					<path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
				</svg>
			</a>
		</div>

		<span class="ml-[10px] h-[25px] w-[25px] min-w-max text-(--color-primary) md:hidden">23423</span>
	</div>
</header>