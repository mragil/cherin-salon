<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { DiscountDropdownProps } from '$lib/types';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';

	let { discounts, discount, onSelected }: DiscountDropdownProps = $props();
	let open = $state(false);
	let value = $state(discount);
	let triggerRef = $state<HTMLButtonElement>(null!);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{value}%
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="p-0">
		<Command.Root>
			<Command.List>
				<Command.Group>
					{#each discounts as discount}
						<Command.Item
							class={value === discount ? 'bg-primary' : ''}
							value={discount.toString()}
							onSelect={() => {
								value = discount;
								onSelected(value);
								closeAndFocusTrigger();
							}}
						>
							{discount}%
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
