
export type Item  = {
	id: string,
	name: string,
	price: number,
	category: string,
	updated: string
}

export interface SelectedItem extends Item {
	quantity: number,
}

export interface Category {
	label: string,
	value: string
}

export interface CategoryListProps {
	categories: Category[]
}

export interface DiscountListProps {
	discounts: number[],
	onSelected: (selected: number) => void
}

export interface ItemListProps {
	items: Item[],
	onPress: (item: Item) => void
}

export type ShopItem = {
    [key: string]: SelectedItem
}

export interface CartProps {
	items: ShopItem,
	increaseQty: (id: string) => void,
	decreaseQty: (id: string) => void
}
