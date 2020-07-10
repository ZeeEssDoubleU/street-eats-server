// import components
import SuccessPage from "../../components/Checkout/SuccessPage";
import PrivateRoute from "../../components/Auth/PrivateRoute";
// import utils
import { creds_areValid } from "../../store/actions/auth";

// ******************
// component
// ******************
export default ({ order, isAuth, ...props }) => {
	return (
		<PrivateRoute isAuth={isAuth}>
			<SuccessPage order={order} {...props} />;
		</PrivateRoute>
	);
};

// ******************
// inital props
// ******************
export const getServerSideProps = async (ctx, req) => {
	const order = ctx.query?.order ? JSON.parse(ctx.query.order) : null;

	const isAuth = creds_areValid(ctx);

	return { props: { order, isAuth } };
};
