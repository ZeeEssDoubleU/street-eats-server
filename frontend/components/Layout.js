import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
// import components
import { AppBar, Drawer, Typography } from "@material-ui/core";
import { ShoppingCartOutlinedIcon } from "@material-ui/icons/";
import Cart from "./Cart";
import NavMenu from "./NavMenu";
import NavLink from "./NavLink";
// import store / utils / hooks
import useStore from "../store/useStore";
import { removeCredsFromCookies } from "../store/actions/auth";
import { useWindowResize } from "../utils/hooks";

// ******************
// component
// ******************
const Layout = (props) => {
	const { state, dispatch } = useStore();
	// hook that sets event listener on window resize
	useWindowResize();

	return (
		<Flex>
			<StyledAppBar color="primary">
				<Nav>
					<NavBrand>
						{/* TODO: will redirect this back to home when homepage is created */}
						<NavLink
							href="/restaurants"
							className="nav-brand"
							hideCart="mobile"
						>
							<Typography variant="h6">Home</Typography>
						</NavLink>
					</NavBrand>
					<NavMenu />
				</Nav>
			</StyledAppBar>
			<StyledMain
				component="main"
				maxWidth="xl"
				displayCart={state.displayCart}
			>
				{props.children}
			</StyledMain>
			<StyledDrawer
				variant="persistent"
				anchor="right"
				open={state.displayCart}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				<Cart />
			</StyledDrawer>
			<footer></footer>
		</Flex>
	);
};

Layout.propTypes = {};

export default Layout;

// ******************
// styles
// ******************

import { Main } from "../styles/elements";

const Flex = styled.div`
	display: flex;
`;
const StyledAppBar = styled(AppBar)`
	z-index: ${(props) => props.theme.drawer.zIndex + 1};
`;
const Nav = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const NavBrand = styled.div`
	display: flex;
	align-items: center;
`;
const StyledMain = styled(Main)`
	position: absolute;
	z-index: ${(props) => props.theme.drawer.zIndex - 1};
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	transition: right 0.25s, width 0.25s;

	@media (min-width: ${(props) => props.theme.breakpoints.width("md")}px) {
		right: ${(props) =>
			props.displayCart ? `calc(${props.theme.card.width} + 2rem)` : 0};
		width: ${(props) => `calc(100% - ${props.theme.card.width} - 2rem)`};
	}
`;
const StyledDrawer = styled(Drawer)`
	width: calc(${(props) => props.theme.card.width} + 2rem);
	max-width: 100%;
	z-index: ${(props) => props.theme.drawer.zIndex};
	.MuiDrawer-paper {
		width: calc(${(props) => props.theme.card.width} + 2rem);
		max-width: 100%;
	}
`;
