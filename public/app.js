const API_BASE_URL = 'http://localhost:5000/api';

// Función para hacer solicitudes autenticadas
function fetchWithAuth(url, options = {}) {
    const authCredentials = btoa('admin:admin123');

    const headers = {
        'Authorization': `Basic ${authCredentials}`,
        ...options.headers
    };

    // Incluir las credenciales (cookies)
    return fetch(url, {
        ...options,
        headers,
        credentials: 'include'  // Asegúrate de incluir las cookies en cada solicitud
    });
}

// Función para registrar un usuario
async function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuario registrado con éxito');
            window.location.href = 'login.html'; // Redirigir al login
        } else {
            alert('Error al registrar usuario: ' + result.error);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}

// Función para iniciar sesión
async function loginUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('userToken', result.token); // Si estuvieras usando JWT
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else {
            alert('Error al iniciar sesión: ' + result.error);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}



// Función para cerrar sesión
async function logoutUser() {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/logout`, {
            method: 'POST',
            credentials: 'include' // Asegúrate de que se envían las cookies con la solicitud
        });

        if (response.ok) {
            const result = await response.json(); // Asegúrate de obtener el JSON de la respuesta
            alert(result.message); // Mostrar el mensaje del servidor
            // Redirigir a la página de login o inicio
            window.location.href = 'login.html';
        } else {
            const result = await response.json(); // Obtener más información del error
            alert('Error al cerrar sesión: ' + result.error);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
    }
}




// Agregar el evento al botón de cerrar sesión
document.getElementById('logoutButton').addEventListener('click', logoutUser);

// Obtener todos los comentarios
async function getComments() {
    
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/comments`);
        if (!response.ok) {
            throw new Error('Error al obtener los comentarios');
        }

        const comments = await response.json();
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML = `<p>${comment.comment}</p><p>Puntuación: ${comment.rating}</p>`;
            commentsList.appendChild(div);
        });
    } catch (error) {
        console.error('Hubo un problema al cargar los comentarios.', error);
        alert('Hubo un problema al cargar los comentarios.');
    }
}

// Enviar un comentario
document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment, rating }) // Asegúrate de que este JSON es correcto
        });

        if (response.ok) {
            alert('Comentario enviado con éxito');
            getComments(); // Actualiza la lista de comentarios
        } else {
            const result = await response.json(); // Obtener más información del error
            alert(`Error al enviar el comentario: ${result.message}`); // Mostrar el mensaje de error
        }
    } catch (error) {
        console.error('Error al enviar el comentario:', error); // Agregar detalles del error
    }
});


// Obtener los servicios
async function getServices() {
    try {
        // Hacer la solicitud autenticada a la API de servicios
        const response = await fetchWithAuth(`${API_BASE_URL}/services`);
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al obtener los servicios');
        }

        // Convertir la respuesta a JSON
        const services = await response.json();

        // Limpiar la lista de servicios en el DOM
        const servicesList = document.getElementById('servicesList');
        servicesList.innerHTML = '';

        // Iterar sobre los servicios y crear el HTML con service_name, description y price
        services.forEach(service => {
            const div = document.createElement('div');
            div.classList.add('service');
            div.innerHTML = `
                <p><strong>Servicio:</strong> ${service.service_name}</p>
                <p><strong>Descripción:</strong> ${service.description}</p>
                <p><strong>Precio:</strong> $${service.price}</p>
            `;
            servicesList.appendChild(div); // Agregar al DOM
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los servicios.', error);
        alert('Hubo un problema al cargar los servicios.');
    }
}


// Obtener notificaciones
async function getNotifications() {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/notifications`);
        if (!response.ok) {
            throw new Error('Error al obtener las notificaciones');
        }

        const notifications = await response.json();
        const notificationsList = document.getElementById('notificationsList');
        notificationsList.innerHTML = '';
        notifications.forEach(notification => {
            const div = document.createElement('div');
            div.classList.add('notification');
            div.innerHTML = `<p>${notification.message}</p>`;
            notificationsList.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar las notificaciones.', error);
        alert('Hubo un problema al cargar las notificaciones.');
    }
}

// Obtener trabajadores
async function getWorkers() {
    try {
        // Hacer la solicitud para obtener la lista de trabajadores
        const response = await fetchWithAuth(`${API_BASE_URL}/workers`);
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al obtener los trabajadores');
        }

        // Parsear la respuesta a formato JSON
        const workers = await response.json();
        
        // Obtener la lista de trabajadores en el DOM
        const workersList = document.getElementById('workersList');
        workersList.innerHTML = ''; // Limpiar la lista antes de llenarla
        
        // Iterar sobre cada trabajador y mostrar la información en el DOM
        workers.forEach(worker => {
            const div = document.createElement('div');
            div.classList.add('worker');
            
            // Crear la estructura HTML para mostrar nombre, rol y bio
            div.innerHTML = `
                <p><strong>Nombre:</strong> ${worker.name}</p>
                <p><strong>Rol:</strong> ${worker.role}</p>
                <p><strong>Biografía:</strong> ${worker.bio}</p>
            `;
            
            // Agregar el div al contenedor de la lista
            workersList.appendChild(div);
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los trabajadores.', error);
        alert('Hubo un problema al cargar los trabajadores.');
    }
}

