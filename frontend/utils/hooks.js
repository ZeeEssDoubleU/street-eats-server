import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

export const actionTypes_layout = {
	SET_IS_MOBILE: "SET_IS_MOBILE",
};

export const useWindowResize = (state, dispatch) => {
	const theme = useTheme();

	const getIsMobile = () => {
		return (
			typeof window !== "undefined" &&
			window.innerWidth < theme.breakpoints.width("md")
		);
	};

	const setIsMobile = () => {
		if (getIsMobile() === true && state.isMobile === false) {
			dispatch({
				type: actionTypes_layout.SET_IS_MOBILE,
				payload: true,
			});
		}
		if (getIsMobile() === false && state.isMobile === true) {
			dispatch({
				type: actionTypes_layout.SET_IS_MOBILE,
				payload: false,
			});
		}
	};

	// effect adds event listener on window resize to check if app is mobile
	useEffect(() => {
		// add listener on mount
		window.addEventListener("resize", setIsMobile);
		// remove on unmount
		return () => window.removeEventListener("resize", setIsMobile);
	}, ["resize", setIsMobile]);
};

useWindowResize.propTypes = {};
