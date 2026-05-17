import React, { useMemo } from 'react'

import * as THREE from 'three'

import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry'

// Check if doublespace breaks this 
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ')
    const lines = []
    let line = ''

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' '
        const width = ctx.measureText(testLine).width

        if (width > maxWidth && i > 0) {
            lines.push(line.trim())
            line = words[i] + ' '
        } else {
            line = testLine
        }
    }

    if (line) lines.push(line.trim())
    return lines
}

function fitFontSize(ctx, text, fontFamily, maxWidth, maxSize, minSize) {
    let size = maxSize

    while (size > minSize) {
        ctx.font = `bold ${size}px ${fontFamily}`
        const width = ctx.measureText(text).width

        if (width <= maxWidth) break

        size -= 10
    }

    return size
}

export default function GraffitiDecal({
    text,
    position,
    rotation,
    color,
    font,
    wallMesh,
}) {

    const material = useMemo(() => {

        const canvas = document.createElement('canvas')

        canvas.width = 1024
        canvas.height = 1024

        const ctx = canvas.getContext('2d')





        ctx.clearRect(0, 0, 1024, 1024)

        const fontFamily = font || 'Arial'

        // Check these for Responsiveness
        const maxWidth = 850
        const maxSize = 320
        const minSize = 60

        // STEP 1: find best size for wrapping system
        let fontSize = fitFontSize(ctx, text, fontFamily, maxWidth, maxSize, minSize)

        // STEP 2: set final font
        ctx.font = `bold ${fontSize}px ${fontFamily}`

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 40

        // STEP 3: wrap text using final font size
        const lines = wrapText(ctx, text, maxWidth)

        // STEP 4: vertical centering
        const lineHeight = fontSize * 1.2
        const totalHeight = lines.length * lineHeight

        let startY = (1024 - totalHeight) / 2 + fontSize / 2

        // STEP 5: draw lines
        lines.forEach((line, i) => {
            ctx.fillText(
                line,
                512,
                startY + i * lineHeight
            )
        })

        const texture = new THREE.CanvasTexture(canvas)

        texture.needsUpdate = true

        return new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            polygonOffset: true,
            depthWrite: false,
            polygonOffsetFactor: -10,
        })

    }, [text, color])

    const geometry = useMemo(() => {

        if (!wallMesh) return null

        return new DecalGeometry(
            wallMesh,
            new THREE.Vector3(...position),
            new THREE.Euler(0, 0, rotation),
            new THREE.Vector3(8, 8, 8)
        )

    }, [wallMesh, position, rotation])

    if (!geometry) return null

    return (
        <mesh
            geometry={geometry}
            material={material}
        />
    )
}