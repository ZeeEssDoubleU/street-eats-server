import React from "react";
import useLayoutEffect from "../../utils/useIsomorphicLayoutEffect";
import styled from "styled-components";
import Head from "next/head";
import PropTypes from "prop-types";
// import components
import { AppBar, Drawer, Typography } from "@material-ui/core";
import Cart from "../Cart/Cart";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import SEO from "../SEO";
// import store / utils / hooks
import useStore from "../../store/useStore";
import { useTheme } from "@material-ui/core/styles";
import { cart_toggle } from "../../store/actions/cart";
import { isSmallerThanLarge } from "../../store/actions/layout";
import useWindowResize from "../../utils/onWindowResize";

// ******************
// component
// ******************
const Layout = (props) => {
	const theme = useTheme();
	const { state, dispatch } = useStore();

	// hook that sets event listener on window resize
	useWindowResize();

	// lazy init cart state until react loaded in client
	useLayoutEffect(() => {
		cart_toggle(state, dispatch, isSmallerThanLarge(theme) ? "hide" : "show");
	}, []);

	return (
		<>
			<SEO />
			<Flex>
				<StyledAppBar color="primary">
					<Nav>
						<NavBrand>
							{/* TODO: will redirect this back to home when homepage is created */}
							<NavButton href="/restaurants" hideCart>
								<Typography variant="h6">Home</Typography>
							</NavButton>
						</NavBrand>
						<NavMenu />
					</Nav>
				</StyledAppBar>
				<StyledMain
					component="main"
					maxWidth="xl"
					display_cart={state.display_cart === true ? "true" : "false"}
				>
					{props.children}
				</StyledMain>
				<StyledDrawer
					variant="persistent"
					anchor="right"
					open={state.display_cart}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Cart />
				</StyledDrawer>
				<footer></footer>
			</Flex>
		</>
	);
};

Layout.propTypes = {};

export default Layout;

// ******************
// styles
// ******************

import { Main } from "../../styles/elements";

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

	${(props) => props.theme.breakpoints.up("lg")} {
		right: ${(props) =>
			props.display_cart === "true"
				? `calc(${props.theme.card.width} + 2rem)`
				: 0};
		width: ${(props) => `calc(100% - ${props.theme.card.width} - 2rem)`};
		transition: right 0.25s, width 0.25s;
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
