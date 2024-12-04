import type { Item, ShopItem } from "$lib/types";

class Shop {
	name;
	cashier;
	items = $state<ShopItem>({});
	itemsArr = $derived(Object.values(this.items!));
	paymentDisplay = $state('');
	payment = $derived(Number(this.paymentDisplay.substring(3).replaceAll('.', '')));
	total = $derived(this.itemsArr.reduce((total, item) => (total = total + item.totalPrice), 0));

	constructor(name: string = 'Shop', cashier: string = 'Kasir') {
		this.items = {};
		this.name = name;
		this.cashier = cashier;
	}

	getMappedData() {
		return {
			items: this.itemsArr,
			total: this.total,
			payment: this.payment,
			name: this.name,
			cashier: this.cashier,
		}
	}

	addToCart(item: Item) {
		if(this.items![item.id]) {
			// Item already in cart
			// Do nothing
		} else {
			this.items![item.id] = {...item, quantity: 1, discount: 0, totalPrice: item.price};
		}
	}

	increaseQty(id: string) {
		const item = this.items[id];
		item.quantity = item.quantity + 1;
		item.totalPrice = (item.price - (item.price * (item.discount / 100))) * item.quantity;
	}

	decreaseQty(id: string) {
		const item = this.items[id];

		if(item.quantity === 1) {
			delete this.items[id];
		} else {
			item.quantity = item.quantity - 1;
			item.totalPrice = (item.price - (item.price * (item.discount / 100))) * item.quantity;
		}
	}

	setItemDiscount(id: string, discount: number) {
		const item = this.items[id];
		item.discount = discount;
		item.totalPrice = (item.price - (item.price * (discount / 100))) * item.quantity;
	}

	reset() {
		this.items = {};
		this.paymentDisplay = '';
	}
}

export default Shop;