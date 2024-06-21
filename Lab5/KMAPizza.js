
const pizzasInCart=[];
function initPizzas(pizzas){
// Читання JSON файлу
/*fs.readFile('pizzas.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const pizzas = JSON.parse(data);
*/ 
//init pizza info
pizzas.forEach((item, index) => {
    pizza_info[index] = item;
  });
  let span=document.querySelector('.numberOfPizzas');
    span.innerHTML=pizzas.length;
    // Вивід списку піц
    pizzas.forEach(pizza => {
        addPizzaToGrid(pizza);
    });

}

function addPizzaToGrid(pizza){
    const productsSection = document.querySelector('.products');

        const itemSection = document.createElement('section');
        itemSection.classList.add('item');

        let dataTip = '';

        if (pizza.is_new) {
            dataTip += '<span class="newPizza">Нова</span>';
        }

        if (pizza.is_popular) {
            dataTip += '<span class="popularPizza">Популярна</span>';
        }

        // Create a div element to contain the generated spans
        const dataTipsDiv = document.createElement('div');
        dataTipsDiv.classList.add('data-tips');
        dataTipsDiv.innerHTML = dataTip;

        // Append the div to your itemSection
        itemSection.appendChild(dataTipsDiv);

        const pizzaImage = document.createElement('img');
        pizzaImage.src =pizza.icon;
        pizzaImage.alt = 'item photo';
        itemSection.appendChild(pizzaImage);

        const descriptionSection = document.createElement('section');
        descriptionSection.classList.add('itemDescription');

        const itemName = document.createElement('label');
        itemName.classList.add('itemName');
        itemName.textContent = pizza.title;
        descriptionSection.appendChild(itemName);

        const itemType = document.createElement('label');
        itemType.classList.add('itemType');
        itemType.textContent = pizza.type;
        descriptionSection.appendChild(itemType);

        const itemContent = document.createElement('label');
        itemContent.classList.add('itemContent');
        const contentArray = [
            ...pizza.content.meat || [],
            ...pizza.content.chicken || [],
            ...pizza.content.cheese || [],
            ...pizza.content.pineapple || [],
            ...pizza.content.mushroom || [],
            ...pizza.content.tomato || [],
            ...pizza.content.additional || []
        ];
        itemContent.textContent = contentArray.join(', ');
        descriptionSection.appendChild(itemContent);

        itemSection.appendChild(descriptionSection);

        const priceSection = document.createElement('section');
        priceSection.classList.add('itemPrice');
        
        if(!pizza.small_size || !pizza.big_size){
            priceSection.setAttribute('data-prices','one');
        }

        if (pizza.small_size) {
            const smallPriceSection = createPriceSection(pizza.small_size,pizza);
            priceSection.appendChild(smallPriceSection);
        }

        if (pizza.big_size) {
            const bigPriceSection = createPriceSection(pizza.big_size,pizza);
            priceSection.appendChild(bigPriceSection);
        }

        itemSection.appendChild(priceSection);
        productsSection.appendChild(itemSection);

}

function createPriceSection(size, pizza) {
    const onePriceSection = document.createElement('section');
    onePriceSection.classList.add('onePrice');

    const sizeSection = document.createElement('section');
    sizeSection.classList.add('size');
    const sizeIcon = document.createElement('div');
    sizeIcon.classList.add('size-svg');
    const sizeImg = document.createElement('img');
    sizeImg.src = 'assets/images/size-icon.svg';
    sizeImg.alt = 'item size';
    sizeIcon.appendChild(sizeImg);
    sizeSection.appendChild(sizeIcon);
    const sizeSpan = document.createElement('span');
    sizeSpan.textContent = size.size;
    sizeSection.appendChild(sizeSpan);
    onePriceSection.appendChild(sizeSection);

    const weightSection = document.createElement('section');
    weightSection.classList.add('weight');
    const weightIcon = document.createElement('div');
    weightIcon.classList.add('weight-svg');
    const weightImg = document.createElement('img');
    weightImg.src = 'assets/images/weight.svg';
    weightImg.alt = 'item weight';
    weightIcon.appendChild(weightImg);
    weightSection.appendChild(weightIcon);
    const weightSpan = document.createElement('span');
    weightSpan.textContent = size.weight;
    weightSection.appendChild(weightSpan);
    onePriceSection.appendChild(weightSection);

    const priceSection = document.createElement('section');
    priceSection.classList.add('price');
    const priceLabel = document.createElement('label');
    priceLabel.textContent = size.price;
    priceSection.appendChild(priceLabel);
    const currencyLabel = document.createElement('label');
    currencyLabel.textContent = 'грн.';
    priceSection.appendChild(currencyLabel);
    onePriceSection.appendChild(priceSection);

    const buyButton = document.createElement('button');
    let pizzaSize;
    if(pizza.small_size && (pizza.small_size.size===size.size)){
        pizzaSize = 'Мала';
    }
    else{
        pizzaSize='Велика';
    }
    buyButton.setAttribute('data-pizzaname', pizza.title);
    buyButton.setAttribute('data-pizzasize', pizzaSize);
    buyButton.classList.add('buyItem');
    buyButton.textContent = 'Купити';
    buyButton.addEventListener('click',  () => addToCart(size,pizza));
    onePriceSection.appendChild(buyButton);
    return onePriceSection;
}



