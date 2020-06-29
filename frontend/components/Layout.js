import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
// import components
import { AppBar, Drawer, Avatar, Typography } from "@material-ui/core";
import { ShoppingCartOutlinedIcon } from "@material-ui/icons/";
import Cart from "./Cart";
import NavMenu from "./NavMenu";
// import store / utils
import useStore from "../store/useStore";
import { removeCredsFromCookies } from "../store/actions/auth";

// ******************
// component
// ******************
const Layout = (props) => {
	return (
		<Flex>
			<StyledAppBar color="primary">
				<Nav>
					<NavBrand>
						{/* TODO: will redirect this back to home when homepage is created */}
						<Link href="/restaurants" passHref>
							<StyledNavButton className="nav-brand">
								<Typography variant="h6">Home</Typography>
							</StyledNavButton>
						</Link>
					</NavBrand>
					<NavMenu />
				</Nav>
			</StyledAppBar>
			<Main component="main" maxWidth="xl">
				{props.children}
			</Main>
			{/* 
				// TODO: set cart drawer to persistent 
				// TODO: add toggle to cart drawer 
				// TODO: consider moving drawer component to layout 
			*/}
			<StyledDrawer variant="permanent" anchor="right">
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

import { Main, StyledNavButton } from "../styles/elements";

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
const StyledDrawer = styled(Drawer)`
	width: calc(${(props) => props.theme.card.width} + 2rem);
	z-index: ${(props) => props.theme.drawer.zIndex};
	.MuiDrawer-paper {
		width: calc(${(props) => props.theme.card.width} + 2rem);
	}
`;
