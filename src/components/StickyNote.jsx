// StickyNote.jsx
import { useTexture } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import {
    BoxGeometry,
    Color,
    Mesh,
    MeshStandardMaterial,
    SRGBColorSpace,
    Vector3,
} from 'three';
import { useAtomValue, useSetAtom } from 'jotai';
import { flipAngleAtom, stickyNoteBasePositionsAtom } from '../lib/atoms.js';
import { useFrame } from '@react-three/fiber';
import { applyFlipDeformation } from '../lib/applyFlipDeformation.js';


const PAGE_HEIGHT = 1.81;



export default function StickyNote({
    width = 0.5,
    height = 0.5,
    depth = 0.003,
    color = '#ffeb3b',
    curveAmount = 0.02,
    ...props
}) {
    const texture = useTexture('/roadmap/Sticky note.png');
    texture.colorSpace = SRGBColorSpace;
    const basePositions = useRef(null);
    const ref = useRef();
    const setNoteBasePositions = useSetAtom(stickyNoteBasePositionsAtom);


    const mesh = useMemo(() => {
        const geometry = new BoxGeometry(width, height, depth, 30, 30, 1);



        const pos = geometry.attributes.position;
        const v = new Vector3();

        for (let i = 0; i < pos.count; i++) {
            v.fromBufferAttribute(pos, i);
            v.z = 1 - Math.cos(((v.y / width) * Math.PI) / 5 - 0.15) + 0.01;
            pos.setXYZ(i, v.x, v.y, v.z);
        }

        pos.needsUpdate = true;
        geometry.computeVertexNormals();
        const base = Float32Array.from(geometry.attributes.position.array);
        basePositions.current = base;
        setNoteBasePositions(base);





        const material = new MeshStandardMaterial({
            color: new Color(color),
            roughness: 0.8,
            metalness: 0.1,
        });

        const materials = [
            material,
            material,
            material,
            material,
            new MeshStandardMaterial({
                color: new Color(color),
                roughness: 0.8,
                metalness: 0.1,
                map: texture,
            }),
            material,
        ];


        const mesh = new Mesh(geometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        ref.current = mesh;

        return mesh;
    }, [width, height, depth, color, curveAmount]);

    const flipAngle = useAtomValue(flipAngleAtom);

    useFrame(() => {
        if (!ref.current || !basePositions.current) return;

        applyFlipDeformation({
            positionAttr: ref.current.geometry.attributes.position,
            basePositions: basePositions.current,
            angle: flipAngle,
            height: PAGE_HEIGHT, // or you could use `height` prop here too
            originY: PAGE_HEIGHT / 2 + 0.2

        });
        const posAttr = ref.current.geometry.attributes.position;
        const arr = posAttr.array;
        const base = basePositions.current;

        for (let i = 0; i < posAttr.count; i++) {



            arr[i * 3 + 2] = -base[i * 3 + 2] + arr[i * 3 + 2]; // re-add base Z
        }


        ref.current.geometry.computeVertexNormals();
        ref.current.geometry.computeBoundingBox();
        ref.current.geometry.computeBoundingSphere();
    });



    return <primitive ref={ref} object={mesh} {...props} />;
}
