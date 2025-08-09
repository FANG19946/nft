import { useThree } from '@react-three/fiber'
import { useSetAtom } from 'jotai'
import { cameraPositionAtom } from '../lib/atoms'
import { useMemo } from 'react'
import { Plane } from '@react-three/drei'
import { pageAtom } from './UI'

export default function BackgroundPlane() {
  const { viewport } = useThree()
  const setCameraPos = useSetAtom(cameraPositionAtom)
  const setPage = useSetAtom(pageAtom)

  // Memoize size to avoid recalculating every frame
  const size = useMemo(() => {
    return {
      width: viewport.width * 2,
      height: viewport.height * 2,
    }
  }, [viewport])

  return (
    <Plane
      args={[size.width, size.height]}
      position={[0, 0, -10]} // Behind everything
      onClick={() => {
        setCameraPos([0, 0, 5])
        setPage(0)

      }
      } // Set to default position and close book

    >
      <meshBasicMaterial transparent opacity={0} />
    </Plane>
  )
}
