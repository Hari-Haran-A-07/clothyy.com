FROM rust:1.77-alpine AS builder
WORKDIR /app
COPY Cargo.toml ./
COPY src ./src
RUN cargo build --release

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/target/release/clothyyy-crypto-vault .
EXPOSE 8083
CMD ["./clothyyy-crypto-vault"]
