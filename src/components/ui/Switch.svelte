<script lang="ts">
    import { createSwitch, melt } from '@melt-ui/svelte';
    const {
        elements: { root, input },
        states: { checked }
    } = createSwitch();

    $effect(() => {
        console.log($checked);
    });
</script>

<div class="flex items-center">
    <button
            use:melt={$root}
            class:checked={$checked}
            class="group relative h-6 cursor-pointer rounded-full
                 bg-blue-100 transition-colors
                 data-[state=checked]:bg-blue-300
                   data-[state=checked][&>*]:bg-red-200
            "
    >
        <span class="thumb group-[.checked]:bg-blue-600 block rounded-full bg-blue-400 transition" />
    </button>
    <input use:melt={$input} />
</div>

<style>
    button {
        --w: 2.75rem;
        --padding: 0.125rem;
        width: var(--w);
    }

    .thumb {
        --size: 1.25rem;
        width: var(--size);
        height: var(--size);
        transform: translateX(var(--padding));
    }

    :global([data-state='checked']) .thumb {
        transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
    }
</style>