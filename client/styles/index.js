import { StylesProvider, CssBaseline } from "@material-ui/core"

// ************
// provider
// ************

export function StyleProvider({ children }) {
	return (
		// injectFirst injects MUI styles at top of document head so they can be overwritten
		<StylesProvider injectFirst>
			{/* mui style baseline */}
			<CssBaseline />
			{children}
		</StylesProvider>
	)
}

// ************
// exports
// ************

export { ThemeProvider, theme } from "./theme"
export { globalStyle } from "./global"
export { resetStyle } from "./reset"

export * from "./elements"
