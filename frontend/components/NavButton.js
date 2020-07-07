import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
// import components
import { Button } from "@material-ui/core";
// import store / actions
import useStore from "../store/useStore";
import { cart_toggle } from "../store/actions/cart";

// ******************
// component
// ******************

const NavButton = (props) => {
	const { state, dispatch } = useStore();

	const handleOnClick = () => {
		// if props.onClick exists, execute onClick
		props.onClick && props.onClick();

		// hide cart
		if (props.hideCart && state.isSmallerThanLarge) {
			cart_toggle(state, dispatch, "hide");
		}
	};

	const button = (
		<StyledButton onClick={handleOnClick} {...props}>
			{props.children}
		</StyledButton>
	);

	const button_withLink = (
		<Link onClick={handleOnClick} {...props}>
			{button}
		</Link>
	);

	return props.href ? button_withLink : button;
};

NavButton.propTypes = {};
export default NavButton;

// ******************
// styles
// ******************
export const StyledButton = styled(Button)`
	height: 4rem;
	padding: ${(props) => (props.responsive ? "1rem .25rem" : "1rem")};
	color: white;

	@media (min-width: 1260px) {
		padding: 1rem;
	}
`;
