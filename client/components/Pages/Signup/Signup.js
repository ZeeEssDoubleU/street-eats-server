import { useState } from "react"
import { useRouter } from "next/router"
// import components
import { Container, CardHeader, CardContent } from "@material-ui/core"
import SignupForm from "./SignupForm"
import Card_Elevate from "../../Card/Card_Elevate"
import CardActionButton from "../../Card/CardActionButton"
import { useAuth } from "../../../hooks"
// import styles
import { StyledCardActions } from "../../../styles/elements"

// ***********
// component
// ***********

export default function SignupPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_confirm: "",
		password_show: false,
	})

	const { handleChange, handleSubmit, showPasswordIcon } = useAuth({
		formData,
		setFormData,
		authType: "register",
	})

	return (
		<Container maxWidth="sm">
			<Card_Elevate>
				<CardHeader title="Sign Up" />
				<CardContent>
					<SignupForm
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
						form="form-signup"
						type="submit"
					>
						Register
					</CardActionButton>
					<CardActionButton color="primary" onClick={() => router.back()}>
						Go Back
					</CardActionButton>
				</StyledCardActions>
			</Card_Elevate>
		</Container>
	)
}
