document.addEventListener('DOMContentLoaded', () => {
        const unlock = document.getElementById('unlock-animation');
        const mainContent = document.getElementById('main-content');
        let startX = 0;
        let currentX = 0;
        function showPortfolio() {
            mainContent.style.display = 'flex';
            document.body.style.overflow = 'auto';
        }

        function handleUnlockSuccess() {
            if (navigator.vibrate) navigator.vibrate([10, 40, 20]); 
            unlock.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            unlock.style.opacity = '0';
            unlock.style.transform = 'translateX(8%)';
            setTimeout(() => {
                unlock.style.display = 'none';
                showPortfolio(); 
            }, 420);
        }

        unlock.addEventListener('click', handleUnlockSuccess);

        unlock.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = 0;
            unlock.style.transition = 'none'; 
        });

        unlock.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX - startX;
            if (currentX > 0) {
                unlock.style.transform = `translateX(${Math.min(currentX, window.innerWidth)}px)`;
                unlock.style.opacity = `${Math.max(0, 1 - currentX / window.innerWidth)}`;
            }
        });

        unlock.addEventListener('touchend', () => {
            const unlockThreshold = window.innerWidth * 0.35;
            if (currentX > unlockThreshold) {
                handleUnlockSuccess();
            } else {
                if (navigator.vibrate) navigator.vibrate([30]);
                unlock.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                unlock.style.transform = 'translateX(0)';
                unlock.style.opacity = '1';
            }
