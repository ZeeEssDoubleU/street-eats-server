import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format } from "date-fns/fp";
// import components
import {
	Container,
	CardHeader,
	CardContent,
	Typography,
	Divider,
} from "@material-ui/core";
import Card_withElevate from "../../components/Card/Card_withElevate";
// import utils
import useLayoutEffect from "../../utils/useIsomorphicLayoutEffect";

// ******************
// component
// ******************

const SuccessPage = ({ order, ...props }) => {
	const router = useRouter();

	useLayoutEffect(() => {
		if (!order) router.push("/restaurants");
	}, []);

	const conditionalDisplay = (order) => {
		// if no order, display this
		if (!order) {
			return <Typography>...Redirecting</Typography>;

			// if order exists, display this
		} else {
			const { id, name, email, address } = order;
			const { city, state, postal_code, restaurant } = order;
			const { dishes, amount, created_at } = order;

			const formatDate = (date) => {
				const local = new Date(date);
				const formatDate = format("M/d/yyyy")(local);
				const formatTime = format("h:mm a")(local);
				return `${formatDate} @ ${formatTime}`;
			};

			return (
				<CardContent>
					<Grid>
						<Typography variant="h4" gutterBottom>
							{`Thank you for the order, ${name.split(" ")[0]}!`}
						</Typography>
						<GridBetween>
							<Typography variant="h5">Order #{id}</Typography>
							<Typography>{formatDate(created_at)}</Typography>
						</GridBetween>
						<Divider />
						<Typography variant="h5" gutterBottom>
							Contact Details:
						</Typography>
						<GridBetween>
							<div>
								<Typography>{name}</Typography>
								<Typography>{address}</Typography>
								<Typography>
									{city}, {state} {postal_code}
								</Typography>
							</div>
							<Typography>{email}</Typography>
						</GridBetween>
						<Divider />
						<Typography variant="h5" gutterBottom>
							Order Details:
						</Typography>
						<GridBetween>
							<Typography variant="h6">{restaurant.name}</Typography>
							<Typography>
								Tel:{" "}
								<PhoneLink
									href={`tel:${restaurant.phone}`}
									rel="nofollow"
								>
									{restaurant.phone}
								</PhoneLink>
							</Typography>
						</GridBetween>
						<div>
							{dishes.map((item) => (
								<GridBetween key={item.id}>
									<Typography>{item.name}</Typography>
									<Typography>
										({item.quantity}) x ${item.price}
									</Typography>
								</GridBetween>
							))}
						</div>
						<GridBetween>
							<Typography variant="h6">Total:</Typography>
							<Typography variant="h6">
								${parseInt(amount / 100)}
							</Typography>
						</GridBetween>
					</Grid>
				</CardContent>
			);
		}
	};

	return (
		<Container maxWidth="sm">
			<Card_withElevate>{conditionalDisplay(order)}</Card_withElevate>
		</Container>
	);
};

SuccessPage.propTypes = {};

export default SuccessPage;

// ******************
// styles
// ******************

const Grid = styled.div`
	display: grid;
	grid-gap: ${(props) => props.theme.spacing(2) + "px"};
`;
const GridBetween = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: ${(props) => props.theme.spacing(2) + "px"};
	justify-content: space-between;
`;
const PhoneLink = styled.a`
	text-decoration: none;
	color: inherit;
`;
