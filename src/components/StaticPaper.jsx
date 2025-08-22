import { useTexture } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    BoxGeometry,
    Color,
    Mesh,
    MeshStandardMaterial,
    SRGBColorSpace,
} from 'three';
import { useFrame } from '@react-three/fiber';
import { useSetAtom } from 'jotai';
import { cameraPositionAtom } from '../lib/atoms';


// Page Constants
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const whiteColor = new Color('white');


const pageMaterials = new Array(4).fill(
    new MeshStandardMaterial({ color: whiteColor })
);

export default function Paper({ front, back, children, PAGE_WIDTH = 1.28, PAGE_HEIGHT = 1.81, ...props }) {

    const setCameraPosition = useSetAtom(cameraPositionAtom)
    const meshRef = useRef();

    // lets get back to this
    const [frontTexture, backTexture] = useTexture([
        `/roadmap/${front}.png`,
        `/roadmap/${back}.png`,
    ]);
    frontTexture.colorSpace = backTexture.colorSpace = SRGBColorSpace;

    const mesh = useMemo(() => {
        const geometry = new BoxGeometry(
            PAGE_WIDTH,
            PAGE_HEIGHT,
            PAGE_DEPTH,
            PAGE_SEGMENTS,
            PAGE_SEGMENTS,
            1
        );


        const materials = [
            ...pageMaterials,
            new MeshStandardMaterial({
                color: whiteColor,
                map: frontTexture,
                roughness: 0.7,
            }),
            new MeshStandardMaterial({
                color: whiteColor,
                map: backTexture,
                roughness: 0.5,
            }),
        ];


        const mesh = new Mesh(geometry, materials);
        mesh.castShadow = mesh.receiveShadow = true;
        mesh.frustumCulled = false;

        return mesh;
    }, [frontTexture, backTexture]);

    useFrame(() => {
        if (!meshRef.current || !basePositions.current) return;


        meshRef.current.geometry.computeVertexNormals();
        meshRef.current.geometry.computeBoundingBox();
        meshRef.current.geometry.computeBoundingSphere();

    });



    return (
        <mesh
            ref={meshRef}
            geometry={mesh.geometry}
            material={mesh.material}
            onClick={(e) => {
                e.stopPropagation()
                // Setting Focus to Paper when clicked on it
                setCameraPosition([3, 0, 3])

            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
            castShadow
            receiveShadow
            {...props}
        >
        </mesh>
    );
}
