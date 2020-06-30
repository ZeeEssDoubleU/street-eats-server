export const actionTypes_layout = {
	SET_IS_MOBILE: "SET_IS_MOBILE",
};

export const getIsMobile = (theme) => {
	return (
		typeof window !== "undefined" &&
		window.innerWidth < theme.breakpoints.width("md")
	);
};

export const setIsMobile = (theme, state, dispatch) => {
	if (getIsMobile(theme) === true && state.isMobile === false) {
		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: true,
		});
	}
	if (getIsMobile(theme) === false && state.isMobile === true) {
		dispatch({
			type: actionTypes_layout.SET_IS_MOBILE,
			payload: false,
		});
	}
};
