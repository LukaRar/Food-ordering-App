import { menuArray } from './data.js'

let master = document.getElementById('master')
let overlay = document.querySelector('.popup-overlay')
let payBtn = document.querySelector('.pay-btn')
const myForm = document.getElementById("myForm");
let input1 = document.getElementById('input1')
let input2 = document.getElementById('input2')
let input3 = document.getElementById('input3')
let main = document.querySelector('.main')




let cartArray = []
document.addEventListener("click", function (e) {
    
    
    if (e.target.dataset.cart) {
        addToCart(e.target.dataset.cart)
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    if (e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    }
    if (e.target.dataset.btn) {
        console.log('btn')
        overlay.style.display = 'block';
    }
    })

    payBtn.addEventListener("click", function (event) {

        let name = input1.value
    
        if (!myForm.checkValidity()) {
            event.preventDefault();
            return;
        }
    
    
    
        overlay.style.display = 'none';
        input1.value = ""
        input2.value = ""
        input3.value = ""
        cartArray = []
        render()
        main.innerHTML += ` <div class="end-msg">
                                  <h1>Thank you for ordering ${name}</h1>
                            </div>`
    })

    function addToCart(orderId) {
        
        
        menuArray.forEach(function (food) {
            if (food.id == orderId) {
                cartArray.push([food.name, food.price])
                console.log(cartArray)
            }
        })
        render()
        return master
    }

    function removeFromCart(ele) {
        const index = cartArray.findIndex(([name, price]) => name === ele.slice(0, -3) && price === parseInt(ele.slice(-2)));
        console.log(index)
        if (index != -1) {
            cartArray.splice(index, 1)
        }
    
        render()
    }




function getFeedHtml(){
    let feedHtml = ``
    
    menuArray.forEach(function(menu){
        feedHtml += `
            <div class='main-div'>
                    <p class='emoji'>${menu.emoji}</p>
                    <div class='menu-items'>
                    <div>
                    <p>${menu.name}</p>
                    <p>${menu.ingredients}</p>
                    <p>${menu.price}</p>
                    </div>
                    <div class="sec">
                    <i class="fa-solid fa-cart-plus" data-cart='${menu.id}'></i>
                    </div>
                    </div>
                    
                    
                    </div>
                    <div class="item-border"></div>
                    `
                    
        
    })
    

    if (cartArray.length > 0) {
        let totalPrice = 0;
        master = '<div class="cart-h1">Your Order</div>'
        cartArray.forEach(function (item) {
            master += `
            <div class="orders">
                <div class="order-name">${item[0]}      <span class="remove" data-remove="${item}"> remove </span></div>
                <div class="order-price">$${item[1]}</div>
            </div>  
            `

            totalPrice += parseInt(item[1]);
        })

        master += `<div class="border"></div>
                <div class="total">
                    <div class="order-name">Total Price</div>
                    <div class="order-price">$${totalPrice}</div>
                </div>
                <div class="complete-order"><button class="complete-btn" data-btn="btn">Complete order</button></div>
                `



        feedHtml += master
    }

    return feedHtml
   
    
}





function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
   
}

render()



    
   