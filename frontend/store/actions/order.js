import axios from "axios";
import { setRequestHeaders } from "./auth";

export const actionTypes_cart = {
	CREATE_ORDER: "CREATE_ORDER",
};

export const createOrder = async (checkoutData) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/orders`,
			checkoutData,
			setRequestHeaders(),
		);
		const order = response.data;
		// console.log("createOrder response:", order); // ? debug

		return order;
	} catch (error) {
		console.log(error);
	}
};
