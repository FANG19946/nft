import { atom } from 'jotai'

// CAMERA SETUP
// Global camera position target for the scene
export const cameraPositionAtom = atom([0, 0, 5])



// ROADMAP SETUP
// Angle in radians from 0 (closed) to Math.PI (fully flipped)
export const flipAngleAtom = atom(0);

// Is a flip currently in progress?
export const flippingAtom = atom(false);

// Direction of flip: 1 for opening, -1 for closing
export const flipDirectionAtom = atom(1);

// Page and Sticky Note Base Position atoms
export const pageBasePositionsAtom = atom(null);
export const stickyNoteBasePositionsAtom = atom(null);
