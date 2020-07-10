import styled from "styled-components";
// import components
import { Grid, Typography } from "@material-ui/core";
import CardActionButton from "../Card/CardActionButton";
import ListingCard from "../Card/ListingCard";

// ******************
// component
// ******************

const RestaurantsPage = ({ restaurants }) => {
	const displayRestaurants = restaurants?.map((restaurant) => {
		return (
			<Grid item key={restaurant.id}>
				<ListingCard
					image={restaurant.image[0]}
					name={restaurant.name}
					description={restaurant.description}
					buttonText="View Menu"
					hasLink
					as={`/restaurants/${restaurant.slug}`}
					href={`/restaurants/[restaurant]`}
				/>
			</Grid>
		);
	});

	return (
		<StyledGrid>
			<TitleCard>
				<Typography variant="h2" component="h1">
					Restaurants
				</Typography>
			</TitleCard>
			{displayRestaurants}
		</StyledGrid>
	);
};

export default RestaurantsPage;

// ******************
// styles
// ******************

import { StyledGrid } from "../../styles/elements";

const TitleCard = styled.div`
	place-self: center;
`;
