import React, { useState, useEffect } from "react";
import useLayoutEffect from "../utils/useIsomorphicLayoutEffect";
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
import { cart_toggle, cart_getCount } from "../store/actions/cart";
import { removeCredsFromCookies } from "../store/actions/auth";

// ******************
// component
// ******************
const NavMenu = (props) => {
	const { state, dispatch } = useStore();
	const [showAuthButtons, setShowAuthButtons] = useState();
	const [showBadge, setShowBadge] = useState();
	const [cartCount, setCartCount] = useState();
	const router = useRouter();

	// ! HACK: layoutEffect used to lazy load params for required for client-side hydration
	useLayoutEffect(() => {
		setShowAuthButtons(true);
		setCartCount(cart_getCount(state));
		setShowBadge(true);
	}, [state.isAuthenticated, state.cart]);

	// effect toggles cart on page change
	useEffect(() => {
		// hides cart when navigating to new page on mobile
		if (state.isSmallerThanLarge) {
			cart_toggle(state, dispatch, "hide");
		}
	}, [router.pathname]);

	const renderAuthButtons = state.isAuthenticated ? (
		// if logged in
		<>
			{/* // TODO: need to add link to profile/avatar button. Should go back to profile page */}
			<NavButton href="/restaurants" responsive hideCart>
				<StyledAvatar alt={`${state.user_current.username}'s avatar`}>
					{/* first letter of user, fallback from alt text not working */}
					{state.user_current.username &&
						state.user_current.username.charAt(0)}
				</StyledAvatar>
				{state.isSmallerThanLarge ? null : state.user_current.username}
			</NavButton>
			<NavButton
				responsive
				hideCart
				onClick={() => removeCredsFromCookies(state, dispatch)}
			>
				Logout
			</NavButton>
		</>
	) : (
		// if logged out
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
			{showAuthButtons && renderAuthButtons}
			<NavButton onClick={() => cart_toggle(state, dispatch)}>
				{showBadge && (
					<Badge
						// TODO: for some reason badge does NOT display when page refreshed
						badgeContent={cartCount}
						color="secondary"
					>
						<ShoppingCartOutlined />
					</Badge>
				)}
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
