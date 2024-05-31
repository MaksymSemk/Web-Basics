function initFirst3Products(){
    addItem('Potato');
    addItem('WaterMelone');
}
// Function to add a new item to the list
function addItem(prodName) {
    // Create the <li> element
    let newItem = document.createElement('li');
    newItem.classList.add('item');

    // Create the <label> for the item
    let label = document.createElement('label');
    label.classList.add('prodName');
    label.textContent = prodName;

    // Create the section for the buttons
    let centerButtons = document.createElement('section');
    centerButtons.classList.add('center-buttons');

    // Create the minus button
    let minusButton = document.createElement('button');
    minusButton.classList.add('minus-button');
    minusButton.innerHTML = '<span class="front" data-tooltip="Відняти кількість">-</span>';

    // Create the label for the number
    let numberLabel = document.createElement('label');
    numberLabel.classList.add('number');
    numberLabel.innerHTML = '<span class="front">1</span>'; // Example initial number

    // Create the plus button
    let plusButton = document.createElement('button');
    plusButton.classList.add('plus-button');
    plusButton.innerHTML = '<span class="front" data-tooltip="Додати кількість">+</span>';

    // Append buttons to the center buttons section
    centerButtons.appendChild(minusButton);
    centerButtons.appendChild(numberLabel);
    centerButtons.appendChild(plusButton);

    // Create the section for the right buttons
    let rightButtons = document.createElement('section');
    rightButtons.classList.add('buttons-right');

    // Create the presence button
    let presenceButton = document.createElement('button');
    presenceButton.classList.add('presence-button');
    presenceButton.innerHTML = '<span class="front" data-tooltip="Стан товару">Куплено</span>';

    // Create the cancel button
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerHTML = '<span class="front" data-tooltip="Прибрати товар">x</span>';

    // Append buttons to the right buttons section
    rightButtons.appendChild(presenceButton);
    rightButtons.appendChild(cancelButton);

    // Append label and sections to the new item
    newItem.appendChild(label);
    newItem.appendChild(centerButtons);
    newItem.appendChild(rightButtons);

    // Append the new item to the items list
    let listOFProducts =document.getElementById('cart-list')
    listOFProducts.appendChild(newItem);
    update();
    
}
initFirst3Products();

function addNewItem(){
    
    let inputText = document.querySelector('.add-good-name').value;
    // Example usage: Add item with input text
    if (inputText != '') {
        addItem(inputText);
        
    }

    // Clear the input field
    document.querySelector('.add-good-name').value='';

}
function delItem(){
    let clickedButton = this;
    let parentElement = clickedButton.parentElement;
    let grandparentElement = parentElement.parentElement;
    if (grandparentElement) {
        grandparentElement.remove();
   }

}
function editItem(){
    let prodToEdit=this
    let input = document.createElement('input');
    // Transfer necessary attributes and content from the label to the input
    input.type = 'text';
    input.value = prodToEdit.innerHTML; // Set the input value to the label's text
    
    // Optionally, you can transfer other attributes or set new ones
    input.className = 'edit-item'; // Copy the class name, if any

    // Replace the label with the input in the DOM
    prodToEdit.parentNode.replaceChild(input, prodToEdit);
    // Focus the input for immediate editing
    input.focus();

    // Handle input blur event to save changes
    input.addEventListener('blur', function() {
        // Create a new label element
        let newLabel = document.createElement('label');
        newLabel.textContent = input.value;
        newLabel.className = 'prodName'; // Keep the class name for styling

        // Replace the input with the new label
        input.parentNode.replaceChild(newLabel, input);
        update();
    });
}
function update(){
    document.querySelector('.add-good-button').addEventListener('click', addNewItem);
    const cancelButtons = document.querySelectorAll('.cancel-button');
    cancelButtons.forEach(cancelButton => {
        cancelButton.addEventListener('click', delItem);
    });
    const editProds = document.querySelectorAll('.prodName');
    editProds.forEach(editProd => {
        editProd.addEventListener('click', editItem);
    });
}



