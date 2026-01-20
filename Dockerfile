# 1. Базовый образ
FROM node:20-alpine

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем package.json и lock-файл
COPY package*.json ./

# 4. Установка зависимостей
RUN npm i

COPY . .

# 6. Сборка (если есть build)
RUN npm run build

# 7. Открываем порт
EXPOSE 3000

# 8. Запуск приложения
CMD ["npm", "run", "start"]
