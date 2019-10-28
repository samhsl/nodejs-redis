docker run -d --name samuel-laluyan -p 8080:8080 \
-e TZ=Asia/Jakarta \
-e SERVER_PORT=8080 \
-e DATABASE_URL=mongodb://docker.for.mac.localhost/samuel-laluyan \
-e JWT_KEY=28Oct2019 \
-e REDIS_URL=docker.for.mac.localhost \
-e REDIS_PORT=6379 \
-e REDIS_PASSWORD= \
samuel-laluyan:latest
