# Інструкція з налаштування GitHub Pages

## Крок 1: Налаштування GitHub Pages в Settings

1. Перейдіть на GitHub у ваш репозиторій: https://github.com/eugenesukhominskiy/pr1-typescript

2. Натисніть на вкладку **Settings** (у верхньому меню репозиторію)

3. У лівому меню знайдіть і натисніть **Pages**

4. У розділі **Source** (Джерело):
   - Виберіть **Deploy from a branch** з випадаючого списку
   - У полі **Branch** виберіть **gh-pages** (ця гілка буде створена автоматично після першого запуску workflow)
   - У полі **Folder** залиште **/ (root)**

5. **ВАЖЛИВО:** У розділі **Custom domain** (Кастомний домен):
   - **НЕ додавайте** кастомний домен
   - Якщо там щось вказано (наприклад, `pd44pr1typescript`), **видаліть це поле** і залиште його порожнім
   - Просто натисніть **Save** (Зберегти) без введення домену

6. Натисніть **Save** (Зберегти)

## Крок 2: Перевірка workflow

1. Перейдіть на вкладку **Actions** у вашому репозиторії

2. Виберіть workflow **"Deploy to GitHub Pages"**

3. Перевірте, чи workflow виконується успішно (зелена галочка)

4. Після успішного виконання сайт буде доступний за адресою:
   ```
   https://eugenesukhominskiy.github.io/pr1-typescript/
   ```

## Важливо!

- GitHub Pages має бути налаштований в **Settings репозиторію**, а не в Settings гілки
- Джерело має бути **GitHub Actions**, а не "Deploy from a branch"
- Перший запуск може зайняти кілька хвилин

## Якщо workflow не працює

1. Перевірте, чи правильно налаштований GitHub Pages в Settings
2. **Переконайтеся, що поле "Custom domain" порожнє** (не вказано жодного домену)
3. Перевірте логи workflow в розділі Actions
4. Переконайтеся, що ви на правильній гілці (feature/tsconfig)

## Помилка "Custom domain is not properly formatted"

Якщо ви бачите цю помилку:
1. Перейдіть в Settings → Pages
2. Знайдіть розділ **Custom domain**
3. **Видаліть** все, що вказано в полі Custom domain (залиште порожнім)
4. Натисніть **Save**
5. GitHub Pages буде працювати зі стандартним доменом: `eugenesukhominskiy.github.io/pr1-typescript`

