import React from "react"
import Link from "next/link"
// import components
import { CardContent, Typography } from "@material-ui/core"
import Card_Elevate from "./Card_Elevate"
import CardActionButton from "./CardActionButton"
import CardImage from "./CardImage"

// ***********
// component
// ***********
export default function Card_Listing(props) {
	const button = (
		<CardActionButton
			variant="contained"
			color="secondary"
			onClick={props.buttonClick}
		>
			{props.buttonText}
		</CardActionButton>
	)
	const buttonWithLink = (
		<Link as={props.as} href={props.href} passHref>
			{button}
		</Link>
	)
	const buttonType = props.hasLink ? buttonWithLink : button

	return (
		<Card_Elevate>
			<CardImage image={props.image} />
			<CardContent>
				<Typography variant="h5" component="h2" gutterBottom>
					{props.name}
				</Typography>
				<Typography>{props.description}</Typography>
			</CardContent>
			<StyledCardActions item="true">
				{buttonType}
				{props.price && (
					<CardActionButton noClick>
						<Typography variant="h6">${props.price}</Typography>
					</CardActionButton>
				)}
			</StyledCardActions>
		</Card_Elevate>
	)
}

// ***********
// styles
// ***********

import { StyledCardActions } from "../../styles/elements"
