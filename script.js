document.addEventListener('DOMContentLoaded', () => {
        const unlock = document.getElementById('unlock-animation');
        const mainContent = document.getElementById('main-content');
        
        let startX = 0;
        let currentX = 0;

        /**
         * Muestra el contenido principal después de la animación de desbloqueo.
         */
        function showPortfolio() {
            mainContent.style.display = 'flex';
            document.body.style.overflow = 'auto';
        }

        /**
         * Lógica de desbloqueo finalizada (ya sea por click o deslizamiento).
         */
        function handleUnlockSuccess() {
            // Animación de vibración (haptic feedback) si está disponible
            if (navigator.vibrate) navigator.vibrate([10, 40, 20]); 

            // Aplicar la animación de salida final (deslizamiento a la derecha y desvanecimiento)
            unlock.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            unlock.style.opacity = '0';
            unlock.style.transform = 'translateX(8%)'; // Pequeño desplazamiento para el efecto

            setTimeout(() => {
                unlock.style.display = 'none'; // Ocultar el overlay
                showPortfolio(); // Mostrar el contenido
            }, 420);
        }

        // 1. Desbloqueo por Click/Mouse
        unlock.addEventListener('click', handleUnlockSuccess);

        // 2. Desbloqueo Táctil (Gesto de deslizamiento)
        
        unlock.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = 0;
            // Desactivar la transición CSS para que el movimiento sea instantáneo al arrastrar
            unlock.style.transition = 'none'; 
        });

        unlock.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX - startX;
            if (currentX > 0) { // Solo si se desliza hacia la derecha
                // Mueve el elemento de desbloqueo
                unlock.style.transform = `translateX(${Math.min(currentX, window.innerWidth)}px)`;
                // Desvanece el elemento a medida que se mueve
                unlock.style.opacity = `${Math.max(0, 1 - currentX / window.innerWidth)}`;
            }
        });

        unlock.addEventListener('touchend', () => {
            const unlockThreshold = window.innerWidth * 0.35; // Umbral de 35% de la pantalla
            
            if (currentX > unlockThreshold) {
                // Desbloqueado: Completa la animación de salida
                handleUnlockSuccess();
            } else {
                // No desbloqueado: Regresa a la posición inicial
                if (navigator.vibrate) navigator.vibrate([30]);
                unlock.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                unlock.style.transform = 'translateX(0)';
                unlock.style.opacity = '1';
            }
        });
    });
