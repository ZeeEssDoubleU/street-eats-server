import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { loadStripe } from "@stripe/stripe-js"
// import components
import CheckoutBlock from "./CheckoutBlock"
import { Elements as StripeElementsProvider } from "@stripe/react-stripe-js"
// import store / actions / utils
import useStore from "../../../store/useStore"
import {
	paymentIntent_create,
	paymentIntent_retrieve,
} from "../../../store/actions/paymentIntent"
import { cart_filterByRestaurantCheckout } from "../../../store/actions/cart"
import { cookies } from "../../../utils"

// ***********
// component
// ***********

// ! make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_P_KEY)

export default function Checkout() {
	const { state, dispatch } = useStore()
	const router = useRouter()
	// retrieve paymentIntent as soon as checkout opened to track sales funnel
	const [paymentIntent, setPaymentIntent] = useState()

	const getPaymentIntent = async () => {
		const restaurant = await cart_filterByRestaurantCheckout(state.cart)
		const items = restaurant?.items

		// check if payment intent already exists
		const paymentIntent_id = await cookies.get("paymentIntent_id")

		// *** payment intent block
		// if intent exists, GET payment intent
		if (paymentIntent_id) {
			const paymentIntent_res = await paymentIntent_retrieve(
				paymentIntent_id,
				items,
				dispatch,
			)
			setPaymentIntent(paymentIntent_res)
		}
		// it no intent, CREATE payment intent
		else {
			const paymentIntent_res = await paymentIntent_create(items, dispatch)
			setPaymentIntent(paymentIntent_res)

			// set payment intent id to cookie for future retrieval
			if (paymentIntent_res) {
				cookies.set("paymentIntent_id", paymentIntent_res.id)
			}
		}
	}

	// get stripe paymentIntent on route change
	useEffect(() => {
		if (router.route === "/checkout/[vendor]" && state.cart.length > 0) {
			getPaymentIntent()
		}
	}, [router.route, state.cart])

	return (
		<StripeElementsProvider stripe={stripePromise}>
			<CheckoutBlock paymentIntent={paymentIntent} />
		</StripeElementsProvider>
	)
}
