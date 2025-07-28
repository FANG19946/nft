import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export default function useLerpedCamera(target, lookAt = [0, 0, 0]) {
    const { camera } = useThree()
    const targetRef = useRef(new Vector3(...target))
    const isAnimating = useRef(false)

    useEffect(() => {
        const newTarget = new Vector3(...target)
        if (!targetRef.current.equals(newTarget)) {
            targetRef.current.copy(newTarget)
            isAnimating.current = true
        }
    })
    useFrame(() => {
        if (!isAnimating.current) return

        camera.position.lerp(targetRef.current, 0.1)

        if (camera.position.distanceTo(targetRef.current) < 0.001) {
            camera.position.copy(targetRef.current)
            isAnimating.current = false
        }

        camera.lookAt(...lookAt)
    })



}