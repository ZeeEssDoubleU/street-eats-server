import React from "react"
import { useRouter } from "next/router"
// import components
import Card_Cart from "../Card/Card_Cart"
// import store
import useStore from "../../store/useStore"

// ***********
// component
// ***********

export default function CartList(props) {
	const { state } = useStore()
	const router = useRouter()

	// TODO: create display (toggle button) to display single restaurant only
	// TODO: also consider making checkcart list different from shopping cart list
	const cartList = () => {
		if (state.cart?.length === 0) {
			// if cart length equals 0, display empty
			return <Card_Cart isEmpty />
		} else if (props.cart === "shopping") {
			// else, if shopping cart
			// display all of cart, but filter checkout button
			return state.cart?.map((restaurant) =>
				restaurant.slug === router.query.vendor ? (
					<Card_Cart
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
						disabled
					/>
				) : (
					<Card_Cart
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
					/>
				),
			)
		} else if (props.cart === "checkout") {
			// else, if checkout cart, filter cart
			const cart_filtered = state.cart?.filter((restaurant) =>
				router.route === "/checkout/[vendor]"
					? restaurant.slug === router.query.vendor
					: restaurant,
			)
			// console.log("cart_filtered:", cart_filtered); // ? debug

			// display cart
			return cart_filtered?.length > 0 ? (
				// if cart_filtered isn't empty, map cart
				cart_filtered.map((restaurant) => (
					<Card_Cart
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
					/>
				))
			) : (
				// else, display empty cart
				<Card_Cart isEmpty />
			)
		}
	}

	return <>{cartList()}</>
}
