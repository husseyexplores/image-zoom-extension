// Debugger
const debugging = false
function debug(...args) {
	if (!debugging) return
	console.log(...args)
}

// ---------------------------------------------------------------------------

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
	if (isCtrlPressed  &&  isEnterPressed) {
		debug('2. Ctrl + Enter')
		if (img.click) {
			img.click();
			debug('3. Clicked')
		}
	}
}

// Start listening
document.addEventListener('keydown',  handleCtrlEnter);
