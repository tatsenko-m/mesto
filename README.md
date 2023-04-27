# <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tatsenko-m/mesto/main/docs/project-logo-dark.png"><img src="https://raw.githubusercontent.com/tatsenko-m/mesto/main/docs/project-logo-light.png" width="200" alt="Лого проекта"></picture> ![GitHub repo size](https://img.shields.io/github/repo-size/tatsenko-m/mesto) ![GitHub top language](https://img.shields.io/github/languages/top/tatsenko-m/mesto)
Проект по разработке сервиса Mesto: интерактивной страницы, куда можно добавлять фотографии, удалять их и ставить лайки.

Открыть демо:

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)](https://tatsenko-m.github.io/mesto/)

<picture>
  <img src="https://raw.githubusercontent.com/tatsenko-m/mesto/main/docs/mesto-screen-rec.gif" alt="Анимация с демо интерфейса">
</picture>

## Функциональность
- Добавление/удаление карточки с фотографией и подписью
- Просмотр карточек, добавленных другими пользователями
- Постановка/снятие лайка у каждой карточки
- Счетчик количества лайков
- Просмотр полноразмерного фото карточки в отдельном модальном окне
- Редактирование имени профиля и информации о себе
- Обновление аватара
- Подгрузка информации с сервера
- Валидация всех форм ввода данных

## Технологии
📐 **Верстка**
* Флексбокс-верстка
* Grid Layout
* "Резиновая" верстка, относительные размеры, функция `calc()`
* Адаптивная верстка, медиазапросы `@media`
* Относительное и абсолютное позиционирование элементов
* Изменение состояний элементов через `:hover` с плавным переходом `transition`

⚙️ **JavaScript**
* Работа с DOM-моделью, поиск элементов с помощью `querySelector`
* Работа с классами, разбиение кода на модули
* Получение значений полей ввода из свойства `value`
* Управление содержимым через свойство `.textContent`
* Метод `addEventListener`
* Создание элементов с помощью тега `template`
* Клонирование элементов методом `cloneNode`
* Метод `forEach` для обхода массива
* Валидация с помощью свойства `ValidityState`
* Создание массива из объекта с помощью `Array.from()`
* Обращение к свойству `key` объекта `event`
* Асинхронный код
* Работа с API, `fetch` запросы.

📁 **Методология БЭМ. Файловая структура Nested**

💡 **Парадигма ООП**

📦 **Сборка модулей:**

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black) ![PostCSS](https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

## Инструкция по установке

Клонируем репозиторий:
```bash
git clone https://github.com/tatsenko-m/mesto.git
```
Устанавливаем зависимости:
```bash
cd mesto

npm install
```
Для запуска используем команды:
```bash
npm run dev
# Запуск проекта в режиме разработки.
# Для просмотра результатов в браузере откройте http://localhost:8080.
# После внесения изменений страница перезагрузится автоматически.

npm run build
# Создает в папке dist финальную сборку проекта,
# готовую к развертыванию.
```
