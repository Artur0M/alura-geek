const productList = () => {
    return fetch("https://my-json-server.typicode.com/Artur0M/hosting/products")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error fetching product list');
            }
            return res.json();
        })
        .catch((err) => console.error("Error fetching product list:", err));
};

const createProducts = (name, price, image) => {
    return fetch("https://my-json-server.typicode.com/Artur0M/hosting/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error in POST request');
        }
        return res.json();
    })
    .then(data => {
        console.log("Response from POST:", data);
        return data;
    })
    .catch((err) => console.error("Error creating product:", err));
};

const deleteProduct = (id) => {
    return fetch(`https://my-json-server.typicode.com/Artur0M/hosting/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error in DELETE request');
        }
        return res.json();
    })
    .catch((err) => console.error("Error deleting product:", err));
};

const servicesProducts = {
    productList, createProducts, deleteProduct
};

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(nombre, precio, imagen)
        .then((res) => {
            console.log("Product created:", res);
            productContainer.appendChild(createCard(res.name, res.price, res.image, res.id));
            form.reset();
        })
        .catch((err) => console.error("Error in form submission:", err));
});

function createCard(name, price, image, id) {
    const card = document.createElement("li");
    card.classList.add("card");

    card.innerHTML = `
        <div class="targetas">
            <div class="imagen_container">
                <img class="img__producto" src="${image}" alt="${name}">
            </div>
            <div class="nombre_producto_container">
                <p class="nombre__producto">${name}</p>
            </div>
            <div class="precio__container">
                <span class="precio">${price}</span>
                <button class="btn__borrar__producto" data-id="${id}">
                    <img src="./imagenes/borrar.png" alt="boton para borrar producto">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".btn__borrar__producto");
    deleteButton.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();

                console.log(`Product with id ${id} deleted`);
            })
            .catch((err) => console.error("Error deleting product:", err));
    });

    return card;
}

// Función para renderizar la lista de productos
const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();
        productContainer.innerHTML = '';

        listProduct.forEach(product => {
            productContainer.appendChild(
                createCard(product.name, product.price, product.image, product.id)
            );
        });

    } catch (error) {
        console.error("Error rendering products:", error);
    }
};

render();