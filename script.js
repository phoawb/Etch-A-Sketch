/*Correct the gradient for Safari  
because Safari renders gradients different for some reason*/
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
let sketchColor = '#ff00c1';
let pencilToggle = true;
let sliderValue = document.getElementById('sliderValue');
let gridSize = 16;

const createCells = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    cell.addEventListener('mouseover', () => {
      if (pencilToggle) cell.style.backgroundColor = sketchColor;
    });
    cell.addEventListener('click', () =>
      pencilToggle ? (pencilToggle = false) : (pencilToggle = true)
    );
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
      case 'pinkButton': {
        b.addEventListener('click', () => (sketchColor = '#ff00c1'));
        break;
      }
      case 'vaporButton': {
        b.addEventListener('click', () => (sketchColor = 'vapor'));
        break;
      }
      case 'colorButton': {
        b.addEventListener('click', () => {
          let colorPickerColor = document.getElementById('colorInput').value;
          sketchColor = colorPickerColor;
        });
        break;
      }
      case 'eraserButton': {
        b.addEventListener('click', () => (sketchColor = '#c0c0c0'));
        break;
      }
    }
  });
  document.getElementById('pinkButton').classList.add('active');
};

const activateColorInput = () => {
  const colorInput = document.getElementById('colorInput');
  colorInput.addEventListener('input', (e) => {
    const colorButton = document.getElementById('colorButton');
    if (colorButton.classList.value === 'button active')
      sketchColor = e.target.value;
  });
};

window.onload = () => {
  createCells(gridSize * gridSize);
  activateButtons();
  activateColorInput();
};
