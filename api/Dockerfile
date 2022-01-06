# set base image (host OS)
FROM python:buster

# specify shell
SHELL ["/bin/bash", "-c"]

# make user
RUN groupadd -g 999 appgroup && \
    useradd -r -u 999 -g appgroup appuser
USER appuser

# set the working directory in the container
WORKDIR /home/appuser/app

# copy the content of the local src directory to the working directory
COPY --chown=appuser:appgroup fe_interview/ .

# install dependencies
RUN python3 -m pip install -r ./requirements.txt

# migrations
RUN python3 manage.py makemigrations && \
    python3 manage.py migrate

# expose port 8000 for django
EXPOSE 8000

# command to run on container start
CMD python manage.py runserver 0.0.0.0:8000
