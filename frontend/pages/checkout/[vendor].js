import { useRouter } from "next/router";
// import components
import { Container } from "@material-ui/core";
import PrivateRoute from "../../components/Auth/PrivateRoute";
import CartList from "../../components/Cart/CartList";
import CheckoutPage from "../../components/Checkout/CheckoutPage";
// import store / actions / utils
import useStore from "../../store/useStore";
import { creds_areValid } from "../../store/actions/auth";
import useLayoutEffect from "../../utils/useIsomorphicLayoutEffect";

// ******************
// component
// ******************

export default ({ isAuth, ...props }) => {
	const router = useRouter();
	const { state } = useStore();

	useLayoutEffect(() => {
		// redirect to restaurants if no cart
		if (state.cart.length === 0) {
			router.back();
		}
	}, []);

	const conditionalCheckout =
		state.cart?.length === 0 ? <CartList /> : <CheckoutPage {...props} />;

	return (
		<PrivateRoute isAuth={isAuth}>
			<Container maxWidth="sm">{conditionalCheckout}</Container>
		</PrivateRoute>
	);
};

// ******************
// inital props
// ******************
export const getServerSideProps = async (ctx, req, res) => {
	const isAuth = creds_areValid(ctx);

	return { props: { isAuth } };
};
