const FONTS = [
  'Caveat',
  'Gloria Hallelujah',
  'Permanent Marker',
  'Rock Salt',
  'Rubik Spray Paint',
  'Sedgwick Ave',
]

let loaded = false
let promise = null

export function loadGraffitiFonts() {
  // already loaded → return instantly
  if (loaded) return Promise.resolve()

  // already loading → return same promise
  if (promise) return promise

  promise = (async () => {
    await Promise.all(
      FONTS.map(font =>
        document.fonts.load(`bold 32px "${font}"`)
      )
    )

    await document.fonts.ready
    loaded = true
  })()

  return promise
}