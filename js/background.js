const codeBackground = document.getElementById("code-background");
const progressBar = document.getElementById("progress-bar");
const mainSite = document.getElementById("main-site");
const preloader = document.getElementById("preloader");
const enterBtn = document.getElementById("enter-btn");

const codeLines = [
    ""
];

let currentLine = 0;
let progress = 0;

function updateCodeBackground() {
    if (currentLine >= codeLines.length) {
        currentLine = 0;
        codeBackground.innerHTML = "";
    }

    codeBackground.innerHTML += codeLines[currentLine] + "\n";
    currentLine++;

    setTimeout(updateCodeBackground, 100); // Ускоряем печатание текста
}

function updateProgressBar() {
    if (progress < 100) {
        progress += Math.random() * 3;
        progress = Math.min(100, progress);
        progressBar.style.width = progress + "%";
        progressBar.textContent = Math.floor(progress) + "%";
        
        // Показываем кнопку "Enter Website", когда прогресс достигнет 90%
        if (progress >= 100) {
            setTimeout(function() {
                preloader.classList.add('hidden'); // Hide the preloader
                mainSite.classList.remove('hidden'); // Show the main website
            }, 1000); // Optionally delay the transition
        } else {
            setTimeout(updateProgressBar, 200); // Continue updating progress every 200ms
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const text = `Here, you’ll imagine being the owner of a the most Degen Business = Pumpfun.com
Your company’s success is in your hands, and now, it’s time to explore and spend your millions. Ready to have some fun?`;
    let index = 0;
    const typewriterText = document.getElementById('typewriter-text');

    function typeText() {
        if (index < text.length) {
            typewriterText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, 32); // Скорость печатания
        }
    }

    typeText(); // Запуск анимации печатания текста
});


function enterWebsite() {
    // Убираем прелоудер
    preloader.classList.add('hidden');
    // Показываем основной сайт
    mainSite.classList.remove('hidden');
}

// Запуск анимации фона и прогресс-бара
updateCodeBackground();
updateProgressBar();
