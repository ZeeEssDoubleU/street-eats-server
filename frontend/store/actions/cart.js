export const actionTypes_cart = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
	REMOVE_RESTAURANT_FROM_CART: "REMOVE_RESTAURANT_FROM_CART",
	TOGGLE_CART: "TOGGLE_CART",
};

export const getSavedCart = () =>
	JSON.parse(localStorage.getItem("cart")) || [];

export const getCartCount = (state) => {
	const cart = state.cart || [];

	const cart_counts =
		cart.length > 0 ? cart.map((restaurant) => restaurant.items_count) : [0];

	const reducer = (acc, currentVal) => acc + currentVal;
	const cart_totalCount = cart_counts.reduce(reducer);

	return cart_totalCount;
};

export const addItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.ADD_ITEM,
		payload: item,
	});
};

export const removeItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.REMOVE_ITEM,
		payload: item,
	});
};

export const removeRestaurantFromCart = (id, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.REMOVE_RESTAURANT_FROM_CART,
		payload: id,
	});
};

export const toggleCart = (state, dispatch, payload) => {
	console.log("payload:", payload);
	dispatch({
		type: actionTypes_cart.TOGGLE_CART,
		payload: payload === undefined ? !state.displayCart : payload,
	});
};
