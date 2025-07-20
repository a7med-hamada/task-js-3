let inputproduct = document.getElementById("inputproduct");
let addbtn = document.getElementById("addbtn");
let count = document.getElementById("count");
let content = document.getElementById("content");
let inputsearch = document.getElementById("inputsearch");



let allproducts = [
    {id: 1, name: "glass", price: 300 , des: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id: 2, name: "book", price: 200 , des: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id: 3, name: "pin", price: 50 , des: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id: 4, name: "pike", price: 1500 , des: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id: 5, name: "ball", price: 100 , des: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
];

count.innerHTML = `Number of products : ${allproducts.length}`;


//btn
function drow(list = allproducts) {
    content.innerHTML = "";
    list.forEach((ele) => {
        content.innerHTML += `
      <div class="item w-full">
        <span>${ele.id} - the name item : <span class="font-bold name-item"> ${ele.name} </span>
        <br>
         price : <span class="font-bold"> ${ele.price} </span></span>
        <br>
        <br>
        <span>Description :</span>
        <p class="des border-2 border-white p-2 rounded-lg mt-3 overflow-auto">${ele.des}</p>
        <br>
        <button class="border-2 border-green-300 text-white mr-2 cursor-pointer px-3 py-1 rounded-lg edit  hover:text-green-300 transition-all duration-300 decoration" onclick="editbtn(${ele.id})">
         edit
        </button>
        <button class="border-2 border-red-500 text-white  cursor-pointer px-3 py-1 rounded-lg  del hover:text-red-500 transition-all duration-300 " onclick="deletbtn(${ele.id})">
          Delete <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    });
}


drow();




//edit
function editbtn(id) {
    const index = allproducts.findIndex(p => p.id === id);
    const product = allproducts[index];

Swal.fire({
    title: 'Edit Product',
    cancelButtonColor: "#d33",
    html: `
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input id="editName" class="swal2-input" placeholder="Product Name" value="${product.name}" style="flex: 1;">
            <input id="editPrice" class="swal2-input" type="number" placeholder="Product Price" value="${product.price}" style="flex: 1;">
            <textarea id="editDescription" class="swal2-textarea" placeholder="Product Description" style="flex: 1;">${product.des}</textarea>
        </div>
    `,
    preConfirm: () => {
        let name = document.getElementById('editName').value.trim();
        let price = document.getElementById('editPrice').value.trim();
        let des = document.getElementById('editDescription').value.trim();

        if (!name || !price || !des) {
            Swal.showValidationMessage('All fields are required');
            return false;
        }

        product.name = name;
        product.price = parseFloat(price);
        product.des = des;

                    Swal.fire({
                    icon: 'success',
                    position: 'top-end',
                    title: 'Done to edit',
                    text: 'The product has been edited successfully',
                    showConfirmButton: false,
                    timer: 1000
                });

        drow();
        count.innerHTML = `Number of products : ${allproducts.length}`;
    }
});

}


//search
inputsearch.addEventListener("input", function () {
    let term = inputsearch.value.trim().toLowerCase();

    let filteredProducts = allproducts.filter((product) => {
        return product.name.toLowerCase().includes(term);
    });

    if (filteredProducts.length === 0) {
        content.innerHTML = `<p class="text-red-600 text-lg mt-4">لا يوجد منتج بهذا الاسم</p>`;
        count.innerHTML = `عدد المنتجات : 0`;
    } else {
        drow(filteredProducts); // يعرض فقط المطابقين
        count.innerHTML = `عدد المنتجات : ${filteredProducts.length}`;
    }
});




//add
addbtn.addEventListener("click", function () {
    if (inputproduct.value.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a product name!',
        });
        return;
    }

    Swal.fire({
        title: 'Enter the price of the product:',
        input: 'text',
        inputPlaceholder: 'Enter price here',
        inputAttributes: {
            type: 'number'
        },
        showCancelButton: true,
        confirmButtonText: 'Next',
        cancelButtonText: 'Cancel',
        preConfirm: (price) => {
            if (!price || isNaN(price)) {
                Swal.showValidationMessage('You must enter a valid number');
            }
            return price;
        }
    }).then((priceResult) => {
        if (priceResult.isConfirmed) {
            const price = priceResult.value;

            Swal.fire({
                title: 'Enter a description for the product:',
                input: 'textarea',
                inputPlaceholder: 'Write product description...',
                showCancelButton: true,
                confirmButtonText: 'Add Product',
                cancelButtonText: 'Cancel',
                
                preConfirm: (description) => {
                    if (!description.trim()) {
                        Swal.showValidationMessage('Description cannot be empty');
                    }
                    return description;
                }
            }
            
        ).then((descResult) => {
                if (descResult.isConfirmed) {
                    let lastId = allproducts.length > 0 ? allproducts[allproducts.length - 1].id : 0;
                    allproducts.push({
                        id: ++lastId,
                        name: inputproduct.value,
                        price: price,
                        des: descResult.value
                    });

                Swal.fire({
                    icon: 'success',
                    position: 'top-end',
                    title: 'Done to add',
                    text: 'The product has been added successfully',
                    showConfirmButton: false,
                    timer: 1000
                });

                    inputproduct.value = "";
                    drow();
                    count.innerHTML = `Number of products : ${allproducts.length}`;
                }
            });
        }
    });
});




    //del
    function deletbtn(id) {
        let index = allproducts.map((del) =>{
            return del.id;
        }).indexOf(id);
        allproducts.splice(index, 1);
        drow(allproducts);
        count.innerHTML = `Number of products : ${allproducts.length}`; 
        Swal.fire({
            icon: 'success',
            position: 'top-end',
            title: 'Deleted',
            text: 'The product has been deleted successfully',
            showConfirmButton: false,
            timer: 1000
        });
    }