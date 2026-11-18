# node:lts-alpine as of 2026/11/17
FROM node:26-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS builder

# Install SSL ca certificates
RUN apk update && apk add ca-certificates && npm install -g yarn

# Create appuser
RUN adduser -D -g '' appuser

# get the source code
WORKDIR /javascript-analyzer
COPY . .

# Install without arguments runs yarn prepublish
RUN yarn install

# Only install the node_modules we need
RUN yarn install --production --modules-folder './production_node_modules'

# Build a minimal and secured container
FROM node:26-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /javascript-analyzer/package.json /opt/analyzer/package.json
COPY --from=builder /javascript-analyzer/bin /opt/analyzer/bin
COPY --from=builder /javascript-analyzer/dist /opt/analyzer/dist
COPY --from=builder /javascript-analyzer/production_node_modules /opt/analyzer/node_modules
USER appuser
WORKDIR /opt/analyzer
ENTRYPOINT ["/opt/analyzer/bin/analyze.sh"]
