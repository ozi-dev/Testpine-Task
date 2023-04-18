const workspace = document.querySelector('.workspace');
const blockContainer = document.querySelector('.block-container');


function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function createFormElement(blockType) {
    let formElement;

    switch (blockType) {
        case "a":
            formElement = '<input type="text">';
            break;
        case "b":
            formElement = '<input type="text"><br><br><input type="text">';
            break;
        case "c":
            formElement = '<textarea rows="3" cols="10"></textarea>';
            break;
        case "d":
            formElement =
                '<select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>';
            break;
        default:
            formElement = '';
    }

    return formElement;
}

function drop(event) {
    event.preventDefault();

    const id = event.dataTransfer.getData('text/plain');

    const block = document.getElementById(id);

    const newBlock = document.createElement('div');
    newBlock.attributes = block.attributes;
    newBlock.classList.add('block');
    newBlock.textContent = block.textContent;
    newBlock.draggable = true;
    newBlock.addEventListener('dragstart', drag);
    const rect = workspace.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    newBlock.style.position = 'absolute';
    newBlock.style.left = x + 'px';
    newBlock.style.top = (y-15) + 'px';
    newBlock.id = 'block-' + Date.now();
    newBlock.setAttribute('data-type', block.getAttribute('data-type'));

    workspace.appendChild(newBlock);

    const type = newBlock.getAttribute('data-type');

    switch (type) {
        case "a":
            const rowA = document.createElement("button");
            rowA.innerHTML = '<input type="text">';
            newBlock.appendChild(rowA);
            break;

        case "b":
            const rowB = document.createElement("button");
            rowB.innerHTML =
                '<input type="text" ><br><br><input type="text">';
            newBlock.appendChild(rowB);
            break;

        case "c":
            const rowC = document.createElement("button");
            rowC.innerHTML = '<textarea type="text" rows="3" cols="10" >';
            newBlock.appendChild(rowC);
            break;

        case "d":
            const rowD = document.createElement("button");
            rowD.innerHTML = '<select><option> </option><option> </option><option></option></select>';
            newBlock.appendChild(rowD);
            break;
    }


    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        workspace.removeChild(newBlock);
    });

    deleteButton.innerHTML = '   ';

    newBlock.appendChild(deleteButton);
    workspace.removeChild(block);
}

blockContainer.addEventListener('click', (event) => {
    const block = event.target.closest('.block');

    if (!block) return;

    const type = block.getAttribute('data-type');
    const formElement = createFormElement(type);

    if (formElement) {
        const formContainer = document.createElement('div');
        formContainer.innerHTML = formElement;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
            formContainer.remove();
        });

        deleteButton.innerHTML = '   ';

        formContainer.appendChild(deleteButton);
        workspace.appendChild(formContainer);
    }

});