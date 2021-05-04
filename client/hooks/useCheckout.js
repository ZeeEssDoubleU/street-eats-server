import { useEffect } from "react"
import { useRouter } from "next/router"
import {
	useStripe,
	useElements,
	CardNumberElement,
} from "@stripe/react-stripe-js"
// import store / actions / etc
import useStore from "../store/useStore"
import { cart_filterByRestaurantCheckout } from "../store/actions/cart"
import { createOrder } from "../store/actions/order"
import { creds_areValid } from "../store/actions/auth"
import { cookies } from "../utils"

// ***********
// hook
// ***********

export default function useCheckout({
	paymentIntent,
	paymentInfo,
	setPaymentInfo,
	setPaymentStatus,
}) {
	const { state } = useStore()
	const stripe = useStripe()
	const elements = useElements()
	const router = useRouter()

	useEffect(() => {
		if (!stripe || !elements) {
			setPaymentStatus("loading")
		} else {
			setPaymentStatus("")
		}
	}, [!stripe, !elements])

	const handleChange = (target) => (event) => {
		const updateInfo = {
			...paymentInfo,
			[target]: event.target.value,
		}
		setPaymentInfo(updateInfo)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		// if stripe or elments have NOT loaded, disable submission
		if (!stripe || !elements) {
			return
		}

		// TODO: need to create refresh capability for JWT
		// if credentials invalid, push router to login
		if (creds_areValid() === false) router.push("/login")

		try {
			setPaymentStatus("processing")
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
			)
			console.log("Payment is processing...")

			if (response.error) {
				// show error to your customer (e.g., insufficient funds)
				console.error(response.error.message)
				setPaymentStatus("error")
			} else {
				// payment success
				if (response.paymentIntent.status === "succeeded") {
					setPaymentStatus("success")
					console.log("Payment success!")
					// console.log("payment response:", response); // ? debug

					// add completed order to database
					const cart = await cart_filterByRestaurantCheckout(state.cart)
					// console.log("cart_filtered:", cart); // ? debug

					const transaction_id = await response.paymentIntent.id
					// console.log("transaction_id:", transaction_id); // ? debug

					const order = await createOrder({
						user: state.user_current,
						paymentInfo,
						transaction_id,
						cart,
					})

					// destroy paymentIntent cookie to prevent future use (already succeeded)
					cookies.remove("paymentIntent_id")

					// TODO: create order confirmation page
					// push user to order confirmation page
					router.replace({
						pathname: `/checkout/success`,
						query: { order: order.id },
					})
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	return {
		handleChange,
		handleSubmit,
	}
}
