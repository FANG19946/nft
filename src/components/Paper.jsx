// Paper.jsx
import { useTexture } from '@react-three/drei';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BoxGeometry,
  Color,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
} from 'three';
import { handleClick } from '../lib/pageFlipController';
import { useFlipAnimation } from '../lib/useFlipAnimation';
import { flipAngleFamily, flippingFamily, flipDirectionFamily, pageBasePositionsFamily, stackInteractionLockedAtom } from '../lib/atoms';
import { getDefaultStore, useAtomValue, useSetAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { applyFlipDeformation } from '../lib/applyFlipDeformation';
import { log } from 'three/tsl';
import { debugFlipAtoms } from '../lib/atoms';
import { stackShiftAnimation } from '../lib/stackShiftAnimation';


// Page Constants
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const whiteColor = new Color('white');

const store = getDefaultStore();

const pageMaterials = new Array(4).fill(
  new MeshStandardMaterial({ color: whiteColor })
);

export default function Paper({ front, back, children, PAGE_WIDTH = 1.28, PAGE_HEIGHT = 1.81, rotationOffset = 0, index, topPaperId, topFlipAngle, ...props }) {

  // Unique ID per instance
  const paperId = props.pageId;

  const flipAngleAtom = flipAngleFamily(paperId);
  const flippingAtom = flippingFamily(paperId);
  const flipDirectionAtom = flipDirectionFamily(paperId);
  const pageBasePositionsAtom = pageBasePositionsFamily(paperId);

  useFlipAnimation(flipAngleAtom, flippingAtom, flipDirectionAtom, props.totalPapers);
  const meshRef = useRef();
  const basePositions = useRef(null);
  const flipAngle = useAtomValue(flipAngleAtom);

  const setPageBasePositions = useSetAtom(pageBasePositionsAtom);

  const isInteractionLocked = useAtomValue(stackInteractionLockedAtom);
  const setInteractionLocked = useSetAtom(stackInteractionLockedAtom);

  useEffect(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const base = Float32Array.from(posAttr.array);
    basePositions.current = base;
    setPageBasePositions(base);

    // Optional: Logging for inspection
    // for (let i = 0; i < posAttr.count; i++) {
    //   const x = -basePositions[i * 3] + PAGE_WIDTH / 2;
    //   const y = -basePositions[i * 3 + 1] + PAGE_HEIGHT / 2;
    //   const z = basePositions[i * 3 + 2];
      // console.log(`i: ${i}, x: ${x.toFixed(3)}, y: ${y.toFixed(3)}, z: ${z.toFixed(3)}`);
    // }
  }, []);


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

    applyFlipDeformation({
      positionAttr: meshRef.current.geometry.attributes.position,
      basePositions: basePositions.current, //  FIXED REFERENCE
      angle: flipAngle,
      height: PAGE_HEIGHT,
      width: PAGE_WIDTH,
      totalPapers: props.totalPapers,
    });


    stackShiftAnimation({
      positionAttr: meshRef.current.geometry.attributes.position,
      basePositions: basePositions.current,
      angle: topFlipAngle,
      height: PAGE_HEIGHT,
      width: PAGE_WIDTH,
      zOffset: 0.2,          
      paperId: paperId,
      topPaperId: topPaperId,
      totalPapers: props.totalPapers,
    });


    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.geometry.computeBoundingBox();
    meshRef.current.geometry.computeBoundingSphere();

  });

  

  useEffect(() => {
    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.attributes.position;
    const base = Float32Array.from(posAttr.array);
    basePositions.current = base;
    setPageBasePositions(base);

    
  }, [topPaperId]); // this dependency ensures it runs whenever topPaperId changes

  return (
    <mesh
      ref={meshRef}
      rotation={[0, 0, MathUtils.degToRad(rotationOffset)]}
      geometry={mesh.geometry}
      material={mesh.material}
      onClick={(e) => {
        e.stopPropagation()    

        // Disable clicks for other pages while flipping in progress
        if (isInteractionLocked) return;
        setInteractionLocked(true);    
        
        handleClick(flipAngleAtom, flippingAtom, flipDirectionAtom, store);
        props.onStackClick()

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
