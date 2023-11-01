push:
	git remote | xargs -L1 git push --all

docker-build:
	docker build -t paradoxe-portfolio -f docker/Dockerfile .
