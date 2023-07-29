# kics-scan disable=9bae49be-0aa3-4de5-bab2-4c3a069e40cd
# --- base stage --- #

FROM alpine:3.18 AS base

# hadolint ignore=DL3018
RUN apk add --no-cache --update nodejs=18.17.0-r0

WORKDIR /action

ENTRYPOINT [ "node" ]

# --- build stage --- #

FROM base AS build

# hadolint ignore=DL3018
RUN apk add --no-cache npm=9.6.6-r0

# slience npm
# hadolint ignore=DL3059
RUN npm config set update-notifier=false audit=false fund=false

# install packages
COPY action/package* ./
COPY action/install.js ./
RUN node install.js

# --- app stage --- #

FROM base AS app

LABEL com.github.actions.name="Conventional Commit Lint" \
  com.github.actions.description="commitlint your PRs with Conventional style" \
  com.github.actions.icon="search" \
  com.github.actions.color="red" \
  maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

# copy from build image
COPY --from=build /usr/local/lib/node_modules /usr/lib/node
COPY --from=build /action/node_modules ./node_modules

# copy files
COPY action ./

USER node

HEALTHCHECK NONE

CMD ["/action/index.js"]
