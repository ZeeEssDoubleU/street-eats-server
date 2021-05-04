import { useLayoutEffect, useEffect } from "react"

// hack to prevent useLayoutEffect warning with SSR
const useIsomorphicEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect
export default useIsomorphicEffect
