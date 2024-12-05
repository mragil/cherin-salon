<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-2">
				<Input
					id="identity"
					placeholder="Email or username"
					type="text"
					autocapitalize="none"
					autocorrect="off"
					disabled={isLoading}
				/>

				<Input
					id="password"
					placeholder="Password"
					type="password"
					autocapitalize="none"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Login
			</Button>
		</div>
	</form>
</div>
