# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# --- Stage 2: Build Backend ---
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# --- Stage 3: Final Production Image ---
FROM node:20-alpine
WORKDIR /app

# Copy backend application
COPY --from=backend-builder /app/backend/package*.json ./
RUN npm install --production
COPY --from=backend-builder /app/backend/dist ./dist

# Copy frontend build to backend's public folder
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 3000
CMD ["node", "--max-old-space-size=256", "dist/main"]
