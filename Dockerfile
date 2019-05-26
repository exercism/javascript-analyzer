FROM node:8.16-alpine as builder

# Install SSL ca certificates
#RUN apk update && apk add git && apk add ca-certificates

# Create appuser
#RUN adduser -D -g '' appuser && mkdir /go-analyzer
RUN mkdir /javascript-analyzer

# source code
WORKDIR /javascript-analyzer

# get the rest of the source code
COPY . /javascript-analyzer

# build
RUN yarn install && yarn build

# Build a minimal and secured container
FROM node:8.16-alpine
#COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
#COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /javascript-analyzer/bin /opt/analyzer/bin
COPY --from=builder /javascript-analyzer/dist /opt/analyzer/dist
COPY --from=builder /javascript-analyzer/node_modules /opt/analyzer/node_modules
RUN chmod +x /opt/analyzer/bin/analyze.sh
#USER appuser
WORKDIR /opt/analyzer
ENTRYPOINT ["/opt/analyzer/bin/analyze.sh"]
