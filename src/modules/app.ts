import { ModalManager } from './modal-manager';
import { ScrollAnimations } from './scroll-animations';
import { ApiManager } from './api-manager';
import { NavigationManager } from './navigation-manager';
import { FormManager } from './form-manager';

// Ініціалізація додатку
export class App {
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

