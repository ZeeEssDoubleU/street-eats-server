export const actionTypes_cart = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
	REMOVE_RESTAURANT_FROM_CART: "REMOVE_RESTAURANT_FROM_CART",
	TOGGLE_CART: "TOGGLE_CART",
};

export const cart_getSaved = () =>
	JSON.parse(localStorage.getItem("cart")) || [];

export const cart_getCount = (state) => {
	const cart = state.cart || [];

	const cart_counts =
		cart.length > 0 ? cart.map((restaurant) => restaurant.items_count) : [0];

	const reducer = (acc, currentVal) => acc + currentVal;
	const cart_totalCount = cart_counts.reduce(reducer);

	return cart_totalCount;
};

export const cart_addItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.ADD_ITEM,
		payload: item,
	});
};

export const cart_removeItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.REMOVE_ITEM,
		payload: item,
	});
};

export const cart_removeRestaurant = (id, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.REMOVE_RESTAURANT_FROM_CART,
		payload: id,
	});
};

export const cart_toggle = (state, dispatch, hideOrShow) => {
	const payload = () => {
		if (hideOrShow === "hide") {
			return false;
		} else if (hideOrShow === "show") {
			return true;
		}
	};

	dispatch({
		type: actionTypes_cart.TOGGLE_CART,
		payload: payload() !== undefined ? payload() : !state.displayCart,
	});
};

export const cart_filterByRestaurantCheckout = async (cart) => {
	// console.log("cart:", cart); // ? debug

	// grab page slug for cart filtering
	// * use window.location instead of router because router incorrect on page refresh
	const vendorCheckoutSlug = window.location.pathname.split("/")[2];

	// filter restaurant based on checkout page
	const restaurant = await cart?.filter(
		(restaurant) => restaurant.slug === vendorCheckoutSlug,
	);
	// console.log("restaurant:", restaurant); // ? debug

	// return filtered restaurant
	return restaurant[0];
};
