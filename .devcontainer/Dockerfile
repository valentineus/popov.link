FROM mcr.microsoft.com/devcontainers/base:bookworm

RUN apt-get update && apt-get install -y \
    curl \
    tar \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV ZOLA_VERSION=0.19.1

    RUN curl -L https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz -o zola.tar.gz \
    && tar -xzf zola.tar.gz \
    && mv zola /bin/zola \
    && rm zola.tar.gz