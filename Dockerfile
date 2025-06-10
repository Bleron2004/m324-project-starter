# 1) Basis-Image
FROM node:18-alpine

# 2) Arbeitsverzeichnis im Container
WORKDIR /app

# 3) package.json und Lockfile kopieren
COPY package.json package-lock.json ./

# 4) Dependencies installieren
RUN npm ci

# 5) Restlichen Code kopieren
COPY . .

# 6) Build ausführen (falls du einen Build-Schritt hast)
RUN npm run build

# 7) Container-Port freigeben (je nach App-Port)
EXPOSE 3000

# 8) Start-Befehl
CMD ["npm", "run", "start"]
