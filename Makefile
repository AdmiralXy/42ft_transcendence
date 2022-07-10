PROJECT_NAME = ft_transcendence
PROJECT_DIRECTORY = docker

all:
	docker-compose -p $(PROJECT_NAME) up -d

build:
	docker-compose -p $(PROJECT_NAME) build

stop:
	docker-compose -p $(PROJECT_NAME) stop

restart: stop all

list:
	@echo "\033[0;34mList of available containers:\033[0m"
	@docker ps
	@echo "\033[0;34mImages:\033[0m"
	@docker images ls
	@echo "\033[0;34mNetworks:\033[0m"
	@docker network ls
	@echo "\033[0;34mVolumes:\033[0m"
	@docker volume ls

clean:
	@docker stop $$(docker ps -qa) || true
	@docker rm $$(docker ps -qa) || true
	@docker rmi -f $$(docker images -qa) || true
	@docker volume rm $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q) 2>/dev/null || true

fclean: clean
	docker system prune -a

re: clean build all
