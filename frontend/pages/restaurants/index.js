import axios from "axios";
// import components
import RestaurantsPage from "../../components/Restaurants/RestaurantsPage";

// ******************
// component
// ******************

export default ({ restaurants }) => {
	return <RestaurantsPage restaurants={restaurants} />;
};

// ******************
// initial props
// ******************
export const getStaticProps = async () => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/restaurants`,
		);
		const restaurants = data;

		return {
			props: {
				restaurants,
			},
		};
	} catch (error) {
		console.error(error);
	}
};
