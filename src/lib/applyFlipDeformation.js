// src/lib/applyFlipDeformation.js
import { MathUtils } from 'three';

export function applyFlipDeformation({
    positionAttr,
    basePositions,
    angle,
    height,
    originY = height / 2,
    curlStrength = 0.2,
    zOffset = 0,
    width,
    totalPapers
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

        const OffsetX = width * sin; // 0 -> width -> 0
        arr[i * 3] = x + OffsetX;



        // normalize x from right → left (1 → 0) with a cosine curve instead of linear
        const xNorm = Math.cos(((x + width / 2) / width) * Math.PI / 2);

        // determine base scale from angle
        const angleScale = Math.abs(cos) > 0.95 ? Math.abs(cos) : 0.95;

        // final y scale interpolates from left to right
        const yScale = angleScale + xNorm * (1 - angleScale);

        arr[i * 3 + 1] = y * yScale;


        const OffsetZ = curl * sin;

        const startAngle = 70 * Math.PI / 180;
        const endAngle = 110 * Math.PI / 180;
        // const zShift = -0.4 * Math.sin((angle / Math.PI) * (Math.PI / 2));
        let zShift = 0
        if (angle >= startAngle && angle <= endAngle) {
            const t = (angle - startAngle) / (endAngle - startAngle); // 0 → 1
            zShift = -0.2 * t * (totalPapers - 1); // smoothly goes from 0 → -0.4
        } else if (angle > endAngle) {
            zShift = -0.2* (totalPapers - 1); // clamp after end
        }
        if (angle != 0)
            arr[i * 3 + 2] = z + OffsetZ * (1 - xNorm) + zShift;

    }

    positionAttr.needsUpdate = true;
}