function addToCart(paramSize,pizza){
  
    let size=event.target.dataset.pizzasize;
    let pizza2=findPizzaByName(pizza.title+'('+size+')');
    if(pizza2!=undefined){     
        pizza=pizza2;
        let amount= pizza.amount;
        amount++;
        pizza.amount=amount;
        pizza.sum=amount*pizza.price;
        let collectionOFPizzas=document.getElementsByClassName('boughtitemName');
        for(let i=0; i<collectionOFPizzas.length;i++){
            if(collectionOFPizzas[i].textContent+collectionOFPizzas[i].parentElement.querySelector('.boughtitemSize').textContent===pizza.name){
                let sumBtms=collectionOFPizzas[i].parentElement.parentElement.querySelector('.sumAndButtons');
                let btn=sumBtms.querySelector('.plus');
                let event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                btn.dispatchEvent(event);
                updateGeneralSum();
                updateLocalStorage();
                return;
            }
        }
    }
    

    let imageUrl = pizza.icon;
    let productName = pizza.title;
    let weight=paramSize.weight;
    let price = paramSize.price;
    let amount = 1;
        let onePizza={
            name:pizza.title+'('+size +')',
            amount:1,
            price:price,
            weight: paramSize.weight,
            size:paramSize.size,
            sum:paramSize.price
        }
        pizza=onePizza;
        pizzasInCart.push(onePizza);
    let li = document.querySelector('.boughtProds ul');



    let liItem = document.createElement('li');
    liItem.classList.add('boughtItem');

    let sectionItemInfo = document.createElement('section');
    sectionItemInfo.classList.add('boughtItemInfo');

    let divInfo = document.createElement('div');

    let spanName = document.createElement('span');
    spanName.classList.add('boughtitemName');
    spanName.textContent = productName;

    let spanSize = document.createElement('span');
    spanSize.classList.add('boughtitemSize');
    spanSize.textContent = '(' + size + ')';

    divInfo.appendChild(spanName);
    divInfo.appendChild(spanSize);

    sectionItemInfo.appendChild(divInfo);

    let sectionItemChar = document.createElement('section');
    sectionItemChar.classList.add('boughtitemCharacteristics');

    let sectionSize = document.createElement('section');
    sectionSize.classList.add('size');

    let divSizeSvg = document.createElement('div');
    divSizeSvg.classList.add('size-svg');

    let imgSize = document.createElement('img');
    imgSize.src = 'assets/images/size-icon.svg';
    imgSize.alt = 'item size';

    divSizeSvg.appendChild(imgSize);
    sectionSize.appendChild(divSizeSvg);

    let spanSizeValue = document.createElement('span');
    spanSizeValue.textContent = paramSize.size; 

    sectionSize.appendChild(spanSizeValue);

    let sectionWeight = document.createElement('section');
    sectionWeight.classList.add('weight');

    let divWeightSvg = document.createElement('div');
    divWeightSvg.classList.add('weight-svg');

    let imgWeight = document.createElement('img');
    imgWeight.src = 'assets/images/weight.svg';
    imgWeight.alt = 'item weight';

    divWeightSvg.appendChild(imgWeight);
    sectionWeight.appendChild(divWeightSvg);

    let spanWeightValue = document.createElement('span');
    spanWeightValue.textContent = weight;

    sectionWeight.appendChild(spanWeightValue);

    sectionItemChar.appendChild(sectionSize);
    sectionItemChar.appendChild(sectionWeight);

    let sectionSumAndButtons = document.createElement('section');
    sectionSumAndButtons.classList.add('sumAndButtons');

    let spanSum = document.createElement('span');
    spanSum.classList.add('boughtsum');
    spanSum.textContent = price + ' грн';

    let spanAmount = document.createElement('span');
    spanAmount.classList.add('boughtAmount');
    spanAmount.textContent = amount;

    let btnMinus = document.createElement('button');
    btnMinus.classList.add('minus');
    btnMinus.textContent = '-';
    let newNumber=amount-1;
    btnMinus.addEventListener('click',  () => changeAmount());

   

    let btnPlus = document.createElement('button');
    btnPlus.classList.add('plus');
    btnPlus.textContent = '+';
    newNumber+=2;
    btnPlus.addEventListener('click',  () => changeAmount());

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.textContent = 'x';
    btnDelete.addEventListener('click',  () => delPizza());

    sectionSumAndButtons.appendChild(spanSum);
    sectionSumAndButtons.appendChild(btnMinus);
    sectionSumAndButtons.appendChild(spanAmount);
    sectionSumAndButtons.appendChild(btnPlus);
    sectionSumAndButtons.appendChild(btnDelete);

    sectionItemInfo.appendChild(sectionItemChar);
    sectionItemInfo.appendChild(sectionSumAndButtons);
    liItem.appendChild(sectionItemInfo);
  

    let imgItem = document.createElement('img');
    imgItem.classList.add('itemImage');
    imgItem.src = imageUrl;
    imgItem.alt = 'item photo';

    liItem.appendChild(imgItem);


    li.appendChild(liItem);

    updateGeneralSum();
    updateLocalStorage();

}
// Function to find pizza objects by name using filter
function findPizzaByName(name) {
    let pizzaRet;
    pizzasInCart.forEach(pizza => {
        if(pizza.name === name){
            pizzaRet=pizza;
        }}
    );
    return pizzaRet;
}

