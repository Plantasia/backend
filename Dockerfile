FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY . .

# Expose API port
EXPOSE 3333

RUN yarn && rm -rf ./build && yarn build

CMD [ "yarn", "start:dev" ]
