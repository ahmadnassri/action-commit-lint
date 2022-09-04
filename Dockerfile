FROM node:18-slim

LABEL com.github.actions.name="Conventional Commit Lint" \
      com.github.actions.description="commitlint your PRs with Conventional style" \
      com.github.actions.icon="search" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

# set working dir
RUN mkdir /action
WORKDIR /action

# slience npm
RUN npm config set update-notifier=false audit=false fund=false

# install packages
COPY action/package* ./
COPY action/install.js ./
RUN node install.js

# copy files
COPY action ./

# set entry point
ENTRYPOINT ["node", "/action/index.js"]
