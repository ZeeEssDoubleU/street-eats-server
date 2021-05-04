import axios from "axios"
import { setRequestHeaders } from "./auth"

export const actionTypes_cart = {
	CREATE_ORDER: "CREATE_ORDER",
}

// ***********
// action
// ***********

export async function createOrder(checkoutData) {
	try {
		const api_url = `${process.env.NEXT_PUBLIC_API_URL}/orders`
		const response = await axios.post(
			api_url,
			checkoutData,
			setRequestHeaders(),
		)
		const order = response.data
		// console.log("createOrder response:", order); // ? debug

		return order
	} catch (error) {
		console.error(error)
	}
}

// ***********
// action
// ***********

export async function getOrder(id) {
	try {
		const api_url = `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
		const response = await axios.get(api_url, setRequestHeaders())

		const order = response.data
		// console.log("getOrder response:", order) // ? debug

		return order
	} catch (error) {
		console.error(error)
	}
}
