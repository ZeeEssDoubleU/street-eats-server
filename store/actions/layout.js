// import actions
import { cart_toggle } from "./cart";

export const actionTypes_layout = {
	SET_IS_MOBILE: "SET_IS_MOBILE",
};

export const isSmallerThanLarge = (theme) =>
	typeof window !== "undefined" &&
	window.innerWidth < theme.breakpoints.width("lg");

export const setIsSmallerThanLarge = (theme, state, dispatch) => {
	// check what state.isSmallerThanLarge WAS
	// check if window is mobile NOW
	// if window is different than state.isSmallerThanLarge was, update state.isSmallerThanLarge
	if (
		state.isSmallerThanLarge === false &&
		isSmallerThanLarge(theme) === true
	) {
		cart_toggle(state, dispatch, "hide");

		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: true,
		});
	}
	if (
		state.isSmallerThanLarge === true &&
		isSmallerThanLarge(theme) === false
	) {
		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: false,
		});
	}
};
