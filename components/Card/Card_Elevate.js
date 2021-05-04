import React, { useState, useRef } from "react"
import styled from "styled-components"
import dynamic from "next/dynamic"
// import components
// ! lazy (dynamic) load component due to React throwing SSR hyrdration warning
const Card = dynamic(() => import("@material-ui/core/Card"), { ssr: false })

// ***********
// component
// ***********

export default function Card_Elevate({ children }) {
	const [raised, setRaised] = useState(false)
	const focusRef = useRef(false)

	return (
		<StyledCard
			raised={raised}
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() =>
				setRaised(focusRef.current === true ? raised : false)
			}
			onFocus={() => {
				focusRef.current = true
				setRaised(true)
			}}
			onBlur={() => {
				focusRef.current = false
				setRaised(false)
			}}
		>
			{children}
		</StyledCard>
	)
}

// ***********
// styles
// ***********

const StyledCard = styled(Card)`
	position: relative;
	max-width: 100%;
`
