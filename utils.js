export function shuffle(array) {
	return array.sort((a, b) => 0.5 - Math.random())
}
