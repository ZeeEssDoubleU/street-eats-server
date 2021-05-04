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

export default function Unauthorized() {
	return (
		<Container maxWidth="sm">
			<Card_Elevate>
				<CardHeader title="Unauthorized"></CardHeader>
				<CardContent>
					<Typography>Please log in.</Typography>
				</CardContent>
			</Card_Elevate>
		</Container>
	)
}
