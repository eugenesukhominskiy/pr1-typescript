// Типи для даних з API
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

// Клас для управління модальними вікнами
class ModalManager {
    private modal: HTMLElement | null;
    private modalContent: HTMLElement | null;
    private closeButton: HTMLElement | null;
    private overlay: HTMLElement | null;

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.querySelector('.modal-content');
        this.closeButton = document.querySelector('.modal-close');
        this.overlay = document.querySelector('.modal-overlay');
        this.init();
    }

    private init(): void {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Закриття по ESC
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.close();
            }
        });
    }

    public open(title: string, content: string): void {
        if (this.modal && this.modalContent) {
            const modalTitle: HTMLElement | null = this.modal.querySelector('.modal-title');
            if (modalTitle) {
                modalTitle.textContent = title;
            }
            const modalBody: HTMLElement | null = this.modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = content;
            }
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    public close(): void {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Клас для управління анімаціями при скролі
class ScrollAnimations {
    private observer: IntersectionObserver;

    constructor() {
        const options: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        this.init();
    }

    private init(): void {
        const elements: NodeListOf<Element> = document.querySelectorAll('.feature-card, .post-card');
        elements.forEach((element: Element) => {
            this.observer.observe(element);
        });
    }
}

// Клас для роботи з API
class ApiManager {
    private apiUrl: string = 'https://jsonplaceholder.typicode.com';
    private postsContainer: HTMLElement | null;
    private loadingElement: HTMLElement | null;

    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.loadingElement = document.getElementById('loading');
        this.init();
    }

    private init(): void {
        this.loadPosts();
    }

    private async fetchPosts(): Promise<Post[]> {
        try {
            const response: Response = await fetch(`${this.apiUrl}/posts?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts: Post[] = await response.json();
            return posts;
        } catch (error: unknown) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    private async loadPosts(): Promise<void> {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }

        try {
            const posts: Post[] = await this.fetchPosts();
            this.displayPosts(posts);
        } catch (error: unknown) {
            if (this.postsContainer) {
                this.postsContainer.innerHTML = '<p class="error">Помилка завантаження даних. Спробуйте пізніше.</p>';
            }
        } finally {
            if (this.loadingElement) {
                this.loadingElement.style.display = 'none';
            }
        }
    }

    private displayPosts(posts: Post[]): void {
        if (!this.postsContainer) return;

        this.postsContainer.innerHTML = '';

        posts.forEach((post: Post) => {
            const postCard: HTMLElement = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
                <p class="post-body">${this.escapeHtml(post.body)}</p>
                <button class="btn btn-primary read-more-btn" data-post-id="${post.id}">
                    Читати більше
                </button>
            `;

            // Додаємо обробник події для кнопки
            const readMoreBtn: HTMLElement | null = postCard.querySelector('.read-more-btn');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => this.handleReadMore(post));
            }

            if (this.postsContainer) {
                this.postsContainer.appendChild(postCard);
            }
        });
    }

    private async handleReadMore(post: Post): Promise<void> {
        try {
            // Отримуємо додаткову інформацію про користувача
            const userResponse: Response = await fetch(`${this.apiUrl}/users/${post.userId}`);
            if (!userResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
            }
            const user: User = await userResponse.json();

            const modalManager: ModalManager = new ModalManager();
            const content: string = `
                <strong>Автор:</strong> ${this.escapeHtml(user.name)} (${this.escapeHtml(user.username)})<br>
                <strong>Email:</strong> ${this.escapeHtml(user.email)}<br>
                <strong>Телефон:</strong> ${this.escapeHtml(user.phone)}<br>
                <strong>Веб-сайт:</strong> ${this.escapeHtml(user.website)}<br><br>
                <strong>Повний текст:</strong><br>
                ${this.escapeHtml(post.body)}
            `;
            modalManager.open(post.title, content);
        } catch (error: unknown) {
            console.error('Error fetching user:', error);
            const modalManager: ModalManager = new ModalManager();
            modalManager.open(post.title, post.body);
        }
    }

    private escapeHtml(text: string): string {
        const div: HTMLDivElement = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Клас для управління навігацією
class NavigationManager {
    private navToggle: HTMLElement | null;
    private navMenu: HTMLElement | null;
    private header: HTMLElement | null;
    private lastScroll: number = 0;

    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }

    private init(): void {
        // Мобільне меню
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                if (this.navMenu) {
                    this.navMenu.classList.toggle('active');
                }
            });
        }

        // Закриття меню при кліку на посилання
        const navLinks: NodeListOf<Element> = document.querySelectorAll('.nav-menu a');
        navLinks.forEach((link: Element) => {
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

    private setupSmoothScroll(): void {
        const anchors: NodeListOf<Element> = document.querySelectorAll('a[href^="#"]');
        anchors.forEach((anchor: Element) => {
            anchor.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const targetId: string | null = (anchor as HTMLAnchorElement).getAttribute('href');
                if (targetId) {
                    const target: HTMLElement | null = document.querySelector(targetId);
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

    private setupScrollEffect(): void {
        window.addEventListener('scroll', () => {
            const currentScroll: number = window.pageYOffset;
            
            if (this.header) {
                if (currentScroll > 100) {
                    this.header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                } else {
                    this.header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Клас для управління формою
class FormManager {
    private contactForm: HTMLFormElement | null;

    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }

    private init(): void {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e: Event) => this.handleSubmit(e));
        }
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        
        if (!this.contactForm) return;

        const formData: FormData = new FormData(this.contactForm);
        const name: string = (formData.get('name') as string) || '';
        const email: string = (formData.get('email') as string) || '';
        const message: string = (formData.get('message') as string) || '';
        
        // Валідація
        if (name && email && message) {
            this.showSuccessMessage();
            this.contactForm.reset();
        } else {
            this.showErrorMessage('Будь ласка, заповніть всі поля форми.');
        }
    }

    private showSuccessMessage(): void {
        const modalManager: ModalManager = new ModalManager();
        modalManager.open('Успіх!', 'Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
    }

    private showErrorMessage(message: string): void {
        alert(message);
    }
}

// Ініціалізація додатку
class App {
    private modalManager!: ModalManager;
    private scrollAnimations!: ScrollAnimations;
    private apiManager!: ApiManager;
    private navigationManager!: NavigationManager;
    private formManager!: FormManager;

    constructor() {
        // Чекаємо завантаження DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    private init(): void {
        this.modalManager = new ModalManager();
        this.scrollAnimations = new ScrollAnimations();
        this.apiManager = new ApiManager();
        this.navigationManager = new NavigationManager();
        this.formManager = new FormManager();
        
        console.log('App initialized successfully');
    }
}

// Запуск додатку - обгортаємо в IIFE для виконання без модулів
(function() {
    const app: App = new App();
})();

