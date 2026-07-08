import * as React from 'react'

type UseControllableStateParams<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = React.useCallback(
    (nextValue: T | ((previous: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (previous: T) => T)(currentValue)
          : nextValue

      if (!isControlled) {
        setInternalValue(resolvedValue)
      }

      onChange?.(resolvedValue)
    },
    [currentValue, isControlled, onChange],
  )

  return [currentValue, setValue] as const
}
