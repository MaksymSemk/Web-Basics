let productData = {
    number: 1,
    isBought: false
};
function initFirst3Products(){
    for (let i = 0; i < localStorage.length; i++) {
        let prodName = localStorage.key(i); // Get the key at index i
        let prodData = JSON.parse(localStorage.getItem(prodName)); // Get the corresponding value

        addItem(prodName, parseInt(prodData.number), prodData.isBought);
    }
    update();
}
// Function to add a new item to the list
function addItem(prodName, number, isBought) {
    let prodNames=document.querySelectorAll('.prodName');
    let isPresentName=false;
    prodNames.forEach(name=>{   
            if(name.textContent.toLowerCase() === prodName.toLowerCase()){
                isPresentName=true;
            }
        });
    if(!isPresentName){
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
    if(number===1){minusButton.classList.add('disabled-minus-button');}
    else{minusButton.classList.add('minus-button');}
    minusButton.innerHTML = '<span class="front" data-tooltip="Відняти кількість">-</span>';

    // Create the label for the number
    let numberLabel = document.createElement('label');
    numberLabel.classList.add('number');
    let numberSpan=document.createElement('span')
    numberSpan.classList.add('front')

    numberSpan.innerHTML = number; // Example initial number
        numberLabel.appendChild(numberSpan);
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
    if(isBought){
        let products= document.getElementsByClassName('prodName');
        Array.prototype.forEach.call(products, function(product) {
            if(product.innerHTML===prodName){
                let initButton=product.parentElement.querySelector('.presence-button');
                let event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                // Dispatch the event
                initButton.dispatchEvent(event);
            }
        });
        
    }
    }
}
initFirst3Products();

