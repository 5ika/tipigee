# Tipigee

Tipigee est un chatbot pour les [Transports Publics Genevois](https://tpg.ch/) utilisable par Facebook Messenger et Telegram.

- [Facebook Messenger](https://www.messenger.com/t/tipigee)
- [Telegram](https://telegram.me/tipigeebot)

Le programme de Tipigee est ouvert à la contribution. Il a été placé sous licence Open-Source dans le but d'être amélioré par le plus grand nombre.

Tipigee est basé sur le framework de chatbot [Messenja](https://github.com/5ika/messenja).

## Getting Started

Ces instructions permettent d'installer un environnement de développement pour Tipigee.

### Prérequis

- Un serveur avec une URL en https, accessible depuis Internet. Pour un développement local, vous pouvez utiliser https://ngrok.com/
- Un token d'accès à l'API pour chaque service que vous voulez utiliser (plus de détails sur la page de [Messenja](https://github.com/5ika/messenja))
- Un token d'accès à l'API des TPG. Voir la [page des TPG](http://www.tpg.ch/web/open-data/donnees-tpg) sur l'Open-data
- Un compte gratuit sur [Dialogflow](https://dialogflow.com/) qui permet de faire du NLP
- NodeJS >= 7.0
- Un serveur Redis

### Installation

#### Récupérer les sources de Tipigee et installer les dépendances

```bash
git clone https://github.com/5ika/tipigee
cd tipigee
npm install
```

#### Configurer Dialogflow

Sur Dialogflow, créer un nouvel agent et importer la configuration de Tipigee dans `init/Dialogflow-Tipigee.zip` et récupérer le *Developer access token* pour la configuration.

#### Configurer les accès aux différentes API

```bash
cp config.example.json config.json
nano config.json # Ajouter les tokens ainsi que l'URL du serveur
```

#### Mettre à jour les noms des arrêts

Voir [cette page](https://github.com/5ika/tipigee/blob/master/init/README.md).

#### Lancement du serveur Redis

Si vous utilisez Docker, vous pouver facilement lancer un serveur Redis localement :

```bash
docker run -d --restart always -v $PWD/data:/data --name redis-tipigee -p 6379:6379 redis:alpine
```

#### Lancement du serveur

```bash
node index
# OU
npm install -g nodemon
nodemon index # Le serveur est mis à jour à chaque modification
```

## Contributions

Ce projet est encore jeune et n'a pas encore de règles propres à respecter pour son développement.

N'importe qui est libre de faire des modifications et proposer des améliorations sous forme de Pull Request dans ce dépôt.

**Si vous souhaitez aider** mais que vous ne savez pas par où commencer, regarder les propositions d'améliorations dans les [Issues](https://github.com/5ika/tipigee/issues).

## Auteurs

- [Tim Izzo](https://github.com/5ika)

## Licence

Ce projet est placé sous licence [GPLv3](https://github.com/5ika/tipigee/blob/master/LICENSE).
