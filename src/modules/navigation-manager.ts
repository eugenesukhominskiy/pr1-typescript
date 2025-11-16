// Клас для управління навігацією
export class NavigationManager {
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

