import axios from "axios"
import { setRequestHeaders } from "./auth"

export const actionTypes_paymentIntent = {
	CREATE_PAYMENT_INTENT: "CREATE_PAYMENT_INTENT",
	GET_PAYMENT_INTENT: "GET_PAYMENT_INTENT",
	UPDATE_PAYMENT_INTENT: "UPDATE_PAYMENT_INTENT",
}

// ***********
// action
// ***********

export const paymentIntent_create = async (items, dispatch) => {
	try {
		const api_url = `${process.env.NEXT_PUBLIC_API_URL}/payment-intent/create`
		const response = await axios.post(api_url, items, setRequestHeaders())
		const paymentIntent = response.data
		// const { client_secret } = paymentIntent

		dispatch({
			type: actionTypes_paymentIntent.CREATE_PAYMENT_INTENT,
			payload: null,
		})

		// TODO: consider only returning client secret and id
		// return payment intent client_secret
		return paymentIntent
	} catch (error) {
		console.error(error)
	}
}

// ***********
// action
// ***********

export const paymentIntent_retrieve = async (
	paymentIntent_id,
	items,
	dispatch,
) => {
	// console.log("retrieve paymentIntent_id:", paymentIntent_id); // ? debug

	try {
		const api_url = `${process.env.NEXT_PUBLIC_API_URL}/payment-intent/retrieve`
		const response = await axios.post(
			api_url,
			{ paymentIntent_id, items },
			setRequestHeaders(),
		)
		const paymentIntent = response.data
		// const { client_secret } = paymentIntent

		dispatch({
			type: actionTypes_paymentIntent.GET_PAYMENT_INTENT,
			payload: null,
		})

		// TODO: consider only returning client secret
		// return payment intent client_secret
		return paymentIntent
	} catch (error) {
		console.error(error)
	}
}
