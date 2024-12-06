<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let { children } = $props();

	$effect(() => {
		const roles = pb.authStore.model?.roles;

		if (!pb.authStore.isValid && roles !== 'admin') {
			goto(`/login`);
		}
	});
</script>

{@render children()}
