import { getDefaultStore } from 'jotai';
import { flipAngleAtom, flippingAtom, flipDirectionAtom } from './atoms';

const store = getDefaultStore();

export function handleClick() {
  const flipping = store.get(flippingAtom);
  const angle = store.get(flipAngleAtom);

  if (!flipping) {
    const direction = angle >= Math.PI ? -1 : 1;

    store.set(flipDirectionAtom, direction);
    store.set(flippingAtom, true);
    // console.log('Starting flip. Direction:', direction, 'Angle:', angle);
  } else {
    // console.log('Flip already in progress');
  }
}
