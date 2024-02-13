FROM ubuntu:20.04

USER root
#
RUN apt-get update \
    && apt-get -y install git git-flow git-lfs git-secret yamllint \ 
    && apt-get -y install python3 python3-pip python3-venv \
    && pip install pre-commit  

