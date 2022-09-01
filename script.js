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

const grid = document.querySelector('.grid');
const slider = document.getElementById('slider');
let sliderValue = document.getElementById('sliderValue');
let gridSize = 16;

const createGrid = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    grid.appendChild(cell);
  }
};

const deleteGrid = (gridSquared) => {
  for (let i = 0; i < gridSquared; i++) {
    grid.removeChild(grid.firstChild);
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
slider.addEventListener('input', (e) => {
  const oldGridSize = gridSize;
  gridSize = Number(e.target.value);
  sliderValue.innerText = `${gridSize}`;
  grid.setAttribute(
    'style',
    `grid-template-columns: repeat(${gridSize}, 2fr); grid-template-rows: repeat(${gridSize}, 2fr);`
  );
  adjustGrid(gridSize * gridSize - oldGridSize * oldGridSize);
});

createGrid(gridSize * gridSize);
