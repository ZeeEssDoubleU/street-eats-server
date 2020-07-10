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

const ErrorMessage = (props) => {
	return (
		<Container maxWidth="sm">
			<Card_withElevate>
				<CardHeader title={props.title}></CardHeader>
				<CardContent>
					<Typography>{props.message}</Typography>
				</CardContent>
			</Card_withElevate>
		</Container>
	);
};

ErrorMessage.propTypes = {};

export default ErrorMessage;
