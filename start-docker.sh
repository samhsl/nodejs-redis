docker run -d --name samuel-laluyan -p 8080:8080 \
-e SERVER_PORT=<your_available_port> \
-e DATABASE_URL=<mongodb_host> \
-e JWT_KEY=<jwt_key> \
-e REDIS_URL=<redis_host> \
-e REDIS_PORT=<redis_port> \
-e REDIS_PASSWORD=<redis_password> \
samuel-laluyan:latest
