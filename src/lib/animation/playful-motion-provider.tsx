import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import type { PropsWithChildren } from 'react'

export function PlayfulMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          type: 'spring',
          stiffness: 520,
          damping: 32,
          mass: 0.8,
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
