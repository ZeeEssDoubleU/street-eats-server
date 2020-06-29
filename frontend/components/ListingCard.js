import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
// import components
import { CardContent, Typography } from "@material-ui/core";
import Card_withElevate from "./Card_withElevate";
import CardActionButton from "./CardActionButton";
import CardImage from "./CardImage";
export const ListingCard = (props) => {
	const button = (
		<CardActionButton
			variant="contained"
			color="secondary"
			onClick={props.buttonClick}
		>
			{props.buttonText}
		</CardActionButton>
	);

	const buttonType = props.hasLink ? (
		<Link as={props.as} href={props.href} passHref>
			{button}
		</Link>
	) : (
		button
	);
	return (
		<Card_withElevate>
			<CardImage image={props.image} />
			<CardContent>
				<Typography variant="h5" component="h2" gutterBottom>
					{props.name}
				</Typography>
				<Typography>{props.description}</Typography>
			</CardContent>
			<StyledCardActions>{buttonType}</StyledCardActions>
		</Card_withElevate>
	);
};
ListingCard.propTypes = {};
export default ListingCard;

// ******************
// styles
// ******************

import { StyledCardActions } from "../styles/elements";
