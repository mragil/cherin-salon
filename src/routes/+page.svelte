<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let cashier = $state('');
	let buttonDisabled = $derived(!cashier);
	$inspect(buttonDisabled);

	const navigateToCashier = () => {
		goto(`/pos?cashier=${cashier}`);
	};
</script>

<div class="mx-auto p-6 text-center">
	<Input class="mb-10" bind:value={cashier} />
	<Button disabled={buttonDisabled} onclick={navigateToCashier}>Enter as Cashier</Button>
</div>
