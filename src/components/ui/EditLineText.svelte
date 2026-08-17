<script lang="ts">
    import IMask from 'imask';
    import { onMount } from 'svelte';

    let { text = $bindable(), blurCallback, maskOptions }: { text?: string | null, blurCallback?: (text?: string) => void, maskOptions?: object } = $props();
    let isActive = $state(false);
    let inputElement = $state<HTMLInputElement>();
    let hasText = $derived(typeof text === 'string' && text.trim().length > 0);

    $effect(() => {
        if (isActive) {
            inputElement?.focus();
        }
    });

    onMount(() => {
        if (maskOptions && inputElement) {
            IMask(inputElement, maskOptions);
        }
    })

    function onBlurHandler() {
        isActive = false;

        if (blurCallback) {
            blurCallback(text ?? undefined);
        }
    }
</script>

{#if isActive || hasText}
    <div class="flex items-center gap-0">
        <input bind:value={text}
               name="editLineText"
               disabled={!isActive}
               onblur={onBlurHandler}
               bind:this={inputElement}
               class="field-sizing-content border-0 outline-0 px-2 py-0 bg-transparent rounded-md
                      disabled:border-transparent
                      focus:bg-blue-100"
        />
        <button type="button"
                aria-label="Редактировать текст"
                title="Редактировать"
                onclick={() => isActive = true}
                disabled={isActive}
                class="group disabled:hidden cursor-pointer"
        >
            <svg class="w-4 h-4 group-hover:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
        </button>
    </div>
{:else}
    <button
            type="button"
            onclick={() => isActive = true}
            class="cursor-pointer border-1 text-blue-500 border-blue-500  py-1 px-2 rounded-md transition-colors
                 hover:bg-blue-500 hover:text-white"
    >Добавить</button>
{/if}
