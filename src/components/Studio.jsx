// Studio.jsx
import React from 'react'
import Book from './Book'
import { Environment, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
// import { cameraPositionAtom } from '../lib/atoms'
// import CameraRig from './CameraRig'
import BackgroundPlane from './BackgroundPlane'
// import StickyNote from './StickyNote'
import Paper from './Paper'
import { inFocusAtom } from '../lib/atoms'
import { useAtom } from 'jotai'
import PaperStack from './PaperStack'

export default function Studio() {

    // PAGE WIDTH and HEIGHT has been hardcoded here and should ideally be imported everywhere from a constants file
    const PAGE_WIDTH = 1.28;
    const PAGE_HEIGHT = 1.81;
    const { viewport } = useThree()
    const left = -viewport.width * 0.3
    const right = -left
    const [inFocus, setInFocus] = useAtom(inFocusAtom)
    const sceneScale = Math.min(viewport.width, viewport.height);

    const scale = sceneScale * 0.4;

    // Checking viewport size 
    const isMobile = viewport.width < 8;
    
    const OBJECT_WIDTH = PAGE_WIDTH * scale;
    const OBJECT_HEIGHT = PAGE_HEIGHT * scale;

    const GAP = 0.5;

    const totalWidth = 2 * OBJECT_WIDTH + GAP;

    const desktopBookPosition = [-totalWidth / 2, 0, 0];
    const desktopStackPosition = [totalWidth / 2, 0, 0];

    const mobileBookPosition = [-OBJECT_WIDTH/2, 0, 0];
    const mobileStackPosition = [OBJECT_WIDTH/2, -OBJECT_HEIGHT-1, 0];
    
    const bookPosition = isMobile
        ? mobileBookPosition
        : desktopBookPosition;

    const stackPosition = isMobile
        ? mobileStackPosition
        : desktopStackPosition;
    

    
    const pages = [
        {
            front: "Roadmap",
            back: "Empty Page",
        },
        {
            front: "Sticky note",
            back: "Empty Page",
        },
        {
            front: "Roadmap",
            back: "Empty Page",
        },
    ];


    return (
        <group>
            <BackgroundPlane />
            {/* <CameraRig /> */}
            <Book
                scale={scale}
                position={inFocus ? [0, 0, 0.3] : bookPosition}
            />
            {/* <Paper front="Roadmap" back="Empty Page" position={[-1, 0, 0]} />
            <Paper front="Sticky note" back="Empty Page" position={[-1, 0, -0.2]} /> */}

            {/* <Paper front="Roadmap" back="Empty Page" position={[0,1,0]}/> */}
            <PaperStack pages={pages} scale={scale} position={stackPosition} />
            {/* <PaperStack pages={pages} position={[1,2,3]} /> */}


            {/* <StickyNote position={[0.3 - 1, -0.2, 0]} /> */}
            <Environment preset="city"></Environment>
            <directionalLight
                position={[2, 5, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />
             <OrbitControls enablePan={true} enableZoom={true} />


        </group>
    )
}
