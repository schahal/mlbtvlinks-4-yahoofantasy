FROM node:argon

# create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN npm install

RUN npm install jpm --global
RUN apt-get update
RUN apt-get install -y firefox-esr
RUN apt-get install -y sudo

# bundle app source
ADD . /usr/src/app/

# expose whichever ports you need here
# this app is an FF addon, so none
#EXPOSE 8080

# Replace 1000 with your user / group id
RUN export uid=1000 gid=1000 && \
    mkdir -p /home/developer && \
    echo "developer:x:${uid}:${gid}:Developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
    echo "developer:x:${uid}:" >> /etc/group && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
    chmod 0440 /etc/sudoers.d/developer && \
    chown ${uid}:${gid} -R /home/developer

USER developer
ENV HOME /home/developer

# command to run
#CMD [ jpm run --profile jpm-mlbtv4yfantasy -b /usr/bin/firefox" ]
#CMD [ "jpm", "run", "-b", "/usr/bin/firefox" ]
#CMD [ "sudo", "jpm", "xpi" ]
RUN make
