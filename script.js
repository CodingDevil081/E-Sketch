let isDragging = false;
let rub = false;
let pen = false;
let rainbowcolor = false;
let initialRow, initialCol;
let gridItems = [];
let bor = false;

function createGrid(rows, cols) {
    const gridContainer = document.getElementById('gridContainer');

    gridContainer.innerHTML = '';

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        gridItems[i] = [];
        for (let j = 0; j < cols; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.setAttribute('data-row', i);
            gridItem.setAttribute('data-col', j);
            gridItem.addEventListener('mousedown', handleMouseDown);
            gridItem.addEventListener('mouseenter', handleMouseEnter);
            gridItem.addEventListener('mouseup', handleMouseUp);
            gridContainer.appendChild(gridItem);
            gridItems[i][j] = gridItem;
        }
    }
}

function handleMouseDown(event) {
    isDragging = true;
    initialRow = parseInt(event.target.getAttribute('data-row'));
    initialCol = parseInt(event.target.getAttribute('data-col'));
    toggleMark(event.target);
}

function handleMouseEnter(event) {
    if (isDragging) {
        const currentRow = parseInt(event.target.getAttribute('data-row'));
        const currentCol = parseInt(event.target.getAttribute('data-col'));
        if (currentRow !== initialRow || currentCol !== initialCol) {
            toggleMark(event.target);
            initialRow = currentRow;
            initialCol = currentCol;
        }
    }
}

function handleMouseUp() {
    isDragging = false;
}

function toggleMark(gridItem) {
    gridItem.classList.toggle('marked');
    if (rub) {
        gridItem.style.backgroundColor = "white";
    } else if(pen){
        color(gridItem);
    }
    else if(rainbowcolor){
        random_color(gridItem);
    }
    clear(gridItem);
}

function color(gridItem) {
    gridItem.style.backgroundColor = document.getElementById('selectColor').value;
}

function random_color(gridItem) {
    let r = Math.random() * 100;
    let g = Math.random() * 100;
    let b = Math.random() * 100;
    gridItem.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function clear(gridItem) {
    document.getElementById('cl').addEventListener("click", () => {
        gridItem.style.backgroundColor = "white";
    });
}

function rubber() {
    document.getElementById('rb').addEventListener("click", () => {
        rub = true;
        pen = false;
        rainbowcolor = false;
    });
    return rub;
}

function pencil() {
    document.getElementById('pn').addEventListener("click", () => {
        pen = true;
        rub = false;
        rainbowcolor = false;1
    });
    return pen;
}

function rainbow() {
    document.getElementById('rnd').addEventListener("click", () => {
        rainbowcolor = true;
        pen = false;
        rub = false; 
    });
    return rainbowcolor;
}

function rB() {
    gridItems.forEach(row => {
        row.forEach(gridItem => {
            gridItem.style.border = "none";
        });
    });
}

function removeBorder(){
    document.getElementById('rm').addEventListener("click", rB());
}


function main() {
    let rows, cols;
    let n = document.getElementById('sz');

    document.getElementById('ent').addEventListener("click", () => {
        rows = parseInt(n.value);
        cols = parseInt(n.value);

        if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1 || rows > 50 || cols > 50) {
            alert("Please enter a valid number between 1 and 50.");
            return;
        }

        createGrid(rows, cols);
        pencil();
        rubber(); 
        rainbow();
    });

    document.getElementById('rm').addEventListener("click", () => {
        bor = true;
        if (rows && cols) {
            removeBorder();
        }
    });
}

main();

