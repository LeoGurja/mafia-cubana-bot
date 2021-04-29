export default function shuffle<T>(array: T[]) {
  let currentIndex = array.length, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    array[currentIndex], array[randomIndex] = array[randomIndex], array[currentIndex]
  }

  return array
}