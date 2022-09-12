/*Correct the gradient for Safari  
because Safari renders gradients different for some reasons*/
(function () {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    console.log('do I get here?');
    document.body.style.backgroundImage =
      'linear-gradient( 0deg, rgba(255, 197, 217, 1) 40%, rgba(126, 220, 255, 1) 91%)';
  }
})();

const GRID = document.querySelector('.grid');
const SLIDER = document.getElementById('slider');
const BUTTONS = [...document.getElementsByClassName('button')];
let sketchColor = 'black';
let sliderValue = document.getElementById('sliderValue');
let gridSize = 16;

const createCells = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    GRID.appendChild(cell);
  }
};

const deleteCells = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    GRID.removeChild(GRID.firstChild);
  }
};

const adjustGrid = (gridSizeDiff) => {
  if (gridSizeDiff < 0) {
    deleteCells(gridSizeDiff * -1);
    return;
  }
  createCells(gridSizeDiff);
};

//Update the slider value label in real time
SLIDER.addEventListener('input', (e) => {
  const oldGridSize = gridSize;
  gridSize = Number(e.target.value);
  sliderValue.innerText = `${gridSize}`;
  GRID.setAttribute(
    'style',
    `GRID-template-columns: repeat(${gridSize}, 2fr); GRID-template-rows: repeat(${gridSize}, 2fr);`
  );
  adjustGrid(gridSize * gridSize - oldGridSize * oldGridSize);
});

const activateButtons = () => {
  BUTTONS.forEach((b) => {
    b.addEventListener('click', () => {
      if (b.classList.value === 'button active') return;
      BUTTONS.forEach((b) => (b.classList = 'button'));
      b.classList.add('active');
    });
    switch (b.id) {
      case 'blackButton': {
        b.addEventListener('click', () => (sketchColor = 'black'));
        break;
      }
      case 'vaporButton': {
        b.addEventListener('click', () => (sketchColor = 'vapor'));
        break;
      }
      case 'colorButton': {
        b.addEventListener('click', () => (sketchColor = 'color'));
        break;
      }
      case 'eraserButton': {
        b.addEventListener('click', () => (sketchColor = '#c0c0c0'));
        break;
      }
    }
  });
  document.getElementById('blackButton').classList.add('active');
};

window.onload = () => {
  createCells(gridSize * gridSize);
  activateButtons();
};
