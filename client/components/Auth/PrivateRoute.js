import React from "react"
import { useRouter } from "next/router"
// import components
import { useIsomorphicEffect } from "../../hooks"
import Unauthorized from "./Unauthorized"
// import store / utils
import useStore from "../../store/useStore"
import { creds_areValid } from "../../store/actions/auth"

// ***********
// component
// ***********

export default function PrivateRoute({ isAuth, ...props }) {
	const { state } = useStore()
	const router = useRouter()

	const auths_areValid =
		isAuth === true || (state.isAuthenticated && creds_areValid())

	// effect can only run in browser
	useIsomorphicEffect(() => {
		if (auths_areValid === false) {
			router.push("/login")
		}
	}, [])

	const conditionalDisplay = () =>
		auths_areValid ? props.children : <Unauthorized />

	return <>{conditionalDisplay()}</>
}
