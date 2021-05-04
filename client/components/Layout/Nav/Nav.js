import React from "react"
import styled from "styled-components"
// import components
import { useIsomorphicEffect } from "../../../hooks"
import { Typography } from "@material-ui/core"
import NavMenu from "./NavMenu"
import NavButton from "./NavButton"
// import store / utils / hooks
import useStore from "../../../store/useStore"
import { useTheme } from "@material-ui/core/styles"
import { cart_toggle } from "../../../store/actions/cart"
import { isSmallerThanLarge } from "../../../store/actions/layout"

// ***********
// component
// ***********

export default function Nav(props) {
	const theme = useTheme()
	const { state, dispatch } = useStore()

	// lazy init cart state until react loaded in client
	useIsomorphicEffect(() => {
		cart_toggle(state, dispatch, isSmallerThanLarge(theme) ? "hide" : "show")
	}, [])

	return (
		<Container>
			<NavBrand>
				{/* // TODO: will redirect this back to home when homepage is created */}
				<NavButton href="/restaurants" hideCart>
					<Typography variant="h6">Home</Typography>
				</NavButton>
			</NavBrand>
			<NavMenu />
		</Container>
	)
}

// ***********
// styles
// ***********

const Container = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const NavBrand = styled.div`
	display: flex;
	align-items: center;
`
