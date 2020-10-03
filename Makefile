include .env

.PHONY: up
up:
	docker-compose up -d
	docker-compose restart api


.PHONY: down
down:
	docker-compose down


.PHONY: logs
logs:
	docker-compose logs -f