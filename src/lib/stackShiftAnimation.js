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
    paperId: paperId,
    topPaperId: topPaperId,
    totalPapers,
}) {


    const arr = positionAttr.array;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // compute previous top paper id using modulo
    const topIndex = parseInt(topPaperId.split('-')[1], 10);
    const prevIndex = (topIndex - 1 + totalPapers) % totalPapers;
    const prevTopPaperId = `paper-${prevIndex}`;

    if (angle > Math.PI / 4 && angle < Math.PI / 4 + 0.05) {
        console.log("stackshift triggered for", { paperId, topPaperId, angle });
    }

    for (let i = 0; i < positionAttr.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const z = basePositions[i * 3 + 2];

        const t = Math.max(0, (angle - Math.PI / 2) / (Math.PI / 2));
        const zShift = t * zOffset;
        if (paperId != prevTopPaperId && angle != 0) {
            // console.log("animating stack shift", { paperId, topPaperId })
            arr[i * 3 + 2] = z + zShift;
        }



        // arr[i * 3 + 2] = z + zShift;

    }

    positionAttr.needsUpdate = true;
}
