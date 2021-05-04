import { useRef, useImperativeHandle } from "react"

// ***********
// component
// ***********

export default function StripeInput({
	component: Component,
	inputRef,
	...props
}) {
	const elementRef = useRef()

	useImperativeHandle(inputRef, () => ({
		focus: () => elementRef.current.focus,
	}))

	return (
		<Component
			onReady={(element) => (elementRef.current = element)}
			{...props}
		/>
	)
}
