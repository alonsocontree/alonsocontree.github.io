async function loadInvitation() {
    // 1. Obtener el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('id');

    if (!guestId) {
        // Si no hay ID, muestra un mensaje de error y detente.
        document.getElementById('greeting').textContent = "¡Ups! Falta tu código de invitación.";
        return; 
    }

    try {
        // 2. Cargar el JSON de invitados
        const response = await fetch('assets/data/guests.json');
        const guestsData = await response.json();
        
        // 3. Buscar el invitado por el ID
        const guest = guestsData.find(g => g.id === guestId);

        if (!guest) {
            document.getElementById('greeting').textContent = "Código de invitación no válido.";
            return;
        }

        // --- Personalización Exitosa ---
        const eventCode = guest.event_time; // 'tarde' o 'noche'
        const details = EVENT_DETAILS[eventCode];
        
        // 4. Actualizar el contenido de la página
        document.getElementById('greeting').textContent = `¡Hola, ${guest.name}!`;
        document.getElementById('event-hour').textContent = details.hour_text;
        document.getElementById('event-message').textContent = details.message;
        
        // 5. Aplicar el Tema Visual (el paso más importante para las animaciones)
        document.body.classList.add(details.theme_class); // Añade 'fiesta-tarde' o 'fiesta-noche'

        // NOTA: Aquí deberás llamar a tu función de contador y animaciones
        // startCountdown(details.full_date);
        // startAnimations(eventCode);

    } catch (error) {
        console.error("Error al cargar la invitación:", error);
        document.getElementById('greeting').textContent = "Ocurrió un error al cargar los datos.";
    }
}

// Iniciar el proceso cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadInvitation);

// ====================================================================
// PARTE 1: REGLAS Y DEFINICIÓN DE EVENTOS
// Define los detalles específicos (hora, mensaje, tema) para cada código.
// Asegúrate de cambiar '2025-12-31' por la fecha real de tu cumpleaños.
// ====================================================================
const EVENT_DETAILS = {
    // Detalles para la fiesta de la tarde (4:00 PM) - Elotes y opción flexible
    tarde: {
        hour_text: "4:00 PM",
        // Formato: AAAA-MM-DDTHH:MM:SS
        full_date: "2025-12-13T16:00:00", 
        message: "¡Menú especial! Estás invitado/a a comer ELOTES ASADOS. En caso de no poder asistir a las 4:00 PM, a las 7:00 PM iniciaremos la fiesta.",
        amenities: "Habrá tacos, DJ, mucho baile y piñata.", // Mensaje extra para las amenidades
        theme_class: "fiesta-tarde" // Clase CSS para el tema visual
    },
    // Detalles para la fiesta de la noche (9:00 PM) - Fiesta principal
    noche: {
        hour_text: "6:00 PM",
        // Formato: AAAA-MM-DDTHH:MM:SS
        full_date: "2025-12-13T21:00:00", 
        message: "Prepárate para la fiesta!!!",
        amenities: "Habrá tacos, DJ, mucho baile y piñata.", // Mensaje extra para las amenidades
        theme_class: "fiesta-noche" // Clase CSS para el tema visual
    }
};

// ====================================================================
// PARTE 2: LÓGICA PRINCIPAL - Cargar y Personalizar
// ====================================================================

async function loadInvitation() {
    // 1. Obtener el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('id');

    if (!guestId) {
        // Manejo si no se encuentra el ID
        document.getElementById('greeting').textContent = "¡Ups! Falta tu código de invitación. Por favor, usa el enlace que te envié.";
        return; 
    }

    try {
        // 2. Cargar el JSON de invitados
        const response = await fetch('assets/data/guests.json');
        if (!response.ok) {
             throw new Error(`Error HTTP: ${response.status}`);
        }
        const guestsData = await response.json();
        
        // 3. Buscar el invitado por el ID
        const guest = guestsData.find(g => g.id === guestId);

        if (!guest) {
            // Manejo si el ID no es válido
            document.getElementById('greeting').textContent = "Código de invitación no válido. Verifica tu enlace.";
            return;
        }

        // --- Personalización Exitosa ---
        const eventCode = guest.event_time; // Esto será 'tarde' o 'noche'
        const details = EVENT_DETAILS[eventCode];
        
        // 4. Actualizar el contenido de la página
        document.getElementById('greeting').innerHTML = `¡HOLA, ${guest.name.toUpperCase()}!`;
        document.getElementById('event-hour').textContent = details.hour_text;
        document.getElementById('event-message').innerHTML = details.message;
        document.getElementById('amenities-message').textContent = details.amenities;
        
        // 5. Aplicar el Tema Visual (Crucial para las animaciones CSS)
        document.body.classList.add(details.theme_class); 

        // 6. Iniciar Funciones Secundarias (Contador y Animaciones)
        // Estas funciones las crearás en scripts/countdown.js y scripts/animations.js
        window.startCountdown(details.full_date);
        window.startAnimations(details.theme_class); 

    } catch (error) {
        console.error("Error al cargar la invitación:", error);
        document.getElementById('greeting').textContent = "Ocurrió un error al cargar los datos. Inténtalo de nuevo.";
    }
}

// ====================================================================
// PARTE 3: REPRODUCCIÓN DE AUDIO
// ====================================================================

function enableAudioPlayback() {
    const music = document.getElementById('background-music');
    if (music) {
        music.play()
             .then(() => {
                 console.log("Música de fondo iniciada.");
             })
             .catch(error => {
                 // Esto maneja errores si el navegador es extremadamente estricto
                 console.log("El navegador bloqueó el inicio automático de la música.", error);
             });
    }
    // Una vez que el audio intenta reproducirse, removemos el listener para que no se repita
    document.removeEventListener('click', enableAudioPlayback);
    document.removeEventListener('touchstart', enableAudioPlayback);
}

// Agregamos listeners que intentarán iniciar la música al primer toque o clic del usuario.
document.addEventListener('click', enableAudioPlayback);
document.addEventListener('touchstart', enableAudioPlayback);

// Nota: No hay necesidad de llamar a esta función desde loadInvitation. 
// Simplemente se ejecutará al cargar el script.

// Iniciar el proceso cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadInvitation);