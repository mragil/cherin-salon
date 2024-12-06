<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let { children } = $props();

	$effect(() => {
		const roles = pb.authStore.model?.roles;

		if (pb.authStore.isValid) {
			if (roles === 'admin') {
				goto(`/admin`);

				return;
			}
			goto('/cashier');
		}
	});
</script>

{@render children()}
