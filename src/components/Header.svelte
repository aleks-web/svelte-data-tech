<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<header class="relative flex h-(--header-height) flex-col items-center justify-between gap-4 rounded-2xl bg-(--color-block) px-6 py-4 sm:flex-row bg-white">
	<div class="max-w-[135px] cursor-pointer">
		test
	</div>

	<div class="flex w-full items-center justify-center gap-4 sm:justify-end">
		<div class="flex items-center justify-between gap-6">
			<a class="text-blue-600" href={resolve('/auth/sign-out')}>Выход</a>
		</div>

		<span class="ml-[10px] h-[25px] w-[25px] min-w-max text-(--color-primary) md:hidden">23423</span>
	</div>
</header>