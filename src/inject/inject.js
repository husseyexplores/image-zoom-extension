// Debugger
const debugging = false
function debug(...args) {
	if (!debugging) return
	console.log(...args)
}

function log(...args) {
	args.forEach(arg => {
		console.log(`%c[IMG-CTRL-ALT-ZOOM] =>  ${arg}`, `background: mediumvioletred; color: #fff; padding: 5px 10px; display: inline-block; font-family: monospace; font-size: 13px; border-radius: 3px; letter-spacing: 0.1em;`)
	})
}

// ---------------------------------------------------------------------------

const initialize = () => {
	// If the dom has more than 1 elements (or less), then it's must not be image
	const imgsCount = document.body.getElementsByTagName('img').length
	const allElsCount = document.body.getElementsByTagName('*').length
	if (imgsCount !== 1 || allElsCount > 5) {
		log(`Not initialized. (imgs length: ${imgsCount})`)
		return
	}

	log('Initialized')

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

	const isKeyCode = (e, code) => e.keyCode === code || e.which === code;
	const keys = { w: 87, d: 68, s: 83, a: 65, z: 90 }

	// Listener
	function handleZoom(e) {
		debug('1. Trigger')
		// If CTRL+Enter is pressed, trigger the click on img
		if (isKeyCode(e, keys.z)) {
			debug('2. `Z` pressed')
			click(getCenterXY()) // zoom image by triggering click
			debug('3. Clicked')
		}
	}

	/* ASDF → arrow keys simulation*/
	let up = false,
			right = false,
			down = false,
			left = false;

	const PX = 300;

	function handleScroll(e) {
		if (isKeyCode(e, keys.w)) { up = true }
		if (isKeyCode(e, keys.d)) { right = true }
		if (isKeyCode(e, keys.s)) { down = true }
		if (isKeyCode(e, keys.a)) { left = true }

		if (up) scrollBy(0, -PX);
		if (down) scrollBy(0, PX);
		if (right) scrollBy(PX, 0);
		if (left) scrollBy(-PX, 0);
	}

	function keydownListener(e) {
		handleZoom(e)
		handleScroll(e)
	}

	document.addEventListener('keydown',keydownListener)

	// Reset directions on keyup
	function  keyupListener(e){
		if (isKeyCode(e, keys.w)) { up = false }
		if (isKeyCode(e, keys.d)) { right = false }
		if (isKeyCode(e, keys.s)) { down = false }
		if (isKeyCode(e, keys.a)) { left = false }
	}
	document.addEventListener('keyup', keyupListener)

	// Smooth scroll
	document.querySelector('html').style['scroll-behavior'] = 'smooth';

}

window.setTimeout(() => {
	log('Initializing...')
	initialize()
}, 100);
