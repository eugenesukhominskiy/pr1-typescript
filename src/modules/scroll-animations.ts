// Клас для управління анімаціями при скролі
export class ScrollAnimations {
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

