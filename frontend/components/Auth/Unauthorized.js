import React from "react";
import PropTypes from "prop-types";
// import components
import {
	Container,
	CardHeader,
	CardContent,
	Grid,
	Typography,
} from "@material-ui/core";
import Card_withElevate from "../Card/Card_withElevate";

const Unauthorized = (props) => {
	return (
		<Container maxWidth="sm">
			<Card_withElevate>
				<CardHeader title="Unauthorized"></CardHeader>
				<CardContent>
					<Typography>Please log in.</Typography>
				</CardContent>
			</Card_withElevate>
		</Container>
	);
};

Unauthorized.propTypes = {};

export default Unauthorized;
