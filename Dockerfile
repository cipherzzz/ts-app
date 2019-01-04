FROM node:8 as native-build
COPY . .
RUN yarn
RUN yarn build:api

FROM node:carbon-alpine
WORKDIR /home/node/app
COPY --from=native-build /api/dist dist/
COPY --from=native-build /package.json .
COPY --from=native-build /node_modules node_modules/

EXPOSE 3000

USER node
CMD ["node", "dist/start-server"]