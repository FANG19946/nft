import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';

export function useFlipAnimation(flipAngleAtom, flippingAtom, flipDirectionAtom) {
  const [angle, setAngle] = useAtom(flipAngleAtom);
  const [flipping, setFlipping] = useAtom(flippingAtom);
  const [direction] = useAtom(flipDirectionAtom);

  useFrame((_, delta) => {
    if (!flipping) return;

    const speed = 2; // radians per second
    const nextAngle = angle + delta * direction * speed;

    if (nextAngle >= Math.PI || nextAngle <= 0) {
      setFlipping(false);
      setAngle(Math.max(0, Math.min(Math.PI, nextAngle)));
    } else {
      setAngle(nextAngle);
    }
    // console.log('flipAngle (radians):', angle.toFixed(1));

  });
  
}
