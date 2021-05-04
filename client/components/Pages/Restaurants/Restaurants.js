import styled from "styled-components"
// import components
import { Grid, Typography } from "@material-ui/core"
import Card_Listing from "../../Card/Card_Listing"
// import styles
import { StyledGrid } from "../../../styles/elements"

// ***********
// component
// ***********

export default function Restaurants({ restaurants }) {
	const displayRestaurants = restaurants?.map((restaurant) => {
		return (
			<Grid item key={restaurant.id}>
				<Card_Listing
					image={restaurant.image[0]}
					name={restaurant.name}
					description={restaurant.description}
					buttonText="View Menu"
					hasLink
					as={`/restaurants/${restaurant.slug}`}
					href={`/restaurants/[restaurant]`}
				/>
			</Grid>
		)
	})

	return (
		<StyledGrid>
			<TitleCard>
				<Typography variant="h2" component="h1">
					Restaurants
				</Typography>
			</TitleCard>
			{displayRestaurants}
		</StyledGrid>
	)
}

// ***********
// styles
// ***********

const TitleCard = styled.div`
	place-self: center;
`
