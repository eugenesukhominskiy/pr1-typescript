import { ModalManager } from './modal-manager';

// Клас для управління формою
export class FormManager {
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

