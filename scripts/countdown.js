// ====================================================================
// SCRIPT DE CONTADOR REGRESIVO (countdown.js)
// ====================================================================

/**
 * Inicia el contador regresivo hacia la fecha objetivo.
 * Esta función es llamada desde main.js con la fecha del evento.
 * @param {string} targetDateString - La fecha y hora en formato YYYY-MM-DDTHH:MM:SS
 */
window.startCountdown = (targetDateString) => {
    // 1. Convertir la fecha objetivo a milisegundos
    const targetDate = new Date(targetDateString).getTime();
    const countdownElement = document.getElementById('countdown');

    if (!countdownElement) {
        console.error("Error: No se encontró el elemento 'countdown' en el HTML.");
        return;
    }

    // 2. Función para actualizar el contador
    const updateCountdown = () => {
        // Obtener la fecha y hora actuales
        const now = new Date().getTime();

        // Calcular la distancia (tiempo restante en milisegundos)
        const distance = targetDate - now;

        // 3. Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Función auxiliar para añadir un cero si el número es menor a 10
        const formatTime = (time) => String(time).padStart(2, '0');

        // 4. Mostrar el resultado
        if (distance > 0) {
            countdownElement.innerHTML = `
                <span class="timer-unit">
                    <span class="timer-value">${formatTime(days)}</span><small>DÍAS</small>
                </span>
                <span class="timer-separator">:</span>
                <span class="timer-unit">
                    <span class="timer-value">${formatTime(hours)}</span><small>HRS</small>
                </span>
                <span class="timer-separator">:</span>
                <span class="timer-unit">
                    <span class="timer-value">${formatTime(minutes)}</span><small>MINS</small>
                </span>
                <span class="timer-separator">:</span>
                <span class="timer-unit">
                    <span class="timer-value">${formatTime(seconds)}</span><small>SEGS</small>
                </span>
            `;
        } else {
            // Cuando la fiesta ha llegado
            clearInterval(interval);
            countdownElement.innerHTML = "<h2 class='party-started'>¡LA FIESTA HA COMENZADO!</h2>";
        }
    };

    // Llamar a la función inmediatamente para evitar un retraso inicial
    updateCountdown(); 
    
    // 5. Actualizar cada segundo
    const interval = setInterval(updateCountdown, 1000);
};