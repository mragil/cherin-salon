import type { Item, ShopItem } from "$lib/types";

class Shop {
	name;
	cashier;
	items = $state<ShopItem>({});
	discount = $state(0);
	itemsArr = $derived(Object.values(this.items!));
	paymentDisplay = $state('');
	payment = $derived(Number(this.paymentDisplay.substring(3).replaceAll('.', '')));
	total = $derived(this.itemsArr.reduce((total, item) => (total = total + item.price * item.quantity), 0));
	totalAfterDisc = $derived(this.total - this.total * (this.discount / 100));

	constructor(name: string = 'Shop', cashier: string = 'Kasir') {
		this.items = {};
		this.discount = 0;
		this.name = name;
		this.cashier = cashier;
	}

	getMappedData() {
		return {
			items: this.itemsArr,
			total: this.total,
			totalAfterDiscount: this.totalAfterDisc,
			payment: this.payment,
			discount: this.discount,
			name: this.name,
			cashier: this.cashier,
		}
	}

	addToCart(item: Item) {
		if(this.items![item.id]) {
			this.items![item.id] = {...item, quantity: this.items![item.id].quantity + 1};
		} else {
			this.items![item.id] = {...item, quantity: 1};
		}
	}

	increaseQty(id: string) {
		this.items![id].quantity = this.items![id].quantity + 1;
	}

	decreaseQty(id: string) {
		if(this.items![id].quantity === 1) {
			delete this.items![id];
		} else {
			this.items![id].quantity = this.items![id].quantity - 1;
		}
	}

	setDiscount(discount: number) {
		this.discount = discount;
	}

	reset() {
		this.items = {};
		this.discount = 0;
		this.paymentDisplay = '';
	}
}

export default Shop;