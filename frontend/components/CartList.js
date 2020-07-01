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

	// TODO: NEED TO CREATE DISPLAY FOR PAGE (SINGLE RESTAURANT) ONLY
	const cartList =
		state.cart?.length === 0 ? (
			// if cart length equals 0, display empty
			<CartCard isEmpty />
		) : (
			// else, display cart list
			state.cart
				?.filter((restaurant) =>
					router.route === "/checkout/[vendor]"
						? restaurant.slug === router.query.vendor
						: restaurant,
				)
				.map((restaurant) => (
					<CartCard key={restaurant.id} restaurant={restaurant} />
				))
		);

	return <>{cartList}</>;
};

Cart.propTypes = {};
export default Cart;

// ******************
// styles
// ******************
