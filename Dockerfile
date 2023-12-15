FROM mcr.microsoft.com/playwright:v1.39.0-jammy

COPY . /playwright-tests
WORKDIR /playwright-tests

RUN npm ci

CMD ["npm", "test"]