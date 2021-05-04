import React from "react"
import styled from "styled-components"
// import components
import {
	FormControl,
	FilledInput,
	InputLabel,
	TextField,
} from "@material-ui/core"

// ***********
// component
// ***********

export default function LoginForm({
	formData,
	handleChange,
	handleSubmit,
	showPasswordIcon,
}) {
	// TODO: consider adding other provider logins (ie facebook, google, etc)
	return (
		// TODO: need to add form validation (possibly show feedback below fields)
		<form id="form-login" onSubmit={handleSubmit}>
			<Grid>
				<TextField
					required
					label="Email"
					variant="filled"
					type="email"
					value={formData.identifier}
					onChange={handleChange("identifier")}
					autoComplete="email"
				/>
				{/* custom password input */}
				<FormControl required fullWidth variant="filled">
					<InputLabel htmlFor="password">Password</InputLabel>
					<FilledInput
						id="password"
						type={formData.password_show ? "text" : "password"}
						endAdornment={showPasswordIcon}
						value={formData.password}
						onChange={handleChange("password")}
						autoComplete="existing-password"
					/>
				</FormControl>
			</Grid>
		</form>
	)
}

// ***********
// styles
// ***********

const Grid = styled.div`
	display: grid;
	grid-gap: ${(props) => props.theme.spacing(3) + "px"};
`
