FROM node:12-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock /app/
RUN yarn install --freeze-lockfile

# Copying source files
COPY . /app

# Expose server
EXPOSE 8050

# Running the app
CMD yarn start