function addNewItem(){
    
    let inputText = document.querySelector('.add-good-name').value;
    // Example usage: Add item with input text
    if (inputText != '') {
        addItem(inputText,1, false);
        
    }

    // Clear the input field
    document.querySelector('.add-good-name').value='';

}
function delItem(){
    let clickedButton = this;
    let parentElement = clickedButton.parentElement;
    let grandparentElement = parentElement.parentElement;
    if (grandparentElement) {
        let product= grandparentElement.querySelector('.prodName');
        localStorage.removeItem(product.textContent);
        grandparentElement.remove();
   }
   update();

}
function editItem(){
    let prodToEdit=this
    if(this.id!=='bought-prod-name'){
    let value=prodToEdit.textContent;
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
        if (input.value.trim() === "") {
            // If the input is empty, revert back to the original label
            input.parentNode.replaceChild(prodToEdit, input);
        } else {
            // Create a new label element
        let newLabel = document.createElement('label');
        newLabel.textContent = input.value;
        newLabel.className = 'prodName'; // Keep the class name for styling
        
        // Replace the input with the new label
        input.parentNode.replaceChild(newLabel, input);
        let prodData=JSON.parse(localStorage.getItem(value));
        localStorage.removeItem(value);
        localStorage.setItem(newLabel.textContent, JSON.stringify(prodData));
        update();
        }
    });
}
}
function incQuantity(){
    let centerbuttons= this.parentElement;
    let number= centerbuttons.querySelector('.number .front').innerHTML;
    if(number==1){
        let minusButton = document.createElement('button');
        minusButton.classList.add('minus-button');
        minusButton.innerHTML = '<span class="front" data-tooltip="Відняти кількість">-</span>';
        let disabledButton=centerbuttons.querySelector('.disabled-minus-button');
        disabledButton.parentNode.replaceChild(minusButton, disabledButton)
    }
    number++;
    centerbuttons.querySelector('.number .front').innerHTML=number;
    update();
}
function decQuantity(){
    let centerbuttons= this.parentElement;
    let number= centerbuttons.querySelector('.number .front').innerHTML;
    if(number==2){
        let disabledButton = document.createElement('button');
        disabledButton.classList.add('disabled-minus-button');
        disabledButton.innerHTML = '<span class="front" data-tooltip="Відняти кількість">-</span>';
        let minusButton=centerbuttons.querySelector('.minus-button');
        minusButton.parentNode.replaceChild( disabledButton, minusButton)
    }
    number--;
    centerbuttons.querySelector('.number .front').innerHTML=number;
    update();
}
function buyBackProd(){
    let presenceButton=this;
    
    let buttonsRightOld=this.parentElement;
    let item=buttonsRightOld.parentElement;

    if(presenceButton.firstElementChild.innerHTML==='Куплено'){
        item.querySelector('.prodName').style.textDecoration = 'line-through';

        // Create the section for the right buttons
    let rightButtons = document.createElement('section');
    rightButtons.classList.add('buttons-right');

    // Create the presence button
    let presenceButton = document.createElement('button');
    presenceButton.classList.add('presence-button');
    presenceButton.innerHTML = '<span class="front" data-tooltip="Стан товару">Не куплено</span>';

    // Create the cancel button
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerHTML = '<span class="front" data-tooltip="Прибрати товар">x</span>';

    // Append buttons to the right buttons section
    rightButtons.appendChild(cancelButton);
    rightButtons.appendChild(presenceButton);
        item.replaceChild(rightButtons, buttonsRightOld);
        let allButtons=item.querySelectorAll('button')
        allButtons.forEach(button=>{
            button.id='bought-prod'; 
        })  
        item.querySelector('.presence-button').id='';  
        item.querySelector('.prodName').id='bought-prod-name';

    }
    else{
        item.querySelector('.prodName').style.textDecoration = 'none';

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
        item.replaceChild(rightButtons, buttonsRightOld);
        let allButtons=item.querySelectorAll('button')
        allButtons.forEach(button=>{
            button.id=''; 
        })  
        item.querySelector('.prodName').id='';

    }
    update();

}
function updateStats(){
    let leftProducts=document.createElement('li');
    leftProducts.className='left-products';
    let boughtProducts=document.createElement('li');
    boughtProducts.className='bought-products';
    let allProds=document.querySelectorAll('.prodName');
    allProds.forEach(product=>addToStats(product, leftProducts, boughtProducts));
    let stats = document.querySelector('.stats ul');
    let oldLeftProducts = stats.querySelector('.left-products');
    let oldBoughtProducts = stats.querySelector('.bought-products');

    stats.replaceChild(leftProducts, oldLeftProducts);
    stats.replaceChild(boughtProducts, oldBoughtProducts);

}
function addToStats(product, leftProducts, boughtProducts){
    // Create the outer span element with class 'product-item'
    let productItem = document.createElement('span');
    productItem.classList.add('product-item');

    // Create the text node for the product name
    let productName = document.createTextNode(product.innerHTML);
    productItem.appendChild(productName); // Append the text node to the span

    // Create the inner span element with class 'amount'
    let amountSpan = document.createElement('span');
    amountSpan.classList.add('amount');
    amountSpan.textContent = product.parentElement.querySelector('.number .front').innerHTML; // Set the text content of the amount span

    // Append the inner span to the outer span
    productItem.appendChild(amountSpan);

    if(product.id===''){
        //add to leftProds
        leftProducts.appendChild(productItem);
    }
    else{
        //add to boughtProds
        boughtProducts.appendChild(productItem);

    }
}
function updateStorage(){
    let allProds=document.querySelectorAll('.prodName');
   // product.parentElement.querySelector('.number .front').innerHTML;
   allProds.forEach(product=>{
        let name=product.innerHTML;
        let number=product.parentElement.querySelector('.number .front').innerHTML;
        let isBought=false;
        if(product.parentElement.querySelector('.presence-button').firstElementChild.innerHTML==='Не куплено'){
            isBought=true;
        }
        productData.number=number;
        productData.isBought=isBought;
        localStorage.setItem(name, JSON.stringify(productData));
   });  
}
function update(){
    updateStats();
    updateStorage();
    document.querySelector('.add-good-button').addEventListener('click', addNewItem);
    document.querySelector('.add-good-name').addEventListener('keydown', function(event){
        if (event.keyCode === 13 || event.key === "Enter") {
            addNewItem();
        }
    });
    const cancelButtons = document.querySelectorAll('.cancel-button');
    cancelButtons.forEach(cancelButton => {
        cancelButton.addEventListener('click', delItem);
    });
    const editProds = document.querySelectorAll('.prodName');
    editProds.forEach(editProd => {
        editProd.addEventListener('click', editItem);
    });
    const plusButtons = document.querySelectorAll('.plus-button');
    plusButtons.forEach(button => {
        button.addEventListener('click', incQuantity);
    });
    const minusButtons = document.querySelectorAll('.minus-button');
    minusButtons.forEach(button => {
        button.addEventListener('click', decQuantity);
    });
    const buyButtons = document.querySelectorAll('.presence-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', buyBackProd);
    });

}