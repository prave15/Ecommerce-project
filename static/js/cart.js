let btns=document.querySelectorAll('.update-cart')

for(let i=0; i<btns.length; i++){
    btns[i].addEventListener("click", function(){
        let productId = this.dataset.product;
        let action = this.dataset.action;
        console.log('productId :', productId, 'Action :', action);

        console.log('USER :', user)

        if (user == 'AnonymousUser'){
            console.log('User is not authenticated')

            addCookieItem(productId, action)
                    
        }else{
        
        updateUserOrder(productId, action)
        }
        
        
    })
}


function updateUserOrder(productId, action){
    console.log('User is authenticated. Sending data ...')

    let url = '/update_item/'

    
        fetch(url, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
			}, 
			body:JSON.stringify({'productId':productId, 'action':action})
		})
		.then((response) => {
		   return response.json();
		})
		.then((data) => {
		    location.reload()
		});


}

function addCookieItem(productId, action){
	console.log('User is not authenticated')

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity':1}

		}else{
			cart[productId]['quantity'] += 1
		}
	}

	if (action == 'remove'){
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0){
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}
	console.log('CART:', cart)
	document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
	location.reload()
}