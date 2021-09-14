FROM zenika/alpine-chrome:with-puppeteer

USER root

WORKDIR /usr/src/app
COPY ./ ./

RUN chown -Rf chrome:chrome /usr/src/app

# Run everything after as non-privileged user.
USER chrome

#Build Backend
WORKDIR /usr/src/app
RUN yarn
# RUN yarn build

# EXPOSE 8080 3333

CMD ["node","src/index"]


