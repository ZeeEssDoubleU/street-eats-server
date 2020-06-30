// import actions
import { toggleCart } from "./cart";

export const actionTypes_layout = {
	SET_IS_MOBILE: "SET_IS_MOBILE",
};

export const getIsSmaller_large = (theme) => {
	return (
		typeof window !== "undefined" &&
		window.innerWidth < theme.breakpoints.width("lg")
	);
};

export const setIsSmaller_large = (theme, state, dispatch) => {
	// check what state.isSmaller_large WAS
	// check if window is mobile NOW
	// if window is different than state.isSmaller_large was, update state.isSmaller_large
	if (state.isSmaller_large === false && getIsSmaller_large(theme) === true) {
		toggleCart(state, dispatch, "hide");

		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: true,
		});
	}
	if (state.isSmaller_large === true && getIsSmaller_large(theme) === false) {
		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: false,
		});
	}
};
