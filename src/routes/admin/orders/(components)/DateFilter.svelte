<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';

	const df = new DateFormatter('id-ID', {
		dateStyle: 'long'
	});
	const transactionDateParams = $page.url.searchParams.get('transactionDate') || '';
	const [year, month, day] = transactionDateParams.split('-');
	const transactionCalenderDate = new CalendarDate(Number(year), Number(month), Number(day));

	let selectedDate = $state<DateValue | undefined>(
		transactionDateParams ? transactionCalenderDate : undefined
	);
	let contentRef = $state<HTMLElement | null>(null);
	let {
		onSelectedDate,
		isOpenFilter,
		onShowAll
	}: { onSelectedDate: (selectedDate: DateValue) => void; onShowAll: () => void; isOpenFilter: boolean } = $props();

	$inspect(selectedDate);

	$effect(() => {
		if (!isOpenFilter && selectedDate) {
			onSelectedDate(selectedDate);
		}
		if (!isOpenFilter && !selectedDate) {
			onShowAll();
		}
	});
</script>

<Popover.Root bind:open={isOpenFilter}>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: 'w-[280px] justify-start text-left font-normal'
			}),
			!selectedDate && 'text-muted-foreground'
		)}
	>
		<CalendarIcon />
		{selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : 'Showing All Orders'}
	</Popover.Trigger>
	<Popover.Content bind:ref={contentRef} class="flex w-auto flex-col items-center p-0">
		<Calendar type="single" bind:value={selectedDate} />
		<Button
			class="w-full"
			onclick={() => {
				isOpenFilter = false;
			}}>{selectedDate ? 'Filter': 'Show All'}</Button
		>
	</Popover.Content>
</Popover.Root>
