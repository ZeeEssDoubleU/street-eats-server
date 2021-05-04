import Router from "next/router"
import axios from "axios"
import jwt_decode from "jwt-decode"
// import utils
import { cookies } from "../../utils"

export const actionTypes_auth = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
}

// *** actions
export const getUser_current = () => {
	// check credentials from cookies
	const isAuth = creds_areValid()

	if (isAuth === false) {
		return null
	} else {
		// else, if token valid, return current user
		const user_current = cookies.get("user_current") || null
		return JSON.parse(user_current)
	}
}

export const registerUser = async (formData, state, dispatch) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
			formData,
			setRequestHeaders(),
		)
		const credentials = response.data
		// console.log("response_signup", credentials); // ? debug

		const user = await saveCredsToCookies(credentials, state, dispatch)
		dispatch({
			type: actionTypes_auth.SET_CURRENT_USER,
			payload: user,
		})

		// navigate to restaurants page
		Router.push("/restaurants")
	} catch (error) {
		console.error(error.response)
	}
}

export const loginUser = async (formData, state, dispatch) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
			formData,
			setRequestHeaders(),
		)
		const credentials = response.data
		// console.log("response_login:", credentials); // ? debug

		const user = await saveCredsToCookies(credentials, state, dispatch)
		dispatch({
			type: actionTypes_auth.SET_CURRENT_USER,
			payload: user,
		})

		// navigate to restaurants page
		Router.push("/restaurants")
	} catch (error) {
		console.error(error)
	}
}

export const logoutUser = (state, dispatch) => {
	if (!process.browser) return

	// remove credentials from cookies
	removeCredsFromCookies()

	dispatch({
		type: actionTypes_auth.SET_CURRENT_USER,
		payload: null,
	})

	// ! logs out from all windows in removeCredsFromCookies()
	// // to log out from all windows
	// window.localStorage.setItem("logout", Date.now());

	Router.push("/login")
}

// ****************
// helpers
// ****************

// if token exists, apply to ALL request auth headers
// ! need to add this manually to all api requests
export const setRequestHeaders = () => {
	const token = cookies.get("jwt")

	return {
		headers: token ? { Authorization: `Bearer ${token}` } : null,
	}
}

export const creds_areValid = (ctx) => {
	// leaving room for more credential types
	// may expand options later

	if (jwt_isValid(ctx) === true) {
		return true
	} else {
		// remove credentials from cookies
		removeCredsFromCookies(ctx)
		return false
	}
}

export const saveCredsToCookies = (credentials) => {
	if (!process.browser) return

	const { id, username, email } = credentials.user
	const user = { id, username, email }

	cookies.set("user_current", JSON.stringify(user))
	cookies.set("jwt", credentials.jwt)

	return user
}

export const removeCredsFromCookies = (ctx) => {
	if (!process.browser) return

	cookies.remove("user_current", ctx)
	cookies.remove("jwt", ctx)

	// to log out from all windows
	window.localStorage.setItem("logout", Date.now())
}

export const jwt_isValid = (ctx) => {
	// check for jwt
	const jwt = cookies.get("jwt", ctx)

	if (jwt) {
		const decoded = jwt_decode(jwt)

		// get current time
		const currentTime = Date.now() / 1000
		// console.log("currentTime:", currentTime); // ? debug
		// console.log("decoded.exp:", decoded.exp); // ? debug

		// if expired, return false
		// if valid, return true
		return currentTime >= decoded.exp ? false : true
	} else {
		return false
	}
}
