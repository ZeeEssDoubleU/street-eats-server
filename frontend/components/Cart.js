import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import components
import { Typography } from "@material-ui/core";
import CartList from "./CartList";

// ******************
// component
// ******************

const Cart = (props) => {
	return (
		<Main component="main">
			<StyledGrid>
				<Typography variant="h4" component="h2" gutterBottom>
					Shopping Cart:
				</Typography>
				{/* // TODO: add cart to database to persist cart between sessions (consider session cookies as well) */}
				<CartList cart="shopping" />
			</StyledGrid>
		</Main>
	);
};

Cart.propTypes = {};
export default Cart;

// ******************
// styles
// ******************

import { Main, StyledGrid } from "../styles/elements";
