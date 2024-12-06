<script lang="ts">
	import type { ReceiptProps } from '$lib/types';

	let { receipt }: ReceiptProps = $props();
</script>

<div class="mx-auto h-full w-[80mm] rounded bg-white p-2 shadow-md">
	<!-- Print Header -->
	<div class="text-center">
		<h1 class="text-xl font-bold">{receipt.name}</h1>
		<p>Jl.Bunga Mayang, Kec.Enggal, Kota Bandar Lampung, Lampung 35213</p>
		<p>0812-7151-9228 - IG: @saloncherin.id</p>
	</div>
	<div class="mt-2 text-center">
		<p>ID-Transaksi: {receipt.id}</p>
		<p>Kasir: {receipt.cashier}</p>
		<p>{new Date(receipt.transactionDate).toLocaleString('id-ID')}</p>
	</div>
	<hr class="my-2 border-t-2 border-dashed" />
	<!-- Print Items -->
	<div>
		{#each receipt.items as item}
			<div class="flex justify-between">
				<div class="flex flex-col">
					<span>{item.name}</span>
					<span>{item.quantity} pcs x {item.price}</span>
				</div>
				<div>
					<span>Rp {(item.quantity * item.price).toLocaleString('id-ID')}</span>
				</div>
			</div>
			<div class="flex justify-between">
				<span>Diskon :</span>
				<span>{item.discount}%</span>
			</div>
			<div class="flex justify-between">
				<span>Total Harga :</span>
				<span>Rp {item.totalPrice.toLocaleString('id-ID')}</span>
			</div>
			<hr class="my-2 border-t-2 border-dashed" />
		{/each}
	</div>
	<!-- Print Total -->
	<div class="flex justify-between">
		<span>Total :</span>
		<span>Rp {receipt.total.toLocaleString('id-ID')}</span>
	</div>
	<div class="flex justify-between">
		<span>Bayar :</span>
		<span>Rp {receipt.payment.toLocaleString('id-ID')}</span>
	</div>
	<div class="flex justify-between">
		<span>Kembali :</span>
		<span>Rp {(receipt.payment - receipt.total).toLocaleString('id-ID')}</span>
	</div>
	<!-- Print Footer -->
	<div class="my-2 text-center">
		<p>Terimakasih</p>
	</div>
</div>
