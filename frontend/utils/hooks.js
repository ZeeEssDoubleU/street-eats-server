import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
// import store / actions
import useStore from "../store/useStore";
import { setIsMobile } from "../store/actions/layout";

export const useWindowResize = () => {
	const theme = useTheme();
	const { state, dispatch } = useStore();

	// function runs on window resize event
	const onWindowResize = () => {
		setIsMobile(theme, state, dispatch);
	};

	// effect adds event listener on window resize to check if app is mobile
	useEffect(() => {
		// add listener on mount
		window.addEventListener("resize", onWindowResize);
		// remove on unmount
		return () => window.removeEventListener("resize", onWindowResize);
	}, ["resize", onWindowResize]);
};

useWindowResize.propTypes = {};
