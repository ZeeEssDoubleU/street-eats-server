import React from "react"
import styled from "styled-components"
import Link from "next/link"
// import components
import { Button } from "@material-ui/core"
// import store / actions
import useStore from "../../../store/useStore"
import { cart_toggle } from "../../../store/actions/cart"

// ***********
// component
// ***********

export default function NavButton({ responsive, hideCart, onClick, ...props }) {
	const { state, dispatch } = useStore()

	const handleOnClick = () => {
		// if onClick exists, execute onClick
		onClick && onClick()

		// hide cart
		if (hideCart && state.isSmallerThanLarge) {
			cart_toggle(state, dispatch, "hide")
		}
	}

	const button = (
		<StyledButton
			onClick={handleOnClick}
			responsive={responsive ? "true" : "false"}
			{...props}
		>
			{props.children}
		</StyledButton>
	)
	const buttonWithLink = <Link {...props}>{button}</Link>

	return props.href ? buttonWithLink : button
}

// ***********
// styles
// ***********

export const StyledButton = styled(Button)`
	height: 4rem;
	padding: ${(props) =>
		props.responsive === "true" ? "1rem .25rem" : "1rem"};
	color: white;

	@media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
		padding: 1rem;
	}
`
