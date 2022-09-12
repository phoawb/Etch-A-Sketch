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
let sliderValue = document.getElementById('sliderValue');
let gridSize = 16;

const createGrid = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    GRID.appendChild(cell);
  }
};

const deleteGrid = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    GRID.removeChild(GRID.firstChild);
  }
};

const adjustGrid = (gridSizeDiff) => {
  if (gridSizeDiff < 0) {
    deleteGrid(gridSizeDiff * -1);
    return;
  }
  createGrid(gridSizeDiff);
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
  BUTTONS.forEach((b) =>
    b.addEventListener('click', () => {
      if (b.classList === 'active-button') return;
      BUTTONS.forEach((b) => (b.classList = 'button'));
      b.classList.add('active');
    })
  );
  document.getElementById('blackButton').classList.add('active');
};

window.onload = () => {
  createGrid(gridSize * gridSize);
  activateButtons();
  console.log('available height is: ', screen.availHeight);
  console.log('available width is: ', screen.availWidth);
  console.log('full height is: ', screen.height);
};
