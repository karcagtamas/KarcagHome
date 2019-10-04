FROM node:10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
EXPOSE 8000

# Time saver
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm run start


