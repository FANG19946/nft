import { useAtomValue } from 'jotai'
import { cameraPositionAtom } from '../lib/atoms'
import useLerpedCamera from '../lib/useLerpedCamera'

export default function CameraRig() {
    const target = useAtomValue(cameraPositionAtom)

  
  useLerpedCamera(target)

  return <></>

}
