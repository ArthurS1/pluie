| Frontend | Backend |
|---------|----------|
|[![Deploy Front](https://github.com/ArthurS1/pluie/actions/workflows/azure-static-web-apps-proud-pebble-0506c4700.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/azure-static-web-apps-proud-pebble-0506c4700.yml)|[![Deploy Back](https://github.com/ArthurS1/pluie/actions/workflows/deploy_back.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/deploy_back.yml)|
|[![Frontend Testing](https://github.com/ArthurS1/pluie/actions/workflows/front_tests.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/front_tests.yml)|[![Backend Testing](https://github.com/ArthurS1/pluie/actions/workflows/back_tests.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/back_tests.yml)|

----

# Pluie
A weather dashboard designed for DES424 at SIIT, Thammasat University.

# Table of contents
- [Motivation and goals](#Motivation-and-goals)
- [Local deployment](#Local-deployment)
- [Cloud deployment](#Cloud-deployment)
- [User manual](#User-manual)

# Motivation and goals

## Motivation

As part of the DES424 course at SIIT we have to create a software project.
The allowed time is 4 months.

## Pedagogical gloals
- Have sane development principles
- Get used to teamwork
- Learn how to use cloud resources through the Azure platform

# Local deployment
1. Set the `API_URL` environment variable to 'http://localhost:8080'
2. Locate the docker-compose.yml file
3. Run `docker-compose up -d`.
If there is an error, please `docker-compose down` first or try with `docker-compose up --force-recreate -d`

# Cloud deployment
1. Fork this repository
- the CI tests the frontend and backend
- the CI deploys the apps on Azure

# User manual
Please find the user manual [on this page](http://google.fr)
