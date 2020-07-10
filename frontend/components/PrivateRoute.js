import React from "react";
import useLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// import store / utils
import useStore from "../store/useStore";
import { creds_areValid } from "../store/actions/auth";

const PrivateRoute = ({ isAuth, ...props }) => {
	const { state } = useStore();
	const router = useRouter();

	// effect can only run in browser
	useLayoutEffect(() => {
		// check state first, quickest
		if (!state.isAuthenticated) {
			router.push("/login");
		}
		// check if isAuth, false or null next
		else if (isAuth === false || isAuth === null) {
			router.push("/login");
		}
		// last if isAuth undefined, run cred check
		else if (isAuth === undefined && !creds_areValid()) {
			router.push("/login");
		}
	}, []);

	return <>{props.children}</>;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
