"use strict";
// Клас для управління модальними вікнами
class ModalManager {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.querySelector('.modal-content');
        this.closeButton = document.querySelector('.modal-close');
        this.overlay = document.querySelector('.modal-overlay');
        this.init();
    }
    init() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        // Закриття по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.close();
            }
        });
    }
    open(title, content) {
        if (this.modal && this.modalContent) {
            const modalTitle = this.modal.querySelector('.modal-title');
            if (modalTitle) {
                modalTitle.textContent = title;
            }
            const modalBody = this.modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = content;
            }
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}
// Клас для управління анімаціями при скролі
class ScrollAnimations {
    constructor() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);
        this.init();
    }
    init() {
        const elements = document.querySelectorAll('.feature-card, .post-card');
        elements.forEach((element) => {
            this.observer.observe(element);
        });
    }
}
// Клас для роботи з API
class ApiManager {
    constructor() {
        this.apiUrl = 'https://jsonplaceholder.typicode.com';
        this.postsContainer = document.getElementById('posts-container');
        this.loadingElement = document.getElementById('loading');
        this.init();
    }
    init() {
        this.loadPosts();
    }
    async fetchPosts() {
        try {
            const response = await fetch(`${this.apiUrl}/posts?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            return posts;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }
    async loadPosts() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
        try {
            const posts = await this.fetchPosts();
            this.displayPosts(posts);
        }
        catch (error) {
            if (this.postsContainer) {
                this.postsContainer.innerHTML = '<p class="error">Помилка завантаження даних. Спробуйте пізніше.</p>';
            }
        }
        finally {
            if (this.loadingElement) {
                this.loadingElement.style.display = 'none';
            }
        }
    }
    displayPosts(posts) {
        if (!this.postsContainer)
            return;
        this.postsContainer.innerHTML = '';
        posts.forEach((post) => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
                <p class="post-body">${this.escapeHtml(post.body)}</p>
                <button class="btn btn-primary read-more-btn" data-post-id="${post.id}">
                    Читати більше
                </button>
            `;
            // Додаємо обробник події для кнопки
            const readMoreBtn = postCard.querySelector('.read-more-btn');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => this.handleReadMore(post));
            }
            if (this.postsContainer) {
                this.postsContainer.appendChild(postCard);
            }
        });
    }
    async handleReadMore(post) {
        try {
            // Отримуємо додаткову інформацію про користувача
            const userResponse = await fetch(`${this.apiUrl}/users/${post.userId}`);
            if (!userResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
            }
            const user = await userResponse.json();
            const modalManager = new ModalManager();
            const content = `
                <strong>Автор:</strong> ${this.escapeHtml(user.name)} (${this.escapeHtml(user.username)})<br>
                <strong>Email:</strong> ${this.escapeHtml(user.email)}<br>
                <strong>Телефон:</strong> ${this.escapeHtml(user.phone)}<br>
                <strong>Веб-сайт:</strong> ${this.escapeHtml(user.website)}<br><br>
                <strong>Повний текст:</strong><br>
                ${this.escapeHtml(post.body)}
            `;
            modalManager.open(post.title, content);
        }
        catch (error) {
            console.error('Error fetching user:', error);
            const modalManager = new ModalManager();
            modalManager.open(post.title, post.body);
        }
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
// Клас для управління навігацією
class NavigationManager {
    constructor() {
        this.lastScroll = 0;
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }
    init() {
        // Мобільне меню
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                if (this.navMenu) {
                    this.navMenu.classList.toggle('active');
                }
            });
        }
        // Закриття меню при кліку на посилання
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (this.navMenu) {
                    this.navMenu.classList.remove('active');
                }
            });
        });
        // Плавна прокрутка
        this.setupSmoothScroll();
        // Ефект при скролі для header
        this.setupScrollEffect();
    }
    setupSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (this.header) {
                if (currentScroll > 100) {
                    this.header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }
                else {
                    this.header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }
            }
            this.lastScroll = currentScroll;
        });
    }
}
// Клас для управління формою
class FormManager {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.contactForm)
            return;
        const formData = new FormData(this.contactForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';
        // Валідація
        if (name && email && message) {
            this.showSuccessMessage();
            this.contactForm.reset();
        }
        else {
            this.showErrorMessage('Будь ласка, заповніть всі поля форми.');
        }
    }
    showSuccessMessage() {
        const modalManager = new ModalManager();
        modalManager.open('Успіх!', 'Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
    }
    showErrorMessage(message) {
        alert(message);
    }
}
// Ініціалізація додатку
class App {
    constructor() {
        // Чекаємо завантаження DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        }
        else {
            this.init();
        }
    }
    init() {
        this.modalManager = new ModalManager();
        this.scrollAnimations = new ScrollAnimations();
        this.apiManager = new ApiManager();
        this.navigationManager = new NavigationManager();
        this.formManager = new FormManager();
        console.log('App initialized successfully');
    }
}
// Запуск додатку - обгортаємо в IIFE для виконання без модулів
(function () {
    const app = new App();
})();
