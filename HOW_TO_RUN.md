# Як запустити проект

## Варіант 1: Запуск локально (на вашому комп'ютері)

### Крок 1: Встановити залежності
```bash
npm install
```

### Крок 2: Скомпілювати TypeScript
```bash
npm run build
```

### Крок 3: Відкрити сайт у браузері
Просто відкрийте файл `index.html` у вашому браузері:
- Знайдіть файл `index.html` у папці проекту
- Клікніть на нього правою кнопкою миші
- Виберіть "Open with" → ваш браузер (Chrome, Firefox, Edge)

АБО використайте локальний сервер (рекомендовано):

**Windows (PowerShell):**
```powershell
# Встановіть http-server глобально (якщо ще не встановлено)
npm install -g http-server

# Запустіть сервер
http-server -p 8080
```

Потім відкрийте в браузері: `http://localhost:8080`

## Варіант 2: Запуск на GitHub Pages (онлайн)

### Крок 1: Переконайтеся, що workflow виконався успішно
1. Перейдіть на GitHub: https://github.com/eugenesukhominskiy/pr1-typescript
2. Відкрийте вкладку **Actions**
3. Перевірте, що останній workflow має зелений прапорець ✅

### Крок 2: Налаштуйте GitHub Pages
1. Перейдіть в **Settings** репозиторію
2. У лівому меню виберіть **Pages**
3. У розділі **Source**:
   - Виберіть **"Deploy from a branch"**
   - У полі **Branch** виберіть **`gh-pages`** (якщо її немає в списку, дочекайтеся кількох хвилин після виконання workflow)
   - У полі **Folder** виберіть **`/ (root)`**
4. Натисніть **Save**

### Крок 3: Дочекайтеся активації
- Після налаштування GitHub Pages активується через 1-2 хвилини
- Сайт буде доступний за адресою:
  ```
  https://eugenesukhominskiy.github.io/pr1-typescript/
  ```

## Перевірка статусу GitHub Pages

Якщо сайт не відкривається:
1. Перевірте, чи існує гілка `gh-pages`:
   - Перейдіть на GitHub
   - Натисніть на "main" (вибір гілки) у верхній частині репозиторію
   - Перевірте, чи є гілка `gh-pages` в списку

2. Якщо гілки `gh-pages` немає:
   - Запустіть workflow вручну:
     - Перейдіть в **Actions**
     - Виберіть **"Deploy to GitHub Pages"**
     - Натисніть **"Run workflow"**
     - Виберіть гілку `feature/tsconfig`
     - Натисніть **"Run workflow"**

3. Перевірте налаштування в Settings → Pages:
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`

## Швидкий локальний запуск (одна команда)

Якщо хочете запустити локально швидко, використайте Python (якщо встановлений):

**Windows:**
```powershell
# Python 3
python -m http.server 8080
```

Потім відкрийте: `http://localhost:8080`

