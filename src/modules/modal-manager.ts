// Клас для управління модальними вікнами
export class ModalManager {
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

