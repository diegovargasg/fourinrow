#docker run -p 5000:5000 -v /app/node_modules -v $(pwd):/app <IMG_ID>
# Specify base image
FROM node:12.20.2-alpine
WORKDIR "/app"

# Install dependencies
COPY ./package.json ./
RUN npm install
COPY . .

# Default command
CMD ["npm", "run", "start"]