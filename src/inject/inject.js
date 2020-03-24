// Debugger
const debugging = false
function debug(...args) {
	if (!debugging) return
	console.log(...args)
}

// ---------------------------------------------------------------------------

const initialize = () => {
	// If the dom has more than 1 elements (or less), then it's must not be image
	const imgs = document.body.querySelectorAll('img')
	if (imgs.length !== 1) {
		return
	}

	function click({ x, y }){
		const ev = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
			screenX: x,
			screenY: y,
			clientX: x,
			clientY: y,
			pageX: x,
			pageY: y
		})

		const el = document.elementFromPoint(x, y);
		if (!el) return debug('Not clicked')
		el.dispatchEvent(ev);
	}

	function getCenterXY() {
		const x = document.body.clientWidth / 2
		const y = document.body.clientHeight / 2
		return { x , y }
	}

	// Listener
	function handleCtrlEnter(e) {
		debug('1. Trigger')

		const isSpacePressed = e.keyCode === 32 || e.which === 32 || e.key === ' '
		const isCtrlPressed = e.ctrlKey || e.metaKey;
		const isEnterPressed = e.keyCode == 13 || e.which === 13 || e.keyCode == 10;

		const ctrlEnter = isCtrlPressed && isEnterPressed
		const ctrlSpace = isCtrlPressed && isSpacePressed
		// If CTRL+Enter is pressed, trigger the click on img
		if (ctrlEnter || ctrlSpace) {
			debug('2. Ctrl + Enter/Space')
			click(getCenterXY()) // zoom image by triggering click
			debug('3. Clicked')
		}
	}

	// Start listening
	document.addEventListener('keydown',  handleCtrlEnter);


	/* ASDF → arrow keys simulation*/
	let up = false,
			right = false,
			down = false,
			left = false;

	const PX = 300;

	const isKeyCode = (e, code) => e.keyCode === code || e.which === code;
	const keys = { w: 87, d: 68, s: 83, a: 65, }

	function press(e) {
		if (isKeyCode(e, keys.w)) { up = true}
		if (isKeyCode(e, keys.d)) { right = true}
		if (isKeyCode(e, keys.s)) { down = true}
		if (isKeyCode(e, keys.a)) { left = true}

		if (up) scrollBy(0, -PX);
		if (down) scrollBy(0, PX);
		if (right) scrollBy(PX, 0);
		if (left) scrollBy(-PX, 0);
	}
	document.addEventListener('keydown',press)

	function release(e){
		if (isKeyCode(e, keys.w)) { up = false}
		if (isKeyCode(e, keys.d)) { right = false}
		if (isKeyCode(e, keys.s)) { down = false}
		if (isKeyCode(e, keys.a)) { left = false}
	}
	document.addEventListener('keyup',release)

	// Smooth scroll
	document.querySelector('html').style['scroll-behavior'] = 'smooth';

}

window.setTimeout(() => {
	initialize()
}, 100);
