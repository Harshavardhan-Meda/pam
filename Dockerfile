FROM node:12

COPY . /app/

ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV GENERATE_SOURCEMAP=false

RUN cd /app && npm install

WORKDIR /app

CMD [ "npm", "run", "start:docker" ]
