.PHONY: build debug withdocker-debug withdocker

default: build

build:
	sudo /usr/local/bin/jpm xpi

debug:
	/usr/local/bin/jpm run -b /usr/bin/firefox

withdocker-debug:
	docker build -t schahal/ff-addon .
	docker run -it --rm -e DISPLAY=${DISPLAY} -v /tmp/.X11-unix:/tmp/.X11-unix schahal/ff-addon /usr/local/bin/jpm run -b /usr/bin/firefox

withdocker:
	build/docker_xpi_cp.sh

clean:
	/bin/rm -rf *.xpi 
