export default function inViewport(element) {
	var elementHeight = element.offsetHeight
	var elementWidth = element.offsetWidth

	var bounding = element.getBoundingClientRect()

	if (
		bounding.top >= -elementHeight &&
		bounding.left >= -elementWidth &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + elementWidth &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight
	) {
		return true
	}
}
