# 🌍 Travel Social Network

> Mini social network for travelers built with React.

---

## 🚀 Tech Stack

* **React**
* **Firebase** (Authentication + Firestore)
* **Socket (Real-time updates)**
* **SCSS**

---

## ✨ Features

### 🔐 Authentication

* User registration
* Login
* Logout

### 📝 Posts

* Create a post
* Delete own post
* Like posts
* Comment on posts (real-time)

### 👤 Users

* Open user profile by clicking avatar
* View user's posts feed
* Search users by name

---

## 🏠 Home Page

The home page contains three dynamic sections:

### 1️⃣ New Posts

* Automatically updated when a new post is created
* Displays the most recent posts

### 2️⃣ Most Liked Posts

* Maximum of **15 posts**
* Added when a post receives a like
* If fewer than 15 posts — they are simply added
* If more than 15 — the list keeps only the top 15 by likes

### 3️⃣ Top 15 Authors

* Ranked by number of created posts
* Displays 15 users with the highest post count

---

## 🔎 Search

* Search users by name
* Open selected user profile
* View their personal feed

---

## ⚡ Real-Time Functionality

Implemented using Socket:

* Live comment updates
* Instant UI synchronization between users

---

## 🧠 Project Purpose

This project was built to practice:

* React application architecture
* Firebase integration
* Real-time data handling
* State management
* Dynamic ranking systems

---

## 📦 Installation & Setup

```bash
npm install
npm start
```

---

## 🛠 Possible Improvements

* Add pagination
* Improve animations and UX
* Optimize queries
* Add unit tests

---

## 📌 Project Status

Educational project for demonstrating React and real-time development skills.



# 🌍 Travel Social Network

Мини‑соцсеть для путешественников, разработанная на **React**.

## 🚀 Технологии

* React
* Firebase (Authentication + Firestore)
* Socket
* SCSS

---

## 📌 Описание проекта

Приложение представляет собой мини‑социальную сеть для публикации постов о путешествиях.

Пользователь может:

* Зарегистрироваться
* Войти в аккаунт
* Выйти из аккаунта
* Создать пост
* Удалить свой пост
* Комментировать чужие посты
* Поставить лайк посту
* Открыть страницу пользователя (по нажатию на аватар)
* Найти пользователя по имени через поиск

---

## 🏠 Главная страница

На главной странице отображаются три блока:

### 1️⃣ Самые новые посты

* Посты добавляются автоматически при создании
* Отображаются последние опубликованные записи

### 2️⃣ Самые залайканные посты

* Пост попадает в список при получении лайков
* Максимум — 15 постов
* Когда в приложении больше 15 постов, при новом лайке происходит замена постов в списке
* Если постов меньше 15 — новые просто добавляются

### 3️⃣ Топ 15 авторов

* Формируется по количеству созданных постов
* Отображаются 15 пользователей с наибольшим числом публикаций

---

## 🔎 Поиск пользователей

Реализован поиск по имени.
При выборе пользователя открывается его профиль с лентой постов.

---

## 📝 Работа с постами

* Создание поста
* Удаление только своего поста
* Лайки
* Комментарии 

---

## 🔐 Аутентификация

Реализована через Firebase Authentication:

* Регистрация
* Авторизация
* Выход из аккаунта

---

## 🎯 Цель проекта

Практика работы с:

* Реальным временем (Socket)
* Firebase
* Архитектурой React‑приложения
* Управлением состоянием
* Динамическими списками и рейтингами

---

## 📦 Запуск проекта

```bash
npm install
npm start
```

---

## 📌 Статус проекта

Первый учебный проект для практики React и работы с реальным временем.
