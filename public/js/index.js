
function $(selector) {
    return document.querySelector(selector);
}

socket.on('publishProducts', data => {
    $('.products-box').innerHTML = '';

    let html = '';
    data.forEach(product => {
        html += `<div class="product-card">
                    <img src=${product.thumbnails} alt=${product.tittle}>
                    <hr>
                    <h3>${product.title}</h3>
                    <hr>
                    <p>Categoria: ${product.category}</p>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: $ ${product.price}</p>
                    <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
                </div>`;
    });

    $('.products-box').innerHTML = html;
});

function createProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: $('#title').value,
        description: $('#description').value,
        code: $('#code').value,
        price: $('#price').value,
        stock: $('#stock').value,
        category: $('#category').value,
        thumbnails: $('#thumbnails').value
    }

    cleanForm();

    socket.emit('createProduct', newProduct);
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#code').value = '';
    $('#price').value = '';
    $('#stock').value = '';
    $('#category').value = '';
}

function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
  }


function removeFromCart(productId){
    fetch(`/api/carts/remove-product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success'){
            location.reload();
        }else{
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            setTimeout(function() {
                window.location.href = '/products';
            }, 1000);
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
          
            try {
              const response = await fetch(form.action, {
                method: form.method,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
          
              const result = await response.json();
              if (result.status === 'error') {
                document.getElementById('error-message').textContent = result.message;
              } else if (result.status === 'success') {
                window.location.href = '/login';
              }
            } catch (error) {
              document.getElementById('error-message').textContent = 'Error interno del servidor';
            }
        });
    }
});