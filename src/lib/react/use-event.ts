import * as React from 'react'

export function useEvent<T extends (...args: Array<never>) => unknown>(
  callback: T | undefined,
) {
  const callbackRef = React.useRef(callback)

  React.useLayoutEffect(() => {
    callbackRef.current = callback
  })

  return React.useCallback((...args: Parameters<T>) => {
    return callbackRef.current?.(...args)
  }, [])
}
