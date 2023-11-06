push:
	git remote | xargs -L1 git push --all

pull:
	git remote | xargs -L1 git pull --all

docker-build:
	docker build -t paradoxe-portfolio -f docker/Dockerfile .


docker-build-ci:
	docker build -t paradoxe-portfolio-ci -f docker/Dockerfile.ci .
