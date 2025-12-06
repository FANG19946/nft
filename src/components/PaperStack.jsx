// PaperStack.jsx
import React, { createRef, useMemo, useState } from 'react'
import Paper from './Paper';
import { useAtomValue } from 'jotai';
import { flipAngleFamily } from '../lib/atoms';
import { useFrame } from '@react-three/fiber';


const ROTATION_RANGE = 5;
const Z_OFFSET = 0.2;

export default function PaperStack({ pages = [],position=[0,0,0] }) {
    //pages = [{
    // front:
    // back:
    // }...]
    


    const initialStack = useMemo(() => {
        return pages.map((p, i) => ({
            ...p,
            id: `paper-${i}`,
            rotationOffset: (Math.random() - 0.5) * 2 * ROTATION_RANGE, // ±5 deg
        }));
    }, [pages]);

    const [papers, setPapers] = useState(initialStack);
    
    const topPageFlipAngle = useAtomValue(flipAngleFamily(papers[0].id));


    const handleStackClick = () => {
        setPapers(prev => {
            const [top, ...rest] = prev;
            return [...rest, top];
        });
        setStackShift(1);
    };
    

    return (
        <group onClick={handleStackClick} position={position}>
            {papers.map((paper, index) => (
                <Paper
                    key={paper.id}
                    pageId={paper.id}
                    front={paper.front}
                    back={paper.back}
                    rotationOffset={paper.rotationOffset}
                    index={index}
                    isTop={index === 0}
                    position={[0, 0, -index * Z_OFFSET]}
                    topFlipAngle={topPageFlipAngle}
                />
            ))}
        </group>
    )
}
