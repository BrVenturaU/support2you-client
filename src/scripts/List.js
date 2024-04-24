
function getItems() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const postsContainer = document.getElementById('search-list');
            postsContainer.innerHTML = '';

        // Recorrer los datos y crear elementos para cada publicación
            data.slice(0, 20).forEach(post => {
            
            const listItem = document.createElement('li');
            listItem.className = 'search-item'; 
            listItem.setAttribute('data-id', post.id); 
            listItem.textContent = post.body.substring(0, 20);  
            if (post.body.length > 20) {
                listItem.textContent += '...';
            }

             // Agregar evento de clic para manejar la selección
            listItem.addEventListener('click', function() {
                handleSelection(post.body); 
            });
            
            postsContainer.appendChild(listItem);

            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
	
}


// Función para mostrar la búsqueda completa en pantalla

function handleSelection(body) {
    const selectedPostContainer = document.getElementById('search-details');
    selectedPostContainer.innerHTML = '';

    const selectedPostbody = document.createElement('p');
    selectedPostbody.textContent = body;
    selectedPostContainer.appendChild(selectedPostbody);
}

// SideBar - Presentacion
let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e)=>{
    });
	}
	let sidebar = document.querySelector(".sidebar");
	let sidebarBtn = document.querySelector(".bx-menu");
    // console.log(sidebarBtn);
    sidebarBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
});

getItems()
