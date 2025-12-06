// src/lib/stackShiftAnimation.js
import { MathUtils } from 'three';

export function stackShiftAnimation({
    positionAttr,
    basePositions,
    angle,
    height,
    originY = height / 2,
    curlStrength = 0.2,
    zOffset = 0.2,
    width,
}) {


    const arr = positionAttr.array;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (let i = 0; i < positionAttr.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const z = basePositions[i * 3 + 2];

        const t = Math.max(0, (angle - Math.PI / 2) / (Math.PI / 2));
        const zShift = t * zOffset;
        arr[i * 3 + 2] = z + zShift;



        arr[i * 3 + 2] = z + zShift;

    }

    positionAttr.needsUpdate = true;
}
