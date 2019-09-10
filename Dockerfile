FROM node:10

WORKDIR /webapp

COPY . /webapp

RUN yarn global add @quasar/cli && \
    yarn install

RUN chmod +x ./scripts/start.sh

CMD ["sh", "./scripts/start.sh"]
