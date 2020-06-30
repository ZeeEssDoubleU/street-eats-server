import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// import components
import { Avatar, Typography, Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import Cart from "./Cart";
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
		if (state.isMobile) {
			toggleCart(state, dispatch, false);
		}
	}, [router.pathname]);

	const loggedIn = (
		<>
			<Link href="/" passHref>
				<ResponsiveNavButton isMobile={state.isMobile}>
					<StyledAvatar
						alt={`${currentUser}'s avatar`}
						// TODO: need to add link to avatar pic.  Needs to go back to a profile page
						src="/restaurants"
						isMobile={state.isMobile}
					/>
					{!state.isMobile && <div>{currentUser}</div>}
				</ResponsiveNavButton>
			</Link>
			<ResponsiveNavButton
				onClick={() => removeCredsFromCookies(state, dispatch)}
				isMobile={state.isMobile}
			>
				Logout
			</ResponsiveNavButton>
		</>
	);
	const loggedOut = (
		<>
			<Link href="/login" passHref>
				<ResponsiveNavButton isMobile={state.isMobile}>
					Login
				</ResponsiveNavButton>
			</Link>
			<Link href="/signup" passHref>
				<ResponsiveNavButton isMobile={state.isMobile}>
					Sign Up
				</ResponsiveNavButton>
			</Link>
		</>
	);

	return (
		<Container>
			{state.isAuthenticated ? loggedIn : loggedOut}
			<StyledNavButton>
				<Badge
					// TODO: for some reason badge does NOT display when page refreshed
					badgeContent={cartCount}
					color="secondary"
					onClick={() => toggleCart(state, dispatch)}
				>
					<ShoppingCartOutlined />
				</Badge>
			</StyledNavButton>
		</Container>
	);
};

NavMenu.propTypes = {};

export default NavMenu;

// ******************
// styles
// ******************

import { StyledNavButton } from "../styles/elements";

const Container = styled.div`
	display: flex;
	align-items: center;
`;
const StyledAvatar = styled(Avatar)`
	height: 2rem;
	width: 2rem;
	margin-right: ${(props) => (props.isMobile ? 0 : "0.5rem")};
`;
const ResponsiveNavButton = styled(StyledNavButton)`
	padding: ${(props) =>
		props.isMobile === true ? "1rem .25rem" : "1rem"} !important;
`;