/*function findPizzaByName(name) {
    return pizzasInCart.find(pizza => pizza.name === name);
}

function getPizzasAmount(size, pizza) {
    return pizza.small_size.size === size.size ? pizza.small_size.amount : pizza.big_size.amount;
}

function setPizzaAmount(size, pizzaSize) {
    return pizzaSize.size === size.size ? 1 : 0;
}*/
function changeAmount(){
    let button=event.target;
    let sumAndButtons=button.parentElement;
    let spanSum=sumAndButtons.querySelector('.boughtsum');
    let spanAmount=sumAndButtons.querySelector('.boughtAmount');
    let oldAmount=spanAmount.textContent;
    let price=spanSum.textContent.replace(' грн', '')/oldAmount;
    let pizzaLabel=sumAndButtons.parentElement.querySelector('.boughtitemName');
    let pizzaSize=sumAndButtons.parentElement.querySelector('.boughtitemSize');
    let pizza=findPizzaByName(pizzaLabel.innerHTML+pizzaSize.innerHTML);
    if(button.classList=='plus'){
        oldAmount++;
    }
    else{
        oldAmount--;
    }
    let newNumber=oldAmount;
    if(newNumber>0){
    /*let newSpanAmount = document.createElement('span');
    newSpanAmount.classList.add('spanAmount');
    newSpanAmount.textContent = newNumber;

    

    let newSpanSum = document.createElement('span');
    newSpanSum.classList.add('boughtsum');
    newSpanSum.textContent =  price* newNumber + ' грн'; // Assuming this is the format

    sumAndButtons.replaceChild(newSpanAmount,  spanAmount);
    sumAndButtons.replaceChild(newSpanSum, spanSum)*/
     // Update the existing span elements
     spanAmount.textContent = newNumber;
     spanSum.textContent = price * newNumber + ' грн';

    
    let newArray= pizzasInCart.filter(item => item.name !== pizza.name);

    pizza.amount=newNumber;
    pizza.sum=pizza.amount*pizza.price;
    newArray.push(pizza);
    pizzasInCart.length=0;
    newArray.forEach((item, index) => {
        pizzasInCart[index] = item;
      });
      updateGeneralSum();
      updateLocalStorage();

    }
    else{
        
        let elementToDelete = spanAmount.parentElement.parentElement.parentElement;
        let parentElement=elementToDelete.parentElement;

        parentElement.removeChild(elementToDelete);
        let newArray= pizzasInCart.filter(item => item.name !== pizza.name);
        pizzasInCart.length=0;
    newArray.forEach((item, index) => {
        pizzasInCart[index] = item;
      });
        updateGeneralSum();
        updateLocalStorage();

        }
}
document.addEventListener('DOMContentLoaded', () => {
    initPizzas(pizza_info); 
    document.querySelector('.clearCart').addEventListener('click',  delAllProds);
    
    Array.from(document.querySelector('.filters').children).forEach(filter => {
        filter.addEventListener('click', filterPizzas);
    });
    setCart();
    document.querySelector('.reportButton').addEventListener('click',  openReport);

});
function openReport(){
    const url = 'report.html'; 

    window.open(url, '_blank');
}

