# ContactGraph

Веб-приложение для управления контактами и визуализации связей между людьми в виде интерактивного графа.

Командный проект.

## Функциональность

### Реализовано

- Добавление, редактирование и удаление контактов.
- Просмотр списка контактов.
- Хранение данных в SQLite.
- REST API для взаимодействия клиента с сервером.

### В разработке

- Пользовательский интерфейс на Mantine.
- Интерактивная визуализация графа контактов.
- Управление связями между контактами.
- Поиск и фильтрация контактов.

## Технологический стек

| Frontend   | Backend    | Инструменты  |
| ---------- | ---------- | ------------ |
| React      | Express    | Git / GitHub |
| TypeScript | TypeScript | Jira         |
| Vite       | Prisma     | ESLint       |
| CSS        | SQLite     | Prettier     |

## Структура проекта

```text
ContactGraph/
├── frontend/           # Клиентская часть
│   └── src/
├── backend/            # Серверная часть
│   ├── src/
│   ├── prisma/
│   └── migrations/
├── .vscode/            # Настройки редактора
├── .prettierrc         # Конфигурация Prettier
├── .prettierignore
├── .gitignore
├── package.json
└── README.md
```

## Установка и запуск

Для работы необходимы Node.js, npm и Git.

### 1. Клонирование репозитория

```bash
git clone https://github.com/gl0s3/ContactGraph.git
cd ContactGraph
```

### 2. Установка зависимостей

```bash
npm ci
npm run setup
```

### 3. Инициализация базы данных

```bash
npm run db:migrate
```

### 4. Запуск приложения

```bash
npm run dev
```

После запуска:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

Для остановки приложения используйте Ctrl+C.

## Команды разработки

Все команды выполняются из корневой директории проекта.

| Команда                | Назначение                                |
| ---------------------- | ----------------------------------------- |
| `npm run setup`        | Установка зависимостей frontend и backend |
| `npm run dev`          | Одновременный запуск frontend и backend   |
| `npm run dev:front`    | Запуск frontend                           |
| `npm run dev:back`     | Запуск backend                            |
| `npm run db:migrate`   | Применение миграций базы данных           |
| `npm run build`        | Сборка frontend                           |
| `npm run lint`         | Проверка кода ESLint                      |
| `npm run format`       | Форматирование кода                       |
| `npm run format:check` | Проверка форматирования                   |

## REST API

| Метод  | Endpoint        | Назначение                 |
| ------ | --------------- | -------------------------- |
| GET    | `/contacts`     | Получение списка контактов |
| POST   | `/contacts`     | Создание контакта          |
| PUT    | `/contacts/:id` | Обновление контакта        |
| DELETE | `/contacts/:id` | Удаление контакта          |

## Стиль кода

В проекте используются ESLint и Prettier.
