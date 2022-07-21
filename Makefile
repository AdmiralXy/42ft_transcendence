PROJECT_NAME = ft_transcendence
PROJECT_DIRECTORY = docker

dev:
	docker-compose -p $(PROJECT_NAME) up -d

prod:
	docker-compose -p $(PROJECT_NAME) -f docker-compose.prod.yml -f docker-compose.yml up -d

stop:
	docker-compose -p $(PROJECT_NAME) stop

list:
	@echo "\033[0;34mList of available containers:\033[0m"
	@docker ps
	@echo "\033[0;34mImages:\033[0m"
	@docker images ls
	@echo "\033[0;34mNetworks:\033[0m"
	@docker network ls
	@echo "\033[0;34mVolumes:\033[0m"
	@docker volume ls

clean: stop
	@docker rm $$(docker ps -qa) || true
	@docker rmi -f $$(docker images -qa) || true
	@docker volume rm $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q) 2>/dev/null || true

fclean: clean
	docker system prune -a