function setCart(){
    pizzasInCart.length=0;
    let localPizzas=[];
    for (let i = 0; i < localStorage.length; i++) {
        let prodName = localStorage.key(i); 
        let prodData = JSON.parse(localStorage.getItem(prodName));
        localPizzas.push(prodData);
    }
    for(let i=0;i<localPizzas.length;i++){
        let prodData=localPizzas[i];
        let pizzaName = prodData.name.split('(')[0].trim();
        let pizzaSize = prodData.name.split('(')[1].replace(')', '').trim();

        let pizzaCell = Array.from(document.querySelectorAll('.item'))
            .filter(item => item.querySelector('.itemName').textContent === pizzaName);

            if (pizzaCell.length > 0) {
                let button = Array.from(pizzaCell[0].querySelectorAll('.onePrice'))
                    .filter(onePrice => onePrice.querySelector('button').dataset.pizzasize === pizzaSize);
                
                if (button.length > 0) {
                    let event = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    for(let j = 0; j < prodData.amount; j++) {
                        button[0].querySelector('.buyItem').dispatchEvent(event);            
                    }   
                }
            }
    }
}
function delPizza(){
    let button=event.target;
    let sumAndButtons=button.parentElement;
    let pizzaLabel=sumAndButtons.parentElement.querySelector('.boughtitemName');
    let pizzaSize=sumAndButtons.parentElement.querySelector('.boughtitemSize');
    let pizza=findPizzaByName(pizzaLabel.innerHTML+pizzaSize.innerHTML);




    let li=event.target.parentElement.parentElement.parentElement;
    let parentElement=li.parentElement;

    parentElement.removeChild(li);
        let newArray= pizzasInCart.filter(item => item.name !== pizza.name);
        pizzasInCart.length=0;
        newArray.forEach((item, index) => {
            pizzasInCart[index] = item;
          });
          updateGeneralSum();
          updateLocalStorage();


}
function setPizzaAmount(size,pizzaSize){
    if(pizzaSize.size===size.size){
        return 1
    }
    else{
        return 0;
    }
}
function     updateGeneralSum(){
    let listOfSumOfBoughtItems=document.getElementsByClassName('boughtsum');

    let genSum=0;
    for(let i=0;i<listOfSumOfBoughtItems.length;i++){
        genSum+=parseInt(listOfSumOfBoughtItems[i].textContent);
    }
    document.querySelector('.numberProds').textContent=listOfSumOfBoughtItems.length;

    document.querySelector('.finalSum .sum').textContent=genSum+ ' грн';
}
function delAllProds(){
    let listOfSumOfBoughtItems=document.getElementsByClassName('boughtItem');
    if(listOfSumOfBoughtItems.length>0){
        let parentElement=listOfSumOfBoughtItems[0].parentElement;
        for(let i=0;i<listOfSumOfBoughtItems.length;i++){
            parentElement.remove(listOfSumOfBoughtItems[i]);
        }
        pizzasInCart.length=0;
        updateGeneralSum();
        updateLocalStorage();

    }
}
function filterPizzas(){
    let pizzaType=this.textContent;
    switch (pizzaType) {
        case "Усі":
            showPizzas();
            break;
        case "М'ясні":
            showPizzas('М’ясна піца');
            break;
        case "З ананасами":
            showPizzas('Піца з ананасами');
            break;
        case "З грибами":
            showPizzas('Грибна піца');
            break;
        case "З морепродуктами":
            showPizzas('Морська піца');
            break;
        case "Вега":
            showPizzas('Вега піца');
            break;
        default:
            console.log("Unknown pizza type.");
            break;
    }
}
function showPizzas(pizzaType){
    const productsSection = document.querySelector('.products');
    productsSection.innerHTML='';
    let pizzas=[];
    pizza_info.forEach((item, index) => {
        pizzas[index] = item;
      });
    if(pizzaType){
       
    pizzas.filter(pizza=> pizza.type===pizzaType).forEach(pizza => {
        addPizzaToGrid(pizza);
    });
    let span=document.querySelector('.numberOfPizzas');
    span.innerHTML=pizzas.length;

    }
    else{

        pizzas.forEach(pizza => {
        addPizzaToGrid(pizza);
    });
    }
    
}
function updateLocalStorage(){
    localStorage.clear();
    for(let i=0; i<pizzasInCart.length;i++){
        localStorage.setItem(pizzasInCart[i].name, JSON.stringify(pizzasInCart[i]));
    }
   // saveJSONToFile();
}

function saveJSONToFile() {
    let filename= "PizzasInCart"
    let jsonData = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i); 
        let value = JSON.parse(localStorage.getItem(key)); 
        data.push({ key: key, value: value });
    }
    
    let jsonString = JSON.stringify(jsonData, null, 2);

    let blob = new Blob([jsonString], { type: 'application/json' });

    let link = document.createElement('a');

    link.download = filename;

    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
