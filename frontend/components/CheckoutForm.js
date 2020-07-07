import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Router from "next/router";
import Cookies from "js-cookie";
// import components
import {
	Container,
	CardHeader,
	CardContent,
	Grid,
	TextField,
} from "@material-ui/core";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import Card_withElevate from "./Card_withElevate";
import CardActionButton from "./CardActionButton";
import CartList from "./CartList";
// import store / actions / etc
import useStore from "../store/useStore";
import { paymentIntent_create } from "../store/actions/payment_intent";
import {
	cart_filterByRestaurantCheckout,
	cart_removeRestaurant,
} from "../store/actions/cart";
import { createOrder } from "../store/actions/order";

// ******************
// component
// ******************

const CheckoutForm = ({ paymentIntent }) => {
	const stripe = useStripe();
	const elements = useElements();
	const { state, dispatch } = useStore();
	const [paymentStatus, setPaymentStatus] = useState();
	const [paymentInfo, setPaymentInfo] = useState({
		email: state.user_current.email || "",
		name: "",
		address: "",
		city: "",
		state: "",
		postal_code: "",
	});

	useEffect(() => {
		if (!stripe || !elements) {
			setPaymentStatus("loading");
		} else {
			setPaymentStatus("");
		}
	}, [!stripe, !elements]);

	const handleChange = (target) => (event) => {
		const updateInfo = {
			...paymentInfo,
			[target]: event.target.value,
		};
		setPaymentInfo(updateInfo);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// if stripe or elments have NOT loaded, disable submission
		if (!stripe || !elements) return;

		try {
			setPaymentStatus("processing");
			const response = await stripe.confirmCardPayment(
				paymentIntent.client_secret,
				{
					payment_method: {
						card: elements.getElement(CardNumberElement),
						billing_details: {
							email: paymentInfo.email,
							name: paymentInfo.name,
							address: {
								city: paymentInfo.city,
								line1: paymentInfo.address,
								postal_code: paymentInfo.postal_code,
								state: paymentInfo.state,
							},
						},
					},
				},
			);
			console.log("Payment is processing...");

			if (response.error) {
				// show error to your customer (e.g., insufficient funds)
				console.error(response.error.message);
				setPaymentStatus("error");
			} else {
				// The payment has been processed!
				if (response.paymentIntent.status === "succeeded") {
					// Show a success message to your customer
					setPaymentStatus("success");
					console.log("Payment success!");
					// console.log("payment response:", response); // ? debug

					// add completed order to database
					const cart = await cart_filterByRestaurantCheckout(state.cart);
					// console.log("cart_filtered:", cart); // ? debug

					const transaction_id = await response.paymentIntent.id;
					// console.log("transaction_id:", transaction_id); // ? debug

					const order_complete = await createOrder({
						user: state.user_current,
						paymentInfo,
						transaction_id,
						cart,
					});

					// destroy paymentIntent cookie to prevent future use (already succeeded)
					Cookies.remove("paymentIntent_id");
					// remove restaurant from cart as well
					const restaurantId = cart.id;
					cart_removeRestaurant(restaurantId, state, dispatch);

					// TODO: create order confirmation page
					// // push user to order confirmation page
					// Router.push({
					// 	pathname: "/checkout/confirmation",
					// 	query: { order },
					// });
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const orderButtonText = (paymentStatus) => {
		switch (paymentStatus) {
			case "loading":
				return "Wait...";
			case "processing":
				return "Processing...";
			case "success":
				return "Payment Success!";
			case "error":
				return "Try Again";
			default:
				return "Order Now";
		}
	};

	return (
		<Container maxWidth="sm">
			<Card_withElevate>
				<CardHeader title="Billing Information:" />
				<CardContent>
					<form
						autoComplete="off"
						id="form-billing"
						onSubmit={handleSubmit}
					>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									type="email"
									label="Email"
									variant="filled"
									fullWidth
									value={paymentInfo.email}
									onChange={handleChange("email")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									label="Full Name"
									variant="filled"
									fullWidth
									value={paymentInfo.name}
									onChange={handleChange("name")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									label="Address"
									variant="filled"
									fullWidth
									value={paymentInfo.address}
									onChange={handleChange("address")}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									required
									label="City"
									variant="filled"
									fullWidth
									value={paymentInfo.city}
									onChange={handleChange("city")}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									label="State"
									variant="filled"
									fullWidth
									value={paymentInfo.state}
									onChange={handleChange("state")}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									label="Zip Code"
									variant="filled"
									fullWidth
									value={paymentInfo.postal_code}
									onChange={handleChange("postal_code")}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardNumberElement },
									}}
									InputLabelProps={{ shrink: true }}
									label="Card Number"
									variant="filled"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardCvcElement },
									}}
									InputLabelProps={{ shrink: true }}
									label=" "
									variant="filled"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardExpiryElement },
									}}
									InputLabelProps={{ shrink: true }}
									label="Expiry"
									variant="filled"
									fullWidth
								/>
							</Grid>
						</Grid>
					</form>
				</CardContent>
				<CardHeader title="Shopping Cart:" />
				<CardContent>
					<CartList />
				</CardContent>
				<StyledCardActions>
					<CardActionButton
						color="secondary"
						variant="contained"
						type="submit"
						form="form-billing"
						disabled={
							paymentStatus === "loading" ||
							paymentStatus === "processing"
								? true
								: false
						}
					>
						{orderButtonText(paymentStatus)}
					</CardActionButton>
					<CardActionButton onClick={() => Router.back()}>
						Cancel
					</CardActionButton>
				</StyledCardActions>
			</Card_withElevate>
		</Container>
	);
};
export default CheckoutForm;

// ******************
// styles
// ******************

import { StyledCardActions } from "../styles/elements";
