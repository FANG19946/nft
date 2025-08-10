import { useThree } from '@react-three/fiber'
import { useAtomValue, useSetAtom } from 'jotai'
import { cameraPositionAtom, flipAngleAtom, flipDirectionAtom, flippingAtom } from '../lib/atoms'
import { useMemo } from 'react'
import { Plane } from '@react-three/drei'
import { pageAtom } from './UI'

export default function BackgroundPlane() {
  const { viewport } = useThree()
  // Camera Positioning
  const setCameraPos = useSetAtom(cameraPositionAtom)
  const setPage = useSetAtom(pageAtom)

  // Roadmap
  const flipping = useAtomValue(flippingAtom)
  const angle = useAtomValue(flipAngleAtom)
  const setFlipDirection = useSetAtom(flipDirectionAtom)
  const setFlipping = useSetAtom(flippingAtom)

  // Memoize size to avoid recalculating every frame
  const size =
  {
    width: 100,
    height: 100,
  }


  return (
    <Plane
      args={[size.width, size.height]}
      position={[0, 0, -10]} // Behind everything
      onClick={() => {

        // Camera positioning
        setCameraPos([0, 0, 5])
        setPage(0)

        // Roadmap
        // If not flipping and currently flipped
        if (!flipping && angle !== 0) {
          const direction = angle >= Math.PI ? -1 : 1
          setFlipDirection(direction)
          setFlipping(true)
        }

      }
      } // Set to default position and close book

    >
      <meshBasicMaterial transparent opacity={1} />
    </Plane>
  )
}
