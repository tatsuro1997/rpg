build:
	docker compose build

up:
	docker compose up

bash:
	docker container exec -it rpg-app-1 sh

lint:
	npm run lint

seed:
	npm run seed

reset-db:
	npm run resetdb
