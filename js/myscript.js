const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 14;
let columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops.length = Math.floor(columns);
    drops.fill(0);
});

draw();

function typewriterEffect(elementId, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            const element = document.getElementById(elementId);
            element.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor">_</span>';
            i++;
            setTimeout(type, speed);
        } else {
            document.querySelector(".blinking-cursor").remove();
            if (callback) callback();
        }
    }
    type();
}

function displayMessages(elementId, messages, speed, interval) {
    let currentMessageIndex = 0;

    function showNextMessage() {
        const text = messages[currentMessageIndex];
        typewriterEffect(elementId, text, speed, () => {
            setTimeout(() => {
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                showNextMessage();
            }, interval);
        });
    }

    showNextMessage();
}

window.onload = () => {
    // const messages = [
    //     '<b>Descripción:</b>\n\nEste ejemplo simula una terminal de computadora con un efecto de texto de máquina de escribir, acompañado de un fondo que evoca la estética de la película "Matrix", con una lluvia de código verde sobre negro.',
    //     '<b>Description: </b>\n\nThis example simulates a computer terminal with a typewriter-style text effect, featuring a background reminiscent of the movie "Matrix" with cascading green code on a black screen.',
    //     '<b>Beschreibung:  </b>\n\nDieses Beispiel simuliert ein Computerterminal mit einem Schreibmaschineneffekt für den Text und einem Hintergrund, der an den Film "Matrix" erinnert, mit grünem Code, der auf einem schwarzen Bildschirm herabregnet.',
    // ];
    displayMessages("typewriter", messages, 50, 60000); // 60000 ms = 1 minuto
};
