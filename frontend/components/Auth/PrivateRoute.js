import React from "react";
import useLayoutEffect from "../../utils/useIsomorphicLayoutEffect";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// import components
import Unauthorized from "./Unauthorized";
// import store / utils
import useStore from "../../store/useStore";
import { creds_areValid } from "../../store/actions/auth";

const PrivateRoute = ({ isAuth, ...props }) => {
	const { state } = useStore();
	const router = useRouter();

	const auths_areValid =
		isAuth === true || (state.isAuthenticated && creds_areValid());

	// effect can only run in browser
	useLayoutEffect(() => {
		if (auths_areValid === false) {
			router.push("/login");
		}
	}, []);

	const conditionalDisplay = () =>
		auths_areValid ? props.children : <Unauthorized />;

	return <>{conditionalDisplay()}</>;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
