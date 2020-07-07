import React, { createContext, useContext, useReducer } from "react";
// import actions / reducers / utils
import { isSmallerThanLarge } from "./actions/layout";
import { reducer_root, initState } from "./reducers";
import { useTheme } from "@material-ui/core/styles";

// ! this causing render error on logout button.  May need to move initial logic to useEffect in StoreProvider
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const theme = useTheme();
	// ! do NOT use MUI's useMediaQuery here.  Behavior not as expected
	const [state, dispatch] = useReducer(
		reducer_root,
		initState(isSmallerThanLarge(theme)),
	);

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
