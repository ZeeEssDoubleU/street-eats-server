import React, { forwardRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
// import components
import { Button } from "@material-ui/core"

// ***********
// component
// ***********

// forwardRef used to forward link components down to button hwen necessary
const CardActionButton = forwardRef(({ noClick, ...props }, ref) => {
	return (
		<StyledButton {...props} ref={ref} size={props.size || "large"}>
			{props.children}
		</StyledButton>
	)
})

CardActionButton.propTypes = {
	noClick: PropTypes.bool,
}
export default CardActionButton

// ***********
// styles
// ***********

const StyledButton = styled(Button)`
	cursor: ${(props) => (props.noClick ? "default" : "pointer")};
`
