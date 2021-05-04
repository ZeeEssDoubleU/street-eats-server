import styled from "styled-components"
// import components
import SEO from "../../../SEO"
import { Grid, Typography } from "@material-ui/core"
import Card_Listing from "../../../Card/Card_Listing"
// import styles
import { StyledGrid } from "../../../../styles/elements"
// import store
import useStore from "../../../../store/useStore"
import { cart_addItem } from "../../../../store/actions/cart"

// ***********
// component
// ***********

export default function Restaurant({ restaurant, dishes }) {
	const { state, dispatch } = useStore()

	const displayDishes = dishes?.map((dish) => {
		return (
			<Grid item key={dish.id}>
				<Card_Listing
					image={dish.image}
					name={dish.name}
					description={dish.description}
					buttonText="Add to Cart"
					buttonClick={() => {
						const payload = { dish, restaurant }
						cart_addItem(payload, state, dispatch)
					}}
					price={dish.price}
				/>
			</Grid>
		)
	})

	return (
		<>
			<SEO title={restaurant.name} description={restaurant.description} />
			<StyledGrid>
				<TitleCard>
					<Typography variant="h2" component="h1">
						{restaurant.name}
					</Typography>
				</TitleCard>
				{displayDishes}
			</StyledGrid>
		</>
	)
}

// ***********
// styles
// ***********

const TitleCard = styled.div`
	place-self: center;
`
