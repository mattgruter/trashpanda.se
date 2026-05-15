// Add a fun animation to the raccoon icon
const raccoonIcon = document.querySelector('.racoon-icon');
function animateRaccoon() {
    raccoonIcon.classList.toggle('flipped');
}

setInterval(animateRaccoon, 5000);
