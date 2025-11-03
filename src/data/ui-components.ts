// src/data/ui-components.ts

// Define the UI component type
export interface UIComponent {
  id: number;
  title: string;
  category: string;
  tech: string;
  imageDark: string;
  imageLight: string;
  link?: string;
  flow: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight: {
    title: string;
    code: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  };
}

// UI Components data
export const uiComponents: UIComponent[] = [
  {
    id: 1,
    title: "Sliding Glass Authentication System",
    category: "Authentication / Modern UI",
    tech: "HTML5, CSS3 (Flexbox, Animations), Vanilla JS (легко рефакторить на необходимый стек)",
    imageDark: "/images/glass.jpg",
    imageLight: "/images/glass.jpg",
    link: "https://sskutushev.github.io/Registration/",
    flow: {
      input:
        "Создать современную форму входа/регистрации с эффектом стеклянного морфизма, плавной анимацией переключения между формами и адаптивным дизайном для всех устройств.",
      process:
        "CSS3 с использованием backdrop-filter для glassmorphism-эффекта. Gradient-анимации для overlay-панелей (keyframes shimmer). Абсолютное позиционирование с transition для sliding-эффекта. JavaScript для переключения классов (.right-panel-active). Медиа-запросы для скрытия overlay на мобильных и показа текстовых ссылок.",
      output:
        "Двухформенная система с анимированным overlay-слайдером на десктопе. На мобильных устройствах — переключение через текстовые ссылки под формой. Валидация полей (имя, email, пароль, подтверждение, чекбоксы согласия). Интеграция социальных кнопок (Facebook, Google, GitHub). Полная адаптивность 320px-2560px.",
    },
    codeHighlight: {
      title: "Sliding Animation System (CSS-трансформации)",
      code: `/* Базовое состояние */
.sign-in-container {
left: 0;
width: 50%;
z-index: 2;
}

.overlay-container {
left: 50%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

/* Активное состояние (регистрация) */
.container.right-panel-active .sign-in-container {
transform: translateX(100%);
opacity: 0;
z-index: 1;
}

.container.right-panel-active .sign-up-container {
transform: translateX(100%);
opacity: 1;
z-index: 5;
}

.container.right-panel-active .overlay-container {
transform: translateX(-100%);
}

/* Анимация градиента */
@keyframes shimmer {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 2,
    title: "Tab-Based Neomorphic Login System",
    category: "Authentication / Neomorphism",
    tech: "HTML5, CSS3 (Custom Properties), Vanilla JS (OOP) (легко рефакторить на необходимый стек)",
    imageDark: "/images/neo2.jpg",
    imageLight: "/images/neo2.jpg",
    link: "https://sskutushev.github.io/neoformat/",
    flow: {
      input:
        "Разработать систему входа/регистрации в стиле неоморфизма с переключением вкладок, валидацией форм в реальном времени, индикатором силы пароля и LocalStorage для сохранения состояния.",
      process:
        "CSS Variables для темизации (--bg-main, --shadow-light, --shadow-dark). Box-shadow для вдавленного/выпуклого эффекта. ОПП в JS: классы TabSwitcher, FormValidator, PasswordToggle, PasswordStrength. Регулярные выражения для валидации (email, имя, пароль). LocalStorage для восстановления активной вкладки при перезагрузке.",
      output:
        "Плавный sliding-индикатор вкладок с cubic-bezier анимацией. Валидация с визуальными состояниями (error/success границы). Индикатор силы пароля с 3 уровнями (weak/medium/strong). Кастомные чекбоксы с checkmark-анимацией. Модальное окно успешной отправки. Loading-состояние кнопки с спиннером.",
    },
    codeHighlight: {
      title: "OOP Validation System (Масштабируемая архитектура)",
      code: `class FormValidator {
constructor(form) {
this.form = form;
this.rules = {
email: {
required: true,
pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
messages: {
required: 'Введите email',
pattern: 'Некорректный email адрес'
}
},
password: {
required: true,
minLength: 6,
messages: {
required: 'Введите пароль',
minLength: 'Минимум 6 символов'
}
}
};
this.init();
}

validateField(input) {
const rules = this.rules[input.name];
const value = input.value.trim();

    if (rules.required && !value) {
      this.showError(input, rules.messages.required);
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      this.showError(input, rules.messages.pattern);
      return false;
    }

    this.showSuccess(input);
    return true;

}

showError(input, message) {
const inputGroup = input.closest('.input-group');
inputGroup.classList.add('error');
inputGroup.querySelector('.error-message').textContent = message;
if (navigator.vibrate) navigator.vibrate(200);
}
}`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 3,
    title: "Neo-Grid Interactive Login System",
    category: "Authentication / Sci-Fi UI",
    tech: "HTML5 Canvas, CSS3 (Animations), Vanilla JS (Canvas API) (легко рефакторить на необходимый стек)",
    imageDark: "/images/neo.jpg",
    imageLight: "/images/neo.jpg",
    link: "https://sskutushev.github.io/authorization/",
    flow: {
      input:
        'Создать футуристическую форму входа с "убегающей" кнопкой, анимированным фоном (starfield на Canvas), glitch-эффектами и кастомным полем пароля с неоновыми точками.',
      process:
        'Canvas API для анимированного звездного фона (200 частиц с независимыми скоростями). CSS Keyframes для glitch-анимации (skewX, translate, box-shadow). JavaScript для логики "убегания" кнопки: десктоп — последовательные направления (left→up→right→down), мобильный — случайные координаты в пределах контейнера. Кастомное поле пароля с маской из pulsing-dots.',
      output:
        'Интерактивная кнопка входа: disabled-состояние с эффектом "убегания" при hover/touch, active-состояние с bounce-анимацией при заполнении полей. Real-time статус валидации с neon-pulse эффектом. Canvas-фон с 200 звездами и плавной анимацией. Адаптивная логика для десктопа (mouseover) и мобильных (touchstart).',
    },
    codeHighlight: {
      title: "Canvas Starfield Animation (Performance-оптимизация)",
      code: `const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function createStars() {
for (let i = 0; i < 200; i++) {
stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 1.5,
speed: Math.random() * 0.2 + 0.05,
color: \`rgba(59, 130, 246, \${Math.random() * 0.8 + 0.2})\`
});
}
}

function drawStars() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
stars.forEach(star => {
ctx.fillStyle = star.color;
ctx.beginPath();
ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

});
requestAnimationFrame(drawStars); // 60 FPS
}`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 4,
    title: "Animated Sidebar with Sliding Indicator",
    category: "Navigation / Modern UI",
    tech: "HTML5, CSS3 (Backdrop-filter), Vanilla JS (DOM API) (легко рефакторить на необходимый стек)",
    imageDark: "/images/Menu.jpg",
    imageLight: "/images/Menu.jpg",
    link: "https://sskutushev.github.io/Menubox/#",
    flow: {
      input:
        "Создать боковую навигационную панель с glass-эффектом, плавным анимированным индикатором активного пункта и динамической сменой контента.",
      process:
        "Backdrop-filter: blur(12px) для glassmorphism. Абсолютно позиционированный индикатор с transition: top 0.4s cubic-bezier. JavaScript для вычисления offsetTop и синхронизации с переключением контента. Map-объект для связи ID ссылок с ID секций контента. CSS-анимации (slideIn) для контента.",
      output:
        "Sidebar 260px с градиентным фоном (radial-gradient) и 5 пунктами меню. Индикатор с gradient-фоном и box-shadow синхронизируется с активной ссылкой. Плавная смена контента с fade-in анимацией. Hover-эффекты на ссылках (scale иконок, цвет текста). Footer с кнопкой выхода.",
    },
    codeHighlight: {
      title: "Dynamic Indicator Positioning (Pixel-perfect синхронизация)",
      code: `const linkToContentMap = {
'home-link': 'home-content',
'profile-link': 'profile-content',
'stats-link': 'stats-content'
};

function setActive(link) {
// Перемещение индикатора
activeIndicator.style.top = \`\${link.offsetTop}px\`;

// Обновление классов ссылок
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');

// Переключение контента
contentSections.forEach(s => s.classList.remove('active-content'));
const contentId = linkToContentMap[link.id];
document.getElementById(contentId).classList.add('active-content');
}

navLinks.forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
setActive(link);
});
});`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 5,
    title: "Responsive Image Carousel with Popup",
    category: "Components / Image Slider",
    tech: "HTML5, CSS3 (Flexbox), Vanilla JS (Event Delegation) (легко рефакторить на необходимый стек)",
    imageDark: "/images/carousel.jpg",
    imageLight: "/images/carousel.jpg",
    link: "https://sskutushev.github.io/Carousel_and_popap-variant1/",
    flow: {
      input:
        "Разработать карусель изображений с круговыми thumbnail-превью, кнопками prev/next, popup-просмотром и адаптивным дизайном.",
      process:
        "Flexbox для slider-wrapper с динамическим transform: translateX. JavaScript для вычисления slideWidth из offsetWidth контейнера. Event delegation для thumbnail-кликов. Popup с overlay (rgba background) и close по клику вне изображения. Responsive: slideWidth пересчитывается при window.resize.",
      output:
        "Карусель 1024×650px с 7 изображениями. Круговые thumbnail (75×75px) с активным border. Popup-overlay с масштабированием изображения до 95% viewport. Кнопки prev/next с hover-эффектом. Адаптивность: tablet (90vw), mobile (95vw с aspect-ratio 16:10).",
    },
    codeHighlight: {
      title: "Dynamic Slide Width Calculation (Responsive-адаптация)",
      code: `let slideWidth = 1024;

function updateSlider() {
sliderWrapper.style.transform = \`translateX(-\${currentIndex * slideWidth}px)\`;

const thumbs = document.querySelectorAll('.thumb-item');
thumbs.forEach((thumb, index) => {
thumb.classList.toggle('active', index === currentIndex);
});
}

window.addEventListener('resize', () => {
slideWidth = document.querySelector('.slider-container').offsetWidth;
updateSlider(); // Пересчет позиции при изменении окна
});

// Инициализация
slideWidth = document.querySelector('.slider-container').offsetWidth;`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 6,
    title: "Inverse Hover Card Gallery",
    category: "Components / CSS Effects",
    tech: "HTML5, CSS3 (:not() selector, Transforms), No JS (легко рефакторить на необходимый стек)",
    imageDark: "/images/Card.jpg",
    imageLight: "/images/Card.jpg",
    link: "https://sskutushev.github.io/Cards-Hover-Effect/",
    flow: {
      input:
        "Создать галерею карточек, где при наведении на одну карточку все остальные затемняются, используя только CSS без JavaScript.",
      process:
        "CSS :not() pseudo-class для инверсной логики. При hover на .card-container — все карточки opacity: 0.3. При hover на конкретную .card — она opacity: 1 + scale(1.05). Vendor prefixes (-webkit-, -moz-, -o-) для кросс-браузерной совместимости. Flexbox с gap (+ fallback margin для старых браузеров).",
      output:
        "Галерея из 4 карточек 500×560px. Hover-эффект: неактивные карточки затемняются, активная увеличивается и получает глубокую тень. Адаптивность: tablet (2 карточки по 45%), mobile (вертикальный стек, opacity: 1 !important). Плавные transitions (0.5s ease).",
    },
    codeHighlight: {
      title: "CSS :not() Selector Magic (Pure CSS Logic)",
      code: `/* Базовое состояние */
.card {
width: 500px;
height: 560px;
transition: all 0.5s ease;
cursor: pointer;
}

/* Инверсная логика: при hover на контейнер */
.card-container:hover .card {
opacity: 0.3; /* Все карточки затемняются */
}

/* Исключение: активная карточка */
.card-container:hover .card:hover {
opacity: 1; /* Возврат к яркости */
transform: scale(1.05); /* Увеличение */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Mobile override */
@media (max-width: 1014px) {
.card {
opacity: 1 !important; /* Отключаем эффект */
}
}`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
  {
    id: 7,
    title: "Animated Social Media Buttons",
    category: "Components / Interactive UI",
    tech: "HTML5, CSS3 (:has() selector), SVG Icons (легко рефакторить на необходимый стек)",
    imageDark: "/images/social_button.jpg",
    imageLight: "/images/social_button.jpg",
    link: "https://sskutushev.github.io/button-social/",
    flow: {
      input:
        "Создать набор социальных кнопок с всплывающими tooltip-подсказками, анимацией масштабирования и цветовой трансформацией при hover.",
      process:
        "CSS :has() selector для связи состояния кнопки с tooltip. SVG-иконки (viewBox 24×24) с currentColor для наследования цвета. Transform: translateY для анимации tooltip (10px → 0). Data-атрибуты [data-social] для уникальных цветов платформ. Clamp() для адаптивного font-size заголовка.",
      output:
        "5 социальных кнопок (YouTube, TikTok, WhatsApp, Facebook, Twitter) 80×80px. При hover: кнопка scale(1.2), фон меняется на фирменный цвет платформы, иконка становится белой, tooltip появляется с cubic-bezier. Адаптивность: mobile (60×60px → 50×50px).",
    },
    codeHighlight: {
      title: "CSS :has() Selector (Modern Relationship Logic)",
      code: `/* Базовое состояние tooltip */
.tooltip {
position: absolute;
top: -55px;
opacity: 0;
visibility: hidden;
transform: translateX(-50%) translateY(10px);
transition: all 0.3s ease;
}

/* Связь через :has() */
.social-item:hover .tooltip {
opacity: 1;
visibility: visible;
transform: translateX(-50%) translateY(0);
}

/* Динамическое окрашивание по data-атрибуту */
.social-item:has(.social-btn[data-social="youtube"]:hover) .social-btn {
background: #FF0000;
}

.social-item:has(.social-btn[data-social="whatsapp"]:hover) .social-btn {
background: #25D366;
}

/* Изменение цвета иконки */
.social-item:hover .social-icon {
color: #FFFFFF;
}`,
    },
    metrics: {
      label: "Готовность",
      value: "100%",
      description: "Завершенное решение",
    },
  },
];
