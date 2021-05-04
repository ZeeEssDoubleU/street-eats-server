import { useState } from "react"
import { useRouter } from "next/router"
// import components
import { useCheckout } from "../../../hooks"
import { CardHeader, CardContent } from "@material-ui/core"
import { Card_Elevate, CardActionButton } from "../../Card"
import CartList from "../../Cart/CartList"
import CheckoutForm from "./CheckoutForm"
// import store / actions / etc
import useStore from "../../../store/useStore"
// styles
import { StyledCardActions } from "../../../styles/elements"

// ***********
// component
// ***********

export default function CheckoutBlock({ paymentIntent }) {
	const router = useRouter()
	const { state } = useStore()
	const [paymentStatus, setPaymentStatus] = useState()
	const [paymentInfo, setPaymentInfo] = useState({
		email: state?.user_current?.email || "",
		name: "",
		address: "",
		city: "",
		state: "",
		postal_code: "",
	})

	const { handleChange, handleSubmit } = useCheckout({
		paymentIntent,
		paymentInfo,
		setPaymentInfo,
		setPaymentStatus,
	})

	const orderButtonText = (paymentStatus) => {
		switch (paymentStatus) {
			case "loading":
				return "Wait..."
			case "processing":
				return "Processing..."
			case "success":
				return "Payment Success!"
			case "error":
				return "Try Again"
			default:
				return "Order Now"
		}
	}

	return (
		<Card_Elevate>
			<CardHeader title="Billing Information:" />
			<CardContent>
				<CheckoutForm {...{ handleChange, handleSubmit, paymentInfo }} />
			</CardContent>
			<CardHeader title="Checkout Cart:" />
			<CardContent>
				<CartList cart="checkout" />
			</CardContent>
			<StyledCardActions>
				<CardActionButton
					color="secondary"
					variant="contained"
					type="submit"
					form="form-billing"
					disabled={
						paymentStatus === "loading" || paymentStatus === "processing"
							? true
							: false
					}
				>
					{orderButtonText(paymentStatus)}
				</CardActionButton>
				<CardActionButton onClick={() => router.back()}>
					Cancel
				</CardActionButton>
			</StyledCardActions>
		</Card_Elevate>
	)
}
