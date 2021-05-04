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

export default function SignupPage({
	formData,
	handleChange,
	handleSubmit,
	showPasswordIcon,
}) {
	return (
		<form id="form-signup" onSubmit={handleSubmit}>
			<Grid>
				<TextField
					label="First Name"
					variant="filled"
					value={formData.first_name}
					onChange={handleChange("first_name")}
					autoComplete="given-name"
				/>
				<TextField
					label="Last Name"
					variant="filled"
					value={formData.last_name}
					onChange={handleChange("last_name")}
					autoComplete="last-name"
				/>
				<TextField
					required
					label="Username"
					variant="filled"
					value={formData.username}
					onChange={handleChange("username")}
					autoComplete="username"
				/>
				<TextField
					required
					label="Email"
					variant="filled"
					type="email"
					value={formData.email}
					onChange={handleChange("email")}
					autoComplete="email"
				/>
				{/* custom password input */}
				<FormControl required variant="filled">
					<InputLabel htmlFor="password">Password</InputLabel>
					<FilledInput
						id="password"
						type={formData.password_show ? "text" : "password"}
						endAdornment={showPasswordIcon}
						value={formData.password}
						onChange={handleChange("password")}
						autoComplete="new-password"
					/>
				</FormControl>
				{/* custom confirm password input */}
				{/* // TODO: set up validation for confirm password */}
				<FormControl required variant="filled">
					<InputLabel htmlFor="password_confirm">
						Confirm Password
					</InputLabel>
					<FilledInput
						id="confirm-password"
						type={formData.password_show ? "text" : "password"}
						endAdornment={showPasswordIcon}
						value={formData.password_confirm}
						onChange={handleChange("password_confirm")}
						autoComplete="new-password"
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
