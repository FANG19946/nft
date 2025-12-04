// src/lib/applyFlipDeformation.js
import { MathUtils } from 'three';
import { getDefaultStore } from 'jotai';
// import { flipDirectionAtom } from './atoms'

export function applyFlipDeformation({
    positionAttr,
    basePositions,
    angle,
    height,
    originY = height / 2,
    curlStrength = 0.2,
    zOffset = 0,
    width,
}) {

    // const store = getDefaultStore();
    // const direction = store.get(flipDirectionAtom);
    const arr = positionAttr.array;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (let i = 0; i < positionAttr.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const z = basePositions[i * 3 + 2];

        const relY = y - originY;
        const curl = curlStrength * Math.sin((relY / height) * Math.PI);

        const rotY = relY * cos;
        const rotZ = -relY * sin;
        const rotX = x * sin;

        const OffsetX = width * sin; // 0 -> width
        arr[i * 3] = x + OffsetX;

        // arr[i * 3 + 1] = rotY + originY;
        if (Math.abs(cos) > 0.95)
            arr[i * 3 + 1] = y * Math.abs(cos);
        else
            arr[i * 3 + 1] = y * 0.95;

        const OffsetZ = curl * sin;

        const startAngle = 80 * Math.PI / 180; 
        const endAngle = 100 * Math.PI / 180;  
        // const zShift = -0.4 * Math.sin((angle / Math.PI) * (Math.PI / 2));
        let zShift = 0
        if (angle >= startAngle && angle <= endAngle) {
            const t = (angle - startAngle) / (endAngle - startAngle); // 0 → 1
            zShift = -0.4 * t; // smoothly goes from 0 → -0.4
        } else if (angle > endAngle) {
            zShift = -0.4; // clamp after end
        }
        arr[i * 3 + 2] = z + OffsetZ + zShift;





        // z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset + z;
        if (angle < Math.PI / 2) {
            // arr[i * 3 + 2] = Math.max(z, z + z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset)

        }
        else {
            // arr[i * 3 + 2] = Math.max(z, -z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset)

        }
    }

    positionAttr.needsUpdate = true;
}
