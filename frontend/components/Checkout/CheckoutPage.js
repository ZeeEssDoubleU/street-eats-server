import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
// import components
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { Elements as StripeElementsProvider } from "@stripe/react-stripe-js";
// import store / actions / utils
import useStore from "../../store/useStore";
import {
	paymentIntent_create,
	paymentIntent_retrieve,
} from "../../store/actions/payment_intent.js";
import { cart_filterByRestaurantCheckout } from "../../store/actions/cart";
import { creds_areValid } from "../../store/actions/auth";
import cookies from "../../utils/cookies";
import useLayoutEffect from "../../utils/useIsomorphicLayoutEffect";

// ******************
// component
// ******************

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_P_KEY);

const CheckoutPage = (props) => {
	const { state, dispatch } = useStore();
	const router = useRouter();
	// retrieve paymentIntent as soon as checkout opened to track sales funnel
	const [paymentIntent, setPaymentIntent] = useState();

	const getPaymentIntent = async () => {
		const restaurant = await cart_filterByRestaurantCheckout(state.cart);
		const items = restaurant?.items;

		// check if payment intent already exists
		const paymentIntent_id = await cookies.get("paymentIntent_id");

		let paymentIntent;
		// if intent exists, GET payment intent
		if (paymentIntent_id) {
			paymentIntent = await paymentIntent_retrieve(
				paymentIntent_id,
				items,
				dispatch,
			);
		}
		// it no intent, CREATE payment intent
		else {
			paymentIntent = await paymentIntent_create(items, dispatch);

			// set payment intent id to cookie for future retrieval
			if (paymentIntent) {
				cookies.set("paymentIntent_id", paymentIntent.id);
			}
		}

		setPaymentIntent(paymentIntent);
	};

	useEffect(() => {
		if (router.route === "/checkout/[vendor]" && state.cart.length > 0) {
			getPaymentIntent();
		}
	}, [router.route, state.cart]);

	return (
		<StripeElementsProvider stripe={stripePromise}>
			<CheckoutForm paymentIntent={paymentIntent} />
		</StripeElementsProvider>
	);
};
CheckoutPage.propTypes = {};
export default CheckoutPage;
