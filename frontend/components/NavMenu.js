import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
// import components
import { Avatar, Typography, Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import Cart from "./Cart";
import NavButton from "./NavButton";
// import store / utils
import useStore from "../store/useStore";
import { useTheme } from "@material-ui/core/styles";
import { toggleCart, getCartCount } from "../store/actions/cart";
import { removeCredsFromCookies } from "../store/actions/auth";

// ******************
// component
// ******************
const NavMenu = (props) => {
	const { state, dispatch } = useStore();
	const [cartCount, setCartCount] = useState(getCartCount(state));
	const currentUser = state.user_current;
	const router = useRouter();

	// effect to update cart count on state change
	useEffect(() => {
		setCartCount(getCartCount(state));
	}, [state.cart]);

	// effect toggles cart on page change
	useEffect(() => {
		// hides cart when navigating to new page on mobile
		if (state.isSmallerThanLarge) {
			toggleCart(state, dispatch, "hide");
		}
	}, [router.pathname]);

	const loggedIn = (
		<>
			{/* TODO: need to add link to profile/avatar button. Should go back to profile page */}
			<NavButton href="/restaurants" responsive hideCart>
				<StyledAvatar alt={`${currentUser}'s avatar`} />
				{state.isSmallerThanLarge ? null : currentUser}
			</NavButton>
			<NavButton
				responsive
				hideCart
				onClick={() => removeCredsFromCookies(state, dispatch)}
			>
				Logout
			</NavButton>
		</>
	);
	const loggedOut = (
		<>
			<NavButton href="/login" responsive hideCart>
				Login
			</NavButton>
			<NavButton href="/signup" responsive hideCart>
				Sign Up
			</NavButton>
		</>
	);

	return (
		<Container>
			{state.isAuthenticated ? loggedIn : loggedOut}
			<NavButton onClick={() => toggleCart(state, dispatch)}>
				<Badge
					// TODO: for some reason badge does NOT display when page refreshed
					badgeContent={cartCount}
					color="secondary"
				>
					<ShoppingCartOutlined />
				</Badge>
			</NavButton>
		</Container>
	);
};

NavMenu.propTypes = {};

export default NavMenu;

// ******************
// styles
// ******************

const Container = styled.div`
	display: flex;
	align-items: center;
`;
const StyledAvatar = styled(Avatar)`
	height: 2rem;
	width: 2rem;
	padding: auto 0;
	margin-right: 0;

	@media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
		padding: auto;
		margin-right: 0.5rem;
	}
`;
