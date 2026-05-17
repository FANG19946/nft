// BackgroundPlane.jsx
import { useThree } from '@react-three/fiber'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { inFocusAtom } from '../lib/atoms'
import { useMemo } from 'react'
import { Plane } from '@react-three/drei'
import { pageAtom } from './UI'

export default function BackgroundPlane() {
  const { viewport } = useThree()
  const [inFocus, setFocus] = useAtom(inFocusAtom)
  const setPage = useSetAtom(pageAtom)

  // Roadmap
  // const flipping = useAtomValue(flippingAtom)
  // const angle = useAtomValue(flipAngleAtom)
  // const setFlipDirection = useSetAtom(flipDirectionAtom)
  // const setFlipping = useSetAtom(flippingAtom)

  // Memoize size to avoid recalculating every frame
  const size =
  {
    width: 100,
    height: 100,
  }


  return (
    <Plane
      args={[size.width, size.height]}
      position={inFocus ? [0, 0, 0.1] : [0, 0, -10]} // Behind everything
      onClick={() => {

        setFocus(false)
        setPage(0)

        // Roadmap
        // If not flipping and currently flipped
        // BUG FIX: If in between flip and plane clicked return to base 
        // if (!flipping && angle !== 0) {
        //   const direction = angle >= Math.PI ? -1 : 1
        //   setFlipDirection(direction)
        //   setFlipping(true)
        // }

      }
      } // Set to default position and close book

    >
      <meshBasicMaterial color="black" transparent opacity={inFocus ? 0.5 : 0} />
      

    </Plane>
  )
}
