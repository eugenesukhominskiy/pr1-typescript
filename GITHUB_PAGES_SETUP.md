# Інструкція з налаштування GitHub Pages

## Крок 1: Налаштування GitHub Pages в Settings

1. Перейдіть на GitHub у ваш репозиторій: https://github.com/eugenesukhominskiy/pr1-typescript

2. Натисніть на вкладку **Settings** (у верхньому меню репозиторію)

3. У лівому меню знайдіть і натисніть **Pages**

4. У розділі **Source** (Джерело):
   - Виберіть **GitHub Actions** з випадаючого списку
   - НЕ вибирайте "Deploy from a branch"

5. Натисніть **Save** (Зберегти)

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
2. Перевірте логи workflow в розділі Actions
3. Переконайтеся, що ви на правильній гілці (feature/tsconfig)

