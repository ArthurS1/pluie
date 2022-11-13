| Frontend | Backend |
|---------|----------|
|[![Deploy Front](https://github.com/ArthurS1/pluie/actions/workflows/azure-static-web-apps-proud-pebble-0506c4700.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/azure-static-web-apps-proud-pebble-0506c4700.yml)|[![Deploy Back](https://github.com/ArthurS1/pluie/actions/workflows/deploy_back.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/deploy_back.yml)|
|[![Frontend Testing](https://github.com/ArthurS1/pluie/actions/workflows/front_tests.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/front_tests.yml)|[![Backend Testing](https://github.com/ArthurS1/pluie/actions/workflows/back_tests.yml/badge.svg)](https://github.com/ArthurS1/pluie/actions/workflows/back_tests.yml)|

----

# pluie
A weather app for academic purpose.

# Goals
- Have sane development principles
- Use of teamwork
- Showcase the use of cloud resources with Azure Student account

# How to run locally
- set the API_URL environment variable
- locate and run the compose.yml file
- enjoy !

# How to run on the cloud
- each push on main invoques the CI
- the CI tests the frontend and backend
- the CI deploys the apps on Azure
