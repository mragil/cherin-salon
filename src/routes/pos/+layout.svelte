<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';

	let { children } = $props();

	let cashier = $page.url.searchParams.get('cashier')!;

	const logout = () => {
		alert('Are you sure?');
		pb.authStore.clear();
		goto('/login');
	};

	$effect(() => {
		if (!pb.authStore.isValid) {
			goto(`/login`);
		}

		if (!cashier || cashier === '') {
			goto('/cashier');
		}
	});
</script>

<div class="p-1">
	{@render children()}
</div>

<Button class="mt-24" onclick={logout}>Logout</Button>
