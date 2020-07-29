import styled from "styled-components";
import Head from "next/head";
// import components
import { Grid, Typography } from "@material-ui/core";
import ListingCard from "../../components/Card/ListingCard";
// import store
import useStore from "../../store/useStore";
import { cart_addItem } from "../../store/actions/cart";
// import metadata
import site_metadata from "../../site_metadata";

// ******************
// component
// ******************

const RestaurantPage = ({ restaurant, dishes }) => {
	const { state, dispatch } = useStore();

	const displayDishes = dishes?.map((dish) => {
		return (
			<>
				<Head>
					{/* serp */}
					<title>
						{restaurant.name} | {site_metadata.title}
					</title>
					<meta name="description" content={restaurant.description} />
				</Head>
				<Grid item key={dish.id}>
					<ListingCard
						image={dish.image}
						name={dish.name}
						description={dish.description}
						buttonText="Add to Cart"
						buttonClick={() => {
							const payload = { dish, restaurant };
							cart_addItem(payload, state, dispatch);
						}}
						price={dish.price}
					/>
				</Grid>
			</>
		);
	});

	return (
		<StyledGrid>
			<TitleCard>
				<Typography variant="h2" component="h1">
					{restaurant.name}
				</Typography>
			</TitleCard>
			{displayDishes}
		</StyledGrid>
	);
};
export default RestaurantPage;

// ******************
// styles
// ******************

import { StyledGrid } from "../../styles/elements";

const TitleCard = styled.div`
	place-self: center;
`;
