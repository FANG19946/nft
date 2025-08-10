// src/lib/applyFlipDeformation.js
import { MathUtils } from 'three';
import { getDefaultStore } from 'jotai';
import { flipDirectionAtom } from './atoms'

export function applyFlipDeformation({
    positionAttr,
    basePositions,
    angle,
    height,
    originY = height / 2,
    curlStrength = 0.5,
    zOffset = 0,
}) {

    const store = getDefaultStore();
    const direction = store.get(flipDirectionAtom);
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

        arr[i * 3] = x;
        arr[i * 3 + 1] = rotY + originY;
        // z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset + z;
        if (angle < Math.PI / 2) {
            arr[i * 3 + 2] = Math.max(z, z + z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset)
        }
        else {
            arr[i * 3 + 2] = Math.max(z, -z - curl * MathUtils.clamp(angle / Math.PI, 0, 1) + rotZ + zOffset)

        }
    }

    positionAttr.needsUpdate = true;
}
