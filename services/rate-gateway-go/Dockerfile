FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY . .
RUN go build -o rate-gateway .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/rate-gateway .
EXPOSE 8081
CMD ["./rate-gateway"]
