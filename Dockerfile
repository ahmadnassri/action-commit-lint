FROM node:slim

LABEL com.github.actions.name="Conventional Commit Lint" \
      com.github.actions.description="commitlint your PRs with Conventional style" \
      com.github.actions.icon="search" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

RUN mkdir /action
WORKDIR /action

COPY action ./

# install packages globally
RUN node /action/install.js

# install locally
RUN npm ci --only=prod

ENTRYPOINT ["node", "/action/index.js"]
