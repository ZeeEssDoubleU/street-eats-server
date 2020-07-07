import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
// import components
import CartCard from "./CartCard";
// import store
import useStore from "../store/useStore";

// ******************
// component
// ******************

const Cart = (props) => {
	const { state } = useStore();
	const router = useRouter();

	// TODO: create display (toggle button) to display single restaurant only
	// TODO: also consider making checkcart list different from shopping cart list
	const cartList = () => {
		if (state.cart?.length === 0) {
			// if cart length equals 0, display empty
			return <CartCard isEmpty />;
		} else if (props.cart === "shopping") {
			// else, if shopping cart
			// display all of cart, but filter checkout button
			return state.cart?.map((restaurant) =>
				restaurant.slug === router.query.vendor ? (
					<CartCard
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
						disabled
					/>
				) : (
					<CartCard
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
					/>
				),
			);
		} else if (props.cart === "checkout") {
			// else, if checkout cart, filter cart
			const cart_filtered = state.cart?.filter((restaurant) =>
				router.route === "/checkout/[vendor]"
					? restaurant.slug === router.query.vendor
					: restaurant,
			);
			// console.log("cart_filtered:", cart_filtered); // ? debug

			// display cart
			return cart_filtered?.length > 0 ? (
				// if cart_filtered isn't empty, map cart
				cart_filtered.map((restaurant) => (
					<CartCard
						key={restaurant.id}
						restaurant={restaurant}
						cart={props.cart}
					/>
				))
			) : (
				// else, display empty cart
				<CartCard isEmpty />
			);
		}
	};

	return <>{cartList()}</>;
};

Cart.propTypes = {};
export default Cart;

// ******************
// styles
// ******************
