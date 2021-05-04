import React from "react"
// import components
import {
	Container,
	CardHeader,
	CardContent,
	Typography,
} from "@material-ui/core"
import { Card_Elevate } from "../Card"

// ***********
// component
// ***********

export default function ErrorMessage(props) {
	return (
		<Container maxWidth="sm">
			<Card_Elevate>
				<CardHeader title={props.title}></CardHeader>
				<CardContent>
					<Typography>{props.message}</Typography>
				</CardContent>
			</Card_Elevate>
		</Container>
	)
}
