// userFlipAnimation.js
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { stackInteractionLockedAtom, topIndexAtom } from './atoms';

export function useFlipAnimation(flipAngleAtom, flippingAtom, flipDirectionAtom, totalPapers) {
  const [angle, setAngle] = useAtom(flipAngleAtom);
  const [flipping, setFlipping] = useAtom(flippingAtom);
  const [direction] = useAtom(flipDirectionAtom);
  const [, setTopIndex] = useAtom(topIndexAtom);

  // Disable clicks for other pages while flipping in progress
  const [, setInteractionLocked] = useAtom(stackInteractionLockedAtom);



  useFrame((_, delta) => {
    if (!flipping) return;

    const speed = 3.5; // radians per second
    const nextAngle = angle + delta * speed;

    if (nextAngle >= Math.PI || nextAngle <= 0) {
      setFlipping(false);
      setAngle(0)
      setTopIndex((i) => (i + 1) % totalPapers);

      // Disable clicks for other pages while flipping in progress
      setInteractionLocked(false);
    } else {
      setAngle(nextAngle);
    }

  });
  
}
