FROM node:slim

LABEL com.github.actions.name="Conventional Commit Lint" \
      com.github.actions.description="commitlint your PRs with Conventional style" \
      com.github.actions.icon="search" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

# set working dir
RUN mkdir /action
WORKDIR /action

# install packages
COPY action/package* ./
COPY action/install.js ./
RUN node install.js

# copy files
COPY action ./

# set entry point
ENTRYPOINT ["node", "/action/index.js"]
