import type { Item, ShopItem } from "$lib/types";

class Shop {
	items = $state<ShopItem>();
	discount = $state(0);
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
}

export default Shop;