import nookies from "nookies";
import js_cookie from "js-cookie";

export default {
	get: (name, ctx, options) => {
		return typeof window !== "undefined"
			? js_cookie.get(name, options)
			: nookies.get(ctx, options)[name];
	},
	set: (name, value, ctx, options) => {
		return typeof window !== "undefined"
			? js_cookie.set(name, value, options)
			: nookies.set(ctx, name, value, options);
	},
	remove: (name, ctx, options) => {
		return typeof window !== "undefined"
			? js_cookie.remove(name, options)
			: nookies.destroy(ctx, name, options);
	},
};
