// import components
import { InputAdornment, IconButton } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
// import store / utils
import useStore from "../store/useStore"
import { loginUser, registerUser } from "../store/actions/auth"

// ***********
// hook
// ***********

export default function useAuth({ formData, setFormData, authType }) {
	const { state, dispatch } = useStore()

	const handleChange = (target) => (event) => {
		const updateData = {
			...formData,
			[target]: event.target.value,
		}
		setFormData(updateData)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (authType === "login") loginUser(formData, state, dispatch)
		else if (authType === "register") registerUser(formData, state, dispatch)
	}

	const showPasswordIcon = (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				edge="end"
				onClick={() =>
					setFormData({
						...formData,
						password_show: !formData.password_show,
					})
				}
			>
				{formData.password_show ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	)

	return {
		handleChange,
		handleSubmit,
		showPasswordIcon,
	}
}
