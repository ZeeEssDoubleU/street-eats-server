import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { ThemeProvider as ScThemeProvider } from "styled-components"
import { theme } from "./theme"

// ************
// provider
// ************

export function ThemeProvider({ children }) {
	return (
		<MuiThemeProvider theme={theme}>
			<ScThemeProvider theme={theme}>{children}</ScThemeProvider>
		</MuiThemeProvider>
	)
}

// ************
// exports
// ************

export { theme } from "./theme"
