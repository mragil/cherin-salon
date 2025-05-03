<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let cashier = $state('');
	let buttonDisabled = $derived(!cashier);

	const navigateToCashier = (e: SubmitEvent) => {
		e.preventDefault();
		goto(`/pos?cashier=${cashier}&category=all`);
	};
</script>

<form
	class="flex h-screen flex-col items-center justify-center p-6 text-center"
	onsubmit={navigateToCashier}
>
	<Input class="mb-10" bind:value={cashier} />
	<Button disabled={buttonDisabled} type={'submit'}>Enter as Cashier</Button>
</form>
