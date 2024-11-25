import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatRupiah = (price: number) => new Intl.NumberFormat('id-ID', { 
	style: 'currency',
	currency: 'IDR',
	maximumFractionDigits: 0,
 }).format(price);

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 export const format = (node: any, formatFunction: any) => {
		function updateValue() {
			node.value = formatFunction(node.value)
		}
		
		node.addEventListener('input', updateValue)
		node.addEventListener('paste', updateValue)
	
		node.value = formatFunction(node.value)
		
		return {
			destroy() {
					node.removeEventListener('input', updateValue)
					node.removeEventListener('paste', updateValue)
			}
		}
		
	}

export	const currency = (value: string) => {
	const onlyNumbers = value.replace(/[^\d]/g, '')

	return formatRupiah(Number(onlyNumbers));
}