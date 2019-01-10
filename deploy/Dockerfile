FROM node:8 as native-build
COPY . .
RUN yarn
RUN yarn build:api

FROM node:carbon-alpine
WORKDIR /home/node/app
COPY --from=native-build . .

EXPOSE 3000

USER node
CMD ["node", "api/dist/start-server"]