import axios from "axios";
import { setRequestHeaders } from "./auth";

export const actionTypes_paymentIntent = {
	CREATE_PAYMENT_INTENT: "CREATE_PAYMENT_INTENT",
	GET_PAYMENT_INTENT: "GET_PAYMENT_INTENT",
	UPDATE_PAYMENT_INTENT: "UPDATE_PAYMENT_INTENT",
};

export const paymentIntent_create = async (items, dispatch) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/payment_intent/create`,
			items,
			setRequestHeaders(),
		);
		const paymentIntent = response.data;
		const { client_secret } = paymentIntent;

		dispatch({
			type: actionTypes_paymentIntent.CREATE_PAYMENT_INTENT,
			payload: null,
		});

		// TODO: consider only returning client secret and id
		// return payment intent client_secret
		return paymentIntent;
	} catch (error) {
		console.error(error);
	}
};
export const paymentIntent_retrieve = async (
	paymentIntent_id,
	items,
	dispatch,
) => {
	// console.log("retrieve paymentIntent_id:", paymentIntent_id); // ? debug

	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/payment_intent/retrieve`,
			{ paymentIntent_id, items },
			setRequestHeaders(),
		);
		const paymentIntent = response.data;
		const { client_secret } = paymentIntent;

		dispatch({
			type: actionTypes_paymentIntent.GET_PAYMENT_INTENT,
			payload: null,
		});

		// TODO: consider only returning client secret
		// return payment intent client_secret
		return paymentIntent;
	} catch (error) {
		console.error(error);
	}
};