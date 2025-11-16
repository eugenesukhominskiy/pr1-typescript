import { Post, User } from '../types';
import { ModalManager } from './modal-manager';

// Клас для роботи з API
export class ApiManager {
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

