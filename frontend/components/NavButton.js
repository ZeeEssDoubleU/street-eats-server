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

const NavButton = ({ responsive, hideCart, onClick, ...props }) => {
	const { state, dispatch } = useStore();

	const handleOnClick = () => {
		// if onClick exists, execute onClick
		onClick && onClick();

		// hide cart
		if (hideCart && state.isSmallerThanLarge) {
			cart_toggle(state, dispatch, "hide");
		}
	};

	const button = (
		<StyledButton onClick={handleOnClick} {...props}>
			{props.children}
		</StyledButton>
	);

	const formatButton = props.href ? (
		<Link {...props}>{button}</Link>
	) : (
		<>{button}</>
	);

	return formatButton;
};

NavButton.propTypes = {
	responsive: PropTypes.bool,
	hideCart: PropTypes.bool,
	onClick: PropTypes.func,
};
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
