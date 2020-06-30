import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
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

	// effect to update cart count on state change
	useEffect(() => {
		setCartCount(getCartCount(state));
	}, [state.cart]);

	const loggedIn = (
		<>
			<Link href="/" passHref>
				<StyledNavButton>
					{/* TODO: need to add link to avatar pic */}
					<StyledAvatar alt={`${currentUser}'s avatar`} src="/" />
					<div>{currentUser}</div>
				</StyledNavButton>
			</Link>
			<StyledNavButton
				onClick={() => removeCredsFromCookies(state, dispatch)}
			>
				Logout
			</StyledNavButton>
		</>
	);
	const loggedOut = (
		<>
			<Link href="/login" passHref>
				<StyledNavButton>Login</StyledNavButton>
			</Link>
			<Link href="/signup" passHref>
				<StyledNavButton>Sign Up</StyledNavButton>
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
	margin-right: 0.5rem;
`;
