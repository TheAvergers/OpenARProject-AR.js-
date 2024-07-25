document.addEventListener('DOMContentLoaded', () => {
    const introAnimation = document.getElementById('intro-animation');
    const starsContainer = document.getElementById('stars');
    const content = document.getElementById('content');
    const buttonContainer = document.getElementById('button-container');


    // Function to check if the device is mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Set the appropriate link for the playground button
    if (isMobile()) {
        playgroundButton.href = "ar-interface.html";
    }

    // Create stars
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    // Wait for the intro animation to complete
    setTimeout(() => {
        // Hide the intro animation
        introAnimation.style.display = 'none';

        // Show the content
        content.classList.remove('hidden');
        content.classList.add('visible');

        // Show the button container after a short delay
        setTimeout(() => {
            buttonContainer.classList.remove('hidden');
            buttonContainer.classList.add('visible');
        }, 5); // 0.5 seconds delay
    }, 1970); // 5 seconds (3s stars + 2s zoom)
});
