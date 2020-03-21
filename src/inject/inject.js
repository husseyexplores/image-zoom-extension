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

function press(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
    up = true
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = true
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = true
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
    left = true
  }

   if (up) scrollBy(0, -PX);
   if (down) scrollBy(0, PX);
   if (right) scrollBy(PX, 0);
   if (left) scrollBy(-PX, 0);
}
document.addEventListener('keydown',press)

function release(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
    up = false
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = false
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = false
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
    left = false
  }
}
document.addEventListener('keyup',release)

// Smooth scroll
document.querySelector('html').style['scroll-behavior']
