// atoms.js
import { atom } from 'jotai'




// ROADMAP SETUP

// Atoms to be used per instance of Paper.jsx
// Global map of all ids -> atoms

// Angle in radians from 0 (closed) to Math.PI (fully flipped)
const flipAngleAtoms = {}

export const flipAngleFamily = (paperId) => {
  if (!flipAngleAtoms[paperId]) flipAngleAtoms[paperId] = atom(0)
  return flipAngleAtoms[paperId]
}

// Is a flip currently in progress?
const flippingAtoms = {}

export const flippingFamily = (paperId) => {
  if (!flippingAtoms[paperId]) flippingAtoms[paperId] = atom(false)
  return flippingAtoms[paperId]
}
// Direction of flip: 1 for opening, -1 for closing
const flipDirectionAtoms = {}

export const flipDirectionFamily = (paperId) => {
  if (!flipDirectionAtoms[paperId]) flipDirectionAtoms[paperId] = atom(1)
  return flipDirectionAtoms[paperId]
}

// TopIndexAtom
export const topIndexAtom = atom(0);

// Page Base Position atom
const pageBasePositionsAtoms = {}

export const pageBasePositionsFamily = (paperId) => {
  if (!pageBasePositionsAtoms[paperId]) {
    pageBasePositionsAtoms[paperId] = atom(null)
  }
  return pageBasePositionsAtoms[paperId]
}


// Global Atoms
// Focus Atom
export const inFocusAtom = atom(false);

// Sticky Note Base Position atom
export const stickyNoteBasePositionsAtom = atom(null);

export const debugFlipAtoms = () => {
  console.log('flipAngleAtoms:', flipAngleAtoms);
  console.log('flippingAtoms:', flippingAtoms);
  console.log('flipDirectionAtoms:', flipDirectionAtoms);
//   console.log('pageBasePositionsAtoms:', pageBasePositionsAtoms);
}

// Global Paperstack atom
export const stackInteractionLockedAtom = atom(false);