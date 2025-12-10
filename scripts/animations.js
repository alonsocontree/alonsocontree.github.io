// Variable global para acceder a la capa de animación
const animationLayer = document.getElementById('animation-layer');
const MAX_ELEMENTS = 50; // Número de elementos visibles simultáneamente

/**
 * Función principal para iniciar las animaciones según el tema.
 * Se exporta a la ventana para ser llamada desde main.js
 * @param {string} themeClass - 'fiesta-tarde' o 'fiesta-noche'
 */
window.startAnimations = (themeClass) => {
    // Definimos qué tipo de elemento crear
    let elementClass = '';
    let intervalTime = 0;

    if (themeClass === 'fiesta-tarde') {
        elementClass = 'balloon';
        intervalTime = 500; // Crea un globo cada 500ms
    } else if (themeClass === 'fiesta-noche') {
        elementClass = 'sparkle';
        intervalTime = 100; // Crea una chispa/partícula más a menudo
    }

    if (elementClass) {
        // Usa un intervalo para generar elementos continuamente
        setInterval(() => {
            if (animationLayer.children.length < MAX_ELEMENTS) {
                generateAnimatedElement(elementClass);
            }
        }, intervalTime);
    }
};

/**
 * Crea un elemento DOM, le asigna una clase y lo añade a la capa.
 * @param {string} className - Clase CSS ('balloon' o 'sparkle')
 */
function generateAnimatedElement(className) {
    const element = document.createElement('div');
    element.classList.add('animated-element', className);

    // Posición inicial aleatoria en la parte inferior de la pantalla (de donde 'salen')
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;

    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;

    // Asignar duración y retraso de animación aleatorios para un efecto natural
    const duration = 5 + Math.random() * 5; // Duración entre 5s y 10s
    element.style.animationDuration = `${duration}s`;
    
    // Asignar un tamaño aleatorio (para hacerlos parecer más cercanos o lejanos)
    const size = 15 + Math.random() * 20; 
    element.style.width = `${size}px`;
    element.style.height = `${size + 10}px`; // Los globos son más altos que anchos

    animationLayer.appendChild(element);

    // Limpieza: Elimina el elemento después de que su animación termine para liberar memoria
    setTimeout(() => {
        element.remove();
    }, (duration * 1000) + 100); // Duración de la animación + un pequeño margen
}

// Nota: Las explosiones de cohetes requerirían un código más complejo
// para manejar la detonación, pero esta base ya genera movimiento constante.