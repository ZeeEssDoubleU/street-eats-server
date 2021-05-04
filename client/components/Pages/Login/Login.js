import React, { useState } from "react"
import Link from "next/link"
// import components
import { Container, CardHeader, CardContent } from "@material-ui/core"
import LoginForm from "./LoginForm"
import Card_Elevate from "../../Card/Card_Elevate"
import CardActionButton from "../../Card/CardActionButton"
import { useAuth } from "../../../hooks"
// import styles
import { StyledCardActions } from "../../../styles/elements"

// ***********
// component
// ***********

export default function Login() {
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
		password_show: false,
	})

	const { handleChange, handleSubmit, showPasswordIcon } = useAuth({
		formData,
		setFormData,
		authType: "login",
	})

	// TODO: consider adding other provider logins (ie facebook, google, etc)
	return (
		<Container maxWidth="sm">
			<Card_Elevate>
				<CardHeader title="Login" />
				<CardContent>
					<LoginForm
						{...{
							formData,
							handleChange,
							handleSubmit,
							showPasswordIcon,
						}}
					/>
				</CardContent>
				<StyledCardActions>
					<CardActionButton
						variant="contained"
						color="primary"
						form="form-login"
						type="submit"
					>
						Login
					</CardActionButton>
					<Link href="/signup" passHref>
						<CardActionButton color="primary">Sign Up</CardActionButton>
					</Link>
				</StyledCardActions>
			</Card_Elevate>
		</Container>
	)
}
