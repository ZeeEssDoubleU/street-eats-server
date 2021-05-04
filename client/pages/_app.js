import { useEffect } from "react"
// import styles
import { StyleProvider, ThemeProvider } from "../styles"
// import components
import Layout from "../components/Layout/Layout"
// import store
import { StoreProvider } from "../store/useStore"

// ***********
// component
// ***********

export default function _App({ Component, pageProps }) {
	// remove server side styles
	// avoids style duplication when same styles loaded by client
	async function removeServerStyles() {
		const jssStyles = await document.querySelector("#jss-server-side")
		jssStyles?.parentNode.removeChild(jssStyles)
	}

	useEffect(() => {
		removeServerStyles()
	}, [])

	return (
		<StyleProvider>
			<ThemeProvider>
				<StoreProvider>
					<Layout {...pageProps}>
						<Component {...pageProps} />
					</Layout>
				</StoreProvider>
			</ThemeProvider>
		</StyleProvider>
	)
}
