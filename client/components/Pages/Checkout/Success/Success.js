import { useRouter } from "next/router"
import styled from "styled-components"
import { format } from "date-fns/fp"
// import components
import { Container, CardContent, Typography, Divider } from "@material-ui/core"
import { Card_Elevate } from "../../../Card"
import { ErrorMessage } from "../../../Error"
import { useIsomorphicEffect } from "../../../../hooks"
// import store/ utils
import useStore from "../../../../store/useStore"
import { cart_removeRestaurant } from "../../../../store/actions/cart"
import { parseInt_stripe } from "../../../../utils"

// ***********
// component
// ***********

export default function SuccessPage({ order }) {
	const router = useRouter()
	const { state, dispatch } = useStore()

	useIsomorphicEffect(() => {
		if (!order) {
			router.push("/restaurants")
		} else {
			// remove restaurant from cart as well
			const restaurant_id = order.restaurant.id
			cart_removeRestaurant(restaurant_id, state, dispatch)
		}
	}, [])

	const conditionalDisplay = (order) => {
		// if no order, display this
		if (!order) {
			return (
				<ErrorMessage
					title={"Order Unavailable"}
					message={"There is no order."}
				/>
			)

			// if order exists, display this
		} else {
			const { id, name, email } = order
			const { address, city, address_state, postal_code } = order
			const { restaurant, dishes, total, created_at } = order

			const formatDate = (date) => {
				const local = new Date(date)
				const formatDate = format("M/d/yyyy")(local)
				const formatTime = format("h:mm a")(local)
				return `${formatDate} @ ${formatTime}`
			}

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
									{city}, {address_state} {postal_code}
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
								${parseInt_stripe(total)}
							</Typography>
						</GridBetween>
					</Grid>
				</CardContent>
			)
		}
	}

	return (
		<Container maxWidth="sm">
			<Card_Elevate>{conditionalDisplay(order)}</Card_Elevate>
		</Container>
	)
}

// ***********
// styles
// ***********

const Grid = styled.div`
	display: grid;
	grid-gap: ${(props) => props.theme.spacing(2) + "px"};
`
const GridBetween = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: ${(props) => props.theme.spacing(2) + "px"};
	justify-content: space-between;
`
const PhoneLink = styled.a`
	text-decoration: none;
	color: inherit;
`
