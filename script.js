// АНИМАЦИЯ ЗАГОЛОВКА В БРАУЗЕРЕ
let titleText = "@vorima ";
let titleIndex = 0;
setInterval(() => {
    document.title = titleText.substring(titleIndex) + titleText.substring(0, titleIndex);
    titleIndex = (titleIndex + 1) % titleText.length;
}, 300);

// ЛОГИКА ВХОДА (Click to Enter)
const overlay = document.getElementById('enter-overlay');
const card = document.getElementById('card');
const audio = document.getElementById('audio');
const bgVideo = document.getElementById('bg-video');

// Флаг, чтобы параллакс работал только после входа
let isEntered = false;

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        card.classList.add('visible');
        isEntered = true; // Разрешаем параллакс
        
        // Плавный запуск медиа
        audio.volume = 0.3; 
        audio.play().catch(e => console.log("Audio play failed:", e));
        bgVideo.play().catch(e => console.log("Video play failed:", e));
        
        typeWriter();
    }, 800);
});

// ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ
const texts = ["#алматаСила", "#real6rood", "#ВрачиПалачи"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function typeWriter() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.getElementById('typewriter').textContent = letter;
    
    if (letter.length === currentText.length) {
        setTimeout(() => {
            deleteWriter();
        }, 2000); 
    } else {
        setTimeout(typeWriter, 100);
    }
}

function deleteWriter() {
    letter = currentText.slice(0, --index);
    document.getElementById('typewriter').textContent = letter;
    
    if (letter.length === 0) {
        count++;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(deleteWriter, 50);
    }
}

// --- НОВОЕ: ЭФФЕКТ ПАРАЛЛАКСА ---

document.addEventListener('mousemove', (e) => {
    // Если еще не вошли на сайт, не двигаем карточку
    if (!isEntered) return;

    // Сила эффекта. Чем меньше число, тем сильнее движение.
    const moveFactor = 30; 

    // Вычисляем центр экрана
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Вычисляем смещение мыши от центра и делим на фактор.
    // Мы вычитаем e.clientX из centerX, чтобы карточка двигалась в ПРОТИВОПОЛОЖНУЮ сторону от мыши (эффект глубины).
    // Если хочешь, чтобы двигалась ЗА мышкой, поменяй местами: (e.clientX - centerX)
    const moveX = (centerX - e.clientX) / moveFactor;
    const moveY = (centerY - e.clientY) / moveFactor;

    // Передаем значения в CSS переменные
    card.style.setProperty('--move-x', `${moveX}px`);
    card.style.setProperty('--move-y', `${moveY}px`);

    // Дополнительный эффект: легкий наклон (3D tilt)
    // Если не нравится, закомментируй две строки ниже
    const rotateY = (e.clientX - centerX) / (moveFactor * 2);
    const rotateX = (centerY - e.clientY) / (moveFactor * 2);
    card.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});