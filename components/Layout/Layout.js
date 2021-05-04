import React from "react"
import styled from "styled-components"
// import components
import { useIsomorphicEffect, useWindowResize } from "../../hooks"
import { AppBar, Drawer } from "@material-ui/core"
import SEO from "../SEO"
import Nav from "./Nav"
import Cart from "../Cart"
// import store / utils / hooks
import useStore from "../../store/useStore"
import { useTheme } from "@material-ui/core/styles"
import { cart_toggle } from "../../store/actions/cart"
import { isSmallerThanLarge } from "../../store/actions/layout"
// import styles
import { Main } from "../../styles/elements"

// ***********
// component
// ***********

export default function Layout({ children }) {
	const theme = useTheme()
	const { state, dispatch } = useStore()

	// hook that sets event listener on window resize
	useWindowResize()

	// lazy init cart state until react loaded in client
	useIsomorphicEffect(() => {
		cart_toggle(state, dispatch, isSmallerThanLarge(theme) ? "hide" : "show")
	}, [])

	return (
		<>
			<SEO />
			<Flex>
				<StyledAppBar color="primary">
					<Nav />
				</StyledAppBar>
				<StyledMain
					component="main"
					maxWidth="xl"
					display_cart={state.display_cart === true ? "true" : "false"}
				>
					{children}
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
				<footer />
			</Flex>
		</>
	)
}

// ***********
// styles
// ***********

const Flex = styled.div`
	display: flex;
`
const StyledAppBar = styled(AppBar)`
	z-index: ${(props) => props.theme.drawer.zIndex + 1};
`
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
`
const StyledDrawer = styled(Drawer)`
	width: calc(${(props) => props.theme.card.width} + 2rem);
	max-width: 100%;
	z-index: ${(props) => props.theme.drawer.zIndex};
	.MuiDrawer-paper {
		width: calc(${(props) => props.theme.card.width} + 2rem);
		max-width: 100%;
	}
`
