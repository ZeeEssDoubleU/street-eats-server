import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
// import components
import { Button } from "@material-ui/core";
// import store / actions
import useStore from "../store/useStore";
import { toggleCart } from "../store/actions/cart";

// ******************
// component
// ******************

const NavLink = (props) => {
	const { state, dispatch } = useStore();

	const handleOnClick = () => {
		if (props.onClick) {
			props.onClick();
		}

		if (props.hideCart) {
			if (props.hideCart && state.isSmaller_large) {
				toggleCart(state, dispatch, "hide");
			}
		}
	};

	const button = (
		<StyledButton onClick={handleOnClick} responsive={props.responsive}>
			{props.children}
		</StyledButton>
	);

	const button_withLink = (
		<Link href={props.href} passHref>
			{button}
		</Link>
	);

	return props.href ? button_withLink : button;
};

NavLink.propTypes = {};
export default NavLink;

// ******************
// styles
// ******************
export const StyledButton = styled(Button)`
	height: 4rem;
	padding: ${(props) => (props.responsive ? "1rem .25rem" : "1rem")};
	color: white;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: 1rem;
	}
`;
