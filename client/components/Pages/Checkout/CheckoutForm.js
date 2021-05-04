// import components
import { Grid, TextField, FormHelperText } from "@material-ui/core"
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js"
import StripeInput from "./StripeInput"

// ***********
// component
// ***********

export default function CheckoutForm({
	handleChange,
	handleSubmit,
	paymentInfo,
}) {
	return (
		<form id="form-billing" onSubmit={handleSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						type="email"
						label="Email"
						variant="filled"
						fullWidth
						value={paymentInfo.email}
						onChange={handleChange("email")}
						autoComplete="email"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						label="Full Name"
						variant="filled"
						fullWidth
						value={paymentInfo.name}
						onChange={handleChange("name")}
						autoComplete="name"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						label="Address"
						variant="filled"
						fullWidth
						value={paymentInfo.address}
						onChange={handleChange("address")}
						autoComplete="street-address"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						label="City"
						variant="filled"
						fullWidth
						value={paymentInfo.city}
						onChange={handleChange("city")}
						autoComplete="address-level2"
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField
						required
						label="State"
						variant="filled"
						fullWidth
						value={paymentInfo.state}
						onChange={handleChange("state")}
						autoComplete="address-level1"
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField
						required
						label="Zip Code"
						variant="filled"
						fullWidth
						value={paymentInfo.postal_code}
						onChange={handleChange("postal_code")}
						autoComplete="postal-code"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						InputProps={{
							inputComponent: StripeInput,
							inputProps: { component: CardNumberElement },
						}}
						InputLabelProps={{ shrink: true }}
						label="Card Number"
						variant="filled"
						fullWidth
						placeholder="4242 4242 4242 4242"
					/>
					<FormHelperText>
						{`Do NOT enter your real credit card info. Enter "4242
								4242 4242 4242" for testing.`}
					</FormHelperText>
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField
						required
						InputProps={{
							inputComponent: StripeInput,
							inputProps: { component: CardCvcElement },
						}}
						InputLabelProps={{ shrink: true }}
						label=" "
						variant="filled"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField
						required
						InputProps={{
							inputComponent: StripeInput,
							inputProps: { component: CardExpiryElement },
						}}
						InputLabelProps={{ shrink: true }}
						label="Expiry"
						variant="filled"
						fullWidth
					/>
				</Grid>
			</Grid>
		</form>
	)
}
