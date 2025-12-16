// PaperStack.jsx
import React, { createRef, useMemo, useState } from 'react'
import Paper from './Paper';
import { useAtomValue } from 'jotai';
import { flipAngleFamily, flippingFamily, topIndexAtom } from '../lib/atoms';
import { useFrame } from '@react-three/fiber';


const ROTATION_RANGE = 5;
const Z_OFFSET = 0.2;

export default function PaperStack({ pages = [], position = [0, 0, 0] }) {
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
    const topIndex = useAtomValue(topIndexAtom);
    const topPageFlipAngle = useAtomValue(flipAngleFamily(papers[topIndex].id));
    const [topPaperId, setTopPaperId] = useState(papers[topIndex].id); // initially first paper
    const isTopFlipping = useAtomValue(flippingFamily(topPaperId));


    const handleStackClick = () => {
        const currentIndex = papers.findIndex(p => p.id === topPaperId);
        const nextIndex = (currentIndex + 1) % papers.length; // wrap around
        const nextTopId = papers[nextIndex].id;
        console.log('STACK CLICK, new top:', nextTopId);
        setTopPaperId(nextTopId);
    };


    React.useEffect(() => {
        // console.log('Current paper stack:', papers.map(p => p.id));
    }, [papers]);



    return (
        <group position={position}>
            {papers.map((paper, index) => (
                <Paper
                    key={paper.id}
                    pageId={paper.id}
                    front={paper.front}
                    back={paper.back}
                    rotationOffset={paper.rotationOffset}
                    index={index}
                    topPaperId={topPaperId}
                    position={[0, 0, -index * Z_OFFSET]}
                    topFlipAngle={topPageFlipAngle}
                    onStackClick={handleStackClick}
                    totalPapers={pages.length}
                />
            ))}
        </group>
    )
}
