// Debugger
const debugging = false
function debug(...args) {
	if (!debugging) return
	console.log(...args)
}

// ---------------------------------------------------------------------------

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

	// If the dom has more than 1 elements (or less), then it's must not be image
	const childElementCount = document.body.childElementCount
	if (childElementCount !== 1) {
		return
	}

	// Make sure it's img
	const img = document.body.querySelector('img')
	if (!img) {
		return
	}

	const isEnterPressed = e.ctrlKey || e.metaKey;
	const isCtrlPressed = (e.keyCode == 13 || e.keyCode == 10);

	// If CTRL+Enter is pressed, trigger the click on img
	if (isCtrlPressed && isEnterPressed) {
		debug('2. Ctrl + Enter')
		click(getCenterXY())
		debug('3. Clicked')
	}
}

// Start listening
document.addEventListener('keydown',  handleCtrlEnter);
