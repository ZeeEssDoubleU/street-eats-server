import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useReducer,
} from "react";
import isEmpty from "lodash/fp/isEmpty";
import Cookies from "js-cookie";
import { useMediaQuery } from "@material-ui/core";
// import actions / reducers / utils
import { actionTypes_auth, getUser_current } from "./actions/auth";
import { actionTypes_cart, updateCheckout } from "./actions/cart";
import { reducer_root, initState } from "./reducers";
import { useTheme } from "@material-ui/core/styles";

// ! this causing render error on logout button.  May need to move initial logic to useEffect in StoreProvider
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const theme = useTheme();
	const isSmaller_large = useMediaQuery(theme.breakpoints.down("md"));
	const [state, dispatch] = useReducer(reducer_root, initState(isSmaller_large));

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

// useStore hook.  Acts as Consumer through useContext
export default () => {
	const { state, dispatch } = useContext(StoreContext);
	return { state, dispatch };
};
