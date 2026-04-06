<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	console.log(data);
</script>

<svelte:head>
	<title>Коннект</title>
</svelte:head>

<div class="flex min-h-full flex-col">
	<h2 class="font-bold text-[20px] md:text-[25px] xl:text-[30px]">Connection</h2>
</div>