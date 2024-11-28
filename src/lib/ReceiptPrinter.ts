// @ts-expect-error package don't have type
import PrintHub from 'printhub';
import type { SelectedItem } from './types';

type PrintOptions = {
  align?: string,
  bold?: boolean,
  size?: string
}

type Text = string | number;

type Printer = {
  writeText: (text: Text, opts?: PrintOptions) => void,
  writeTextWith2Column: (text: Text, text2: Text) => void,
  writeLineBreak: (num?: number) => void,
  writeDashLine: () => void
}

type Data = {
  items: SelectedItem[],
  total: number,
  totalAfterDiscount: number,
  payment: number,
  discount: number
}

class ReceiptPrinter {
  printer

  constructor() {
    this.printer = new PrintHub({
      printerType: 'bluetooth'
    });
  }

  printData(shopData: Data) {
    try {
      this.printer.connectToPrint({
        onReady: async (print: Printer) => {
          // Print Header
          await print.writeText(' Cookies Adudu', {
            align: 'center',
            bold: true,
            size: 'double'
          });
          await print.writeText(
            'Jl.Bunga Mayang, Kec.Enggal, Kota Bandar Lampung, Lampung 35213',
            {
              align: 'center'
            }
          );
          await print.writeText(' 0812-3456-7890 - IG: @dduww', { align: 'center' });
          await print.writeLineBreak();
          await print.writeText('No.Transaksi: ', {
            align: 'center'
          });
          await print.writeText('Kasir: Dwi Cantik Sekali', { align: 'center' });
          await print.writeText('2024-11-24 17:20:18', { align: 'center' });
          await print.writeDashLine();

          for (let index = 0; index < shopData.items.length; index++) {
            const item = shopData.items[index];
            await print.writeText(item.name, { align: 'left' });
            await print.writeTextWith2Column(`${item.quantity} pcs x ${item.price}`, `Rp${(item.quantity * item.price).toLocaleString('id-ID')}`);
            await print.writeDashLine();
          }

          // Print Total
          await print.writeTextWith2Column('Total :', (shopData.total).toLocaleString('id-ID'));
          await print.writeTextWith2Column('Diskon :', `${shopData.discount}%`);
          await print.writeTextWith2Column('Bayar :', (shopData.payment).toLocaleString('id-ID'));
          await print.writeTextWith2Column('Kembali :', (shopData.payment - shopData.totalAfterDiscount).toLocaleString('id-ID'));

          // Print Footer
          await print.writeLineBreak();
          await print.writeText('Terimakasih', {
            align: 'center'
          });
          await print.writeLineBreak(2);
				  await print.writeDashLine();

        },
        onFailed: (message: string) => {
          console.log('onFailed: ', message);
          alert('Print gagal harap ulangi!');
        }
      });
    } catch (error) {
      alert('Failed to print');
      console.log('err: ', error);
    }
  }
}

export default ReceiptPrinter;