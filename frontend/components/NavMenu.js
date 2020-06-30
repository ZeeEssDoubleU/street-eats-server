import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// import components
import { Avatar, Typography, Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import Cart from "./Cart";
import NavLink from "./NavLink";
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
			toggleCart(state, dispatch, "hide");
		}
	}, [router.pathname]);

	const loggedIn = (
		<>
			<NavLink href="/restaurants" responsive hideCart="mobile">
				<StyledAvatar
					alt={`${currentUser}'s avatar`}
					// TODO: need to add link to avatar pic.  Needs to go back to a profile page
					src="/restaurants"
					isMobile={state.isMobile}
				/>
				{!state.isMobile && <div>{currentUser}</div>}
			</NavLink>
			<NavLink
				responsive
				onClick={() => removeCredsFromCookies(state, dispatch)}
				hideCart="mobile"
				href="/login"
			>
				Logout
			</NavLink>
		</>
	);
	const loggedOut = (
		<>
			<NavLink href="/login" responsive hideCart="mobile">
				Login
			</NavLink>
			<NavLink href="/signup" responsive hideCart="mobile">
				Sign Up
			</NavLink>
		</>
	);

	return (
		<Container>
			{state.isAuthenticated ? loggedIn : loggedOut}
			<NavLink>
				<Badge
					// TODO: for some reason badge does NOT display when page refreshed
					badgeContent={cartCount}
					color="secondary"
					onClick={() => toggleCart(state, dispatch)}
				>
					<ShoppingCartOutlined />
				</Badge>
			</NavLink>
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
	margin-right: ${(props) => (props.isMobile ? 0 : "0.5rem")};
`;
