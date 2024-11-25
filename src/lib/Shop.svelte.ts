import type { Item, ShopItem } from "$lib/types";

class Shop {
	items = $state<ShopItem>();
	discount = $state(0);
	itemsArr = $derived(Object.values(this.items!));
	paymentDisplay = $state('');
	payment = $derived(Number(this.paymentDisplay.substring(3).replaceAll('.', '')));

	constructor() {
		this.items = {};
		this.discount = 0;
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

	getTotal() {
		const total = this.itemsArr.reduce((total, item) => (total = total + item.price * item.quantity), 0);
		const totalAfterDisc = total - total * (this.discount / 100);
		return {
			total,
			totalAfterDisc
		}
	}
}

export default Shop;