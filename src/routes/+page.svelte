<script>
	import { browser } from '$app/environment';
	import PrintHub from 'printhub';

	function handleConnectButtonClick() {
		let printer = new PrintHub({
			printerType: 'bluetooth'
		});
		printer.connectToPrint({
			onReady: async (print) => {
				// Print Header
				await print.writeText('Cherin Salon', {
					align: 'center',
					bold: true,
					size: 'double'
				});
				await print.writeText(
					'Jl. Bunga Mayang, Enggal, Kec. Enggal, Kota Bandar Lampung, Lampung 35213',
					{
						align: 'center'
					}
				);
				await print.writeText('0812-3456-7890', { align: 'center' });
				await print.writeLineBreak();
				await print.writeText('No.Transaksi: CHER-SLN-0001', {
					align: 'center'
				});
				await print.writeText('Kasir: Dwi Yulianni Cantik Sekali', { align: 'center' });
				await print.writeText('2024-11-24 17:20:18', { align: 'center' });

				// Print Items
				await print.writeDashLine();
				await print.writeText('Potong rambut', { align: 'left' });
				await print.writeTextWith2Column('1 pcs x 60.000', '60.000');
				await print.writeDashLine();

				// Print Total
				await print.writeTextWith2Column('Total :', '60.000');
				await print.writeTextWith2Column('Bayar :', '100.000');
				await print.writeTextWith2Column('Kembali :', '40.000');
				await print.writeTextWith2Column('Metode :', 'Tunai');

				// Print Footer
				await print.writeLineBreak();
				await print.writeText('Follow IG: @cherin.salon', {
					align: 'center'
				});
				await print.writeLineBreak(3);
			},
			onFailed: (message) => {
				console.log(message);
			}
		});
	}
</script>

<button class="border-blue-100 p-5" onclick={handleConnectButtonClick}>connect printer</button>

<a href="/pos">POS</a>
