# CELSIUS 📡

[![pipeline status](https://gitlab.com/jovici_a/celsius/badges/main/pipeline.svg)](https://gitlab.com/jovici_a/celsius/-/commits/main)

## Getting started

Yo bg !
Voici le gitlab privé pour le développement de CELSIUS

## Init le projet

Même si je pense que tout le monde sait

```
cd existing_repo
git remote add origin https://gitlab.com/gpe-etna/celsius.git
git branch -M main
git push -uf origin main
```

## Documentation

La documentation est disponible dans le directory "Documentation"

## Launch

### First time ?

`docker-compose up --build` to build and up containers.

Once up, you should be able to **access Express IHM** [here](http://localhost:3000)

Once up, you should be able to **access Dotnet Agregator** [here](http://localhost:5001)

### Troubleshooting

`docker exec -it dotnet-api sh` to get a **shell** inside the dotnet container

`docker exec -it express-api sh` to get a **shell** inside the express container

Sinon soyez pas timides, vous m'appelez.

#### Manage Docker containers and volumes

`docker ps` to **show** containers (running or not).

`docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)` to **stop** ALL docker containers or `drm` if you have aliases (ask me about it)

`docker volume rm $(docker volume ls -q)` to **remove ALL volumes** (most often used to drop the database & restart from a fresh DB) or `drmv` if you have aliases (ask me about it)

## Ressources intéressantes (j'espère)

🦊 GitLab : https://gitlab.com/jovici_a/celsius

📗 RoadMap : https://docs.google.com/spreadsheets/d/1_rCwqq7pEL2UId8GgORfLS0NrGeNZ939afM-H9JpHGY/edit?usp=sharing

📂 Drive GPE : https://drive.google.com/drive/folders/1O9uLnfrEpbCug2HrgKtP3tpfyVlD6wRc?usp=sharing

🖊 Figma : https://www.figma.com/file/D4iN1JMy18Trx4jSIGcug7/GPE?type=design&node-id=161-46&mode=design

☎ Numéro de tel de Aleks : 06 26 37 57 19

## Membres

Aleksandar JOVICIC

Maxence VACHERON

Raphael ALAUX

Yannis TUDEAU

Timothée DOUDON

Paul LEQUEUX

Julien TOSTI

Adrien PLATEVOET
