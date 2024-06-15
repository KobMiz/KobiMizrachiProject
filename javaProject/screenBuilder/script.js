const page = document.querySelector("#page");
let type, params;

restorePage();

const elementSelect = {
    title: [
        'headerType',
        'color',
        'content',
        'alignment'
    ],
    p: [
        'fontSize',
        'color',
        'content',
        'alignment'
    ],
    input: [
        'inputType',
        'fontSize',
        'color',
        'content',
        'backgroundColor',
        'alignment'
    ],
    button: [
        'fontSize',
        'color',
        'content',
        'backgroundColor',
        'alignment'
    ],
    img: [
        'imageUrl',
        'altText',
        'width',
        'height',
    ],
    a: [
        'href',
        'text',
        'color',
        'fontSize',
    ]
};

function bgChange(elem) {
    page.style.backgroundColor = elem.value;
    savePage();
}

function paddingChange(elem) {
    page.style.padding = elem.value + 'px';
    savePage();
}

function changePageSize(elem) {
    page.style.width = elem.value + 'px';
    savePage();
}

function changePageHeight(elem) {
    page.style.height = elem.value + 'px';
    savePage();
}

function pageToShow(id, elem) {
    document.querySelector('nav a.active').classList.remove('active');
    elem.classList.add('active');

    document.querySelector('#panelSide>div.show').classList.remove('show');
    document.getElementById(id).classList.add('show');
}

function typeSelect(selectElem) {
    type = selectElem.value;
    params = elementSelect[type];

    const divs = document.querySelectorAll('#params>div');

    for (const div of divs) {
        div.classList.remove('show');
    }

    for (const param of params) {
        document.getElementById(param).classList.add('show');
    }
}

function getInputValues(type) {
    const params = {
        inputType: document.querySelector('#inputType select').value,
        fontSize: document.querySelector('#fontSize input').value,
        color: document.querySelector('#color input').value,
        backgroundColor: document.querySelector('#backgroundColor input').value,
        content: document.querySelector('#content input').value,
        imageUrl: document.querySelector('#imageUrl input').value,
        altText: document.querySelector('#altText input').value,
        width: document.querySelector('#width input').value,
        height: document.querySelector('#height input').value,
        href: document.querySelector('#linkURL').value,
        text: document.querySelector('#text input').value,
        alignment: document.querySelector('#alignmentSelect').value 
    };

    const inputValues = {};

    for (const key in params) {
        if (elementSelect[type].includes(key)) {
            inputValues[key] = params[key];
        }
    }

    return inputValues;
}

function add() {
    let tagName = type;

    if (type === 'title') {
        tagName = document.querySelector('#headerType select').value;
    }

    const elem = document.createElement(tagName);

    const inputValues = getInputValues(type);

    for (const key in inputValues) {
        switch (key) {
            case 'inputType':
                elem.type = inputValues[key];
                break;
            case 'fontSize':
                elem.style.fontSize = inputValues[key] + 'px';
                break;
            case 'color':
                elem.style.color = inputValues[key];
                break;
            case 'content':
                elem[type === 'input' ? 'value' : 'innerHTML'] = inputValues[key];
                break;
            case 'imageUrl':
                elem.src = inputValues[key];
                break;
            case 'altText':
                elem.alt = inputValues[key];
                break;
            case 'width':
                elem.width = inputValues[key];
                break;
            case 'height':
                elem.height = inputValues[key];
                break;
            case 'href':
                elem.href = inputValues[key];
                break;
            case 'text':
                elem.innerText = inputValues[key];
                break;
            case 'backgroundColor':
                elem.style.backgroundColor = inputValues[key];
                break;
            case 'alignment': 
                elem.style.textAlign = inputValues[key];
                break;
            default:
                break;
        }
    }

    if (type === 'a') {
        elem.innerText = inputValues.text;
        elem.href = inputValues.href || '#';
        elem.setAttribute('target', '_blank');
        elem.onclick = function () { window.open(elem.href); };
    }

    page.appendChild(elem);
    savePage();
}

function savePage() {
    localStorage.style = page.attributes.style?.value;
    localStorage.page = page.innerHTML;
}

function restorePage() {
    page.innerHTML = localStorage.page || '';
    page.setAttribute('style', localStorage.style || '');
}

function resetPage() {
    if (confirm("האם אתה בטוח שברצונך לאפס את הדף?")) {
        page.innerHTML = '';
        page.removeAttribute('style');
        localStorage.clear();
    }
}

page.addEventListener('input', savePage);
