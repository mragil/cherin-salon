import type Shop from "$lib/Shop.svelte"

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
	selected: number,
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
	shop: Shop,
	onSubmit: () => void
}

export type ReceiptData = {
  id: string,
  transactionDate: string,
  items: SelectedItem[],
  total: number,
  totalAfterDiscount: number,
  payment: number,
  discount: number,
	name: string,
  cashier: string,
}

export interface ReceiptProps {
	receipt: ReceiptData
}
