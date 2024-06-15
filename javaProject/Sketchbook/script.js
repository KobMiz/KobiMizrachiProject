const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        if (confirm("Are you sure you want to clear all content?")) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    if (e.target.id === 'erase') {
        startErasing();
    }

    if (e.target.id === 'draw') {
        isErasing = false;
        ctx.globalCompositeOperation = 'source-over';
        setBrushCursor();
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

const drawStart = (x, y) => {
    isPainting = true;
    startX = x;
    startY = y;
    ctx.beginPath();
    ctx.moveTo(x, y);
};

const drawMove = (x, y) => {
    if (isPainting) {
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

const drawEnd = () => {
    if (isPainting) {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    }
};

const eraseStart = (x, y) => {
    isErasing = true;
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(x, y);
};

const eraseMove = (x, y) => {
    if (isErasing && isPainting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

const eraseEnd = () => {
    isErasing = false;
    ctx.beginPath();
};

const setBrushCursor = () => {
    canvas.style.cursor = 'url("brush.png"), auto';
}

const setEraserCursor = () => {
    canvas.style.cursor = 'url("eraser.png"), auto';
}

canvas.addEventListener('mousedown', (e) => {
    drawStart(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
});

canvas.addEventListener('mousemove', (e) => {
    drawMove(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
});

canvas.addEventListener('mouseup', () => {
    drawEnd();
});

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX - canvasOffsetX;
    const y = touch.clientY - canvasOffsetY;
    if (isErasing) {
        eraseStart(x, y);
    } else {
        drawStart(x, y);
    }
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX - canvasOffsetX;
    const y = touch.clientY - canvasOffsetY;
    if (isErasing) {
        eraseMove(x, y);
    } else {
        drawMove(x, y);
    }
});

canvas.addEventListener('touchend', () => {
    if (isErasing) {
        eraseEnd();
    } else {
        drawEnd();
    }
});

const startErasing = () => {
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = 'destination-out';
    setEraserCursor();

    canvas.addEventListener('mousemove', eraseMove);
    canvas.addEventListener('mousedown', () => {
        isPainting = true;
    });
    canvas.addEventListener('mouseup', () => {
        isPainting = false;
        eraseEnd();
    });
}
