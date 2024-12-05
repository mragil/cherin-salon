<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { UserAuthProps } from '$lib/types';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let identity = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let { loginAction }: UserAuthProps = $props();

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		await loginAction(identity, password);
		isLoading = false;
	}
</script>

<div class="grid gap-6">
	<form onsubmit={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-2">
				<Input
					id="identity"
					placeholder="Email or username"
					type="text"
					autocapitalize="none"
					autocorrect="off"
					disabled={isLoading}
					bind:value={identity}
				/>

				<Input
					id="password"
					placeholder="Password"
					type="password"
					autocapitalize="none"
					autocorrect="off"
					disabled={isLoading}
					bind:value={password}
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
