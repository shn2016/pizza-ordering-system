function main() {
    const toppings = document.querySelectorAll('.toppings .topping');
    toppings.forEach((topping) => {
      topping.onclick = () => {
          selectTopping(topping);
      }
    });
} 

function selectTopping(topping){

    const summaryList = document.querySelector('ul.summary');
    const { name, price } = topping.dataset;
    const total = document.querySelector('.total');
    let { total: totalValue } = total.dataset;

    if ( topping.classList.contains('active')) {
        topping.classList.remove('active');
        totalValue = removeTopping(name,price,summaryList,totalValue);
    }else{
        topping.classList.add('active');
        totalValue = addTopping(name,price,summaryList,totalValue);
    }
    showPrice(total, totalValue);
}

function addTopping(name,price,summaryList,totalValue){
          const li = document.createElement('li');
          li.dataset.name = name;
          const nameSpan = document.createElement('span');
          nameSpan.innerText = name;
          const priceSpan = document.createElement('span');
          priceSpan.innerText = `$${price}`;
          li.append(nameSpan, priceSpan);
          summaryList.append(li);

          totalValue = parseFloat(totalValue) + parseFloat(price);
          return totalValue;
}

function removeTopping(name,price,summaryList,totalValue){
    summaryList.querySelector(`[data-name="${name}"]`).remove();
    totalValue = parseFloat(totalValue) - parseFloat(price);
    return totalValue;
}


function showPrice(total, totalValue){
    total.dataset.total = totalValue;
    total.innerText = `Total: $${parseFloat(totalValue).toFixed(2)}`;
}

  window.addEventListener('DOMContentLoaded', main);