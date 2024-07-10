let arObject = document.getElementById('arObject');
const codeEditor = document.getElementById('codeEditor');
const sideMenu = document.getElementById('sideMenu');

function changeObjectType() {
    const objectType = document.getElementById('objectType').value;
    const newObject = document.createElement(`a-${objectType}`);

    newObject.setAttribute('id', 'arObject');
    newObject.setAttribute('position', '0 0.5 0');
    newObject.setAttribute('scale', '1 1 1');
    newObject.setAttribute('material', 'color: #4B0082');

    arObject.parentNode.replaceChild(newObject, arObject);

    arObject = newObject;

    document.getElementById('color').value = '#4B0082';
    document.getElementById('scale').value = '1';
    document.getElementById('posX').value = '0';
    document.getElementById('posY').value = '0.5';
    document.getElementById('posZ').value = '0';

    updateCodeEditor();
}

function applyChanges() {
    const color = document.getElementById('color').value;
    const scale = document.getElementById('scale').value;
    const posX = document.getElementById('posX').value;
    const posY = document.getElementById('posY').value;
    const posZ = document.getElementById('posZ').value;

    arObject.setAttribute('material', 'color', color);
    arObject.setAttribute('scale', `${scale} ${scale} ${scale}`);
    arObject.setAttribute('position', `${posX} ${posY} ${posZ}`);

    updateCodeEditor();
}

function toggleSideMenu() {
    sideMenu.style.right = sideMenu.style.right === '0px' ? '-300px' : '0px';
    if (sideMenu.style.right === '0px') updateCodeEditor();
}

function updateCodeEditor() {
    codeEditor.value = arObject.outerHTML;
}

function applyCodeChanges() {
    const newElement = new DOMParser().parseFromString(codeEditor.value, 'text/html').body.firstElementChild;
    if (newElement) {
        arObject.parentNode.replaceChild(newElement, arObject);
        arObject = newElement;
        updateUIControls();
    } else {
        alert('Invalid A-Frame entity. Please provide a valid element.');
    }
}

function updateUIControls() {
    const objectType = arObject.tagName.toLowerCase().replace('a-', '');
    document.getElementById('objectType').value = objectType;

    const material = arObject.getAttribute('material');
    document.getElementById('color').value = material.color;
    const [scaleX] = arObject.getAttribute('scale').split(' ');
    document.getElementById('scale').value = scaleX;
    const [posX, posY, posZ] = arObject.getAttribute('position').split(' ');
    document.getElementById('posX').value = posX;
    document.getElementById('posY').value = posY;
    document.getElementById('posZ').value = posZ;
}

document.addEventListener('DOMContentLoaded', function () {
    const interfaceElement = document.getElementById('interface');
    interfaceElement.addEventListener('touchstart', function (e) {
        e.stopPropagation();
    });
    sideMenu.addEventListener('touchstart', function (e) {
        e.stopPropagation();
    });
});