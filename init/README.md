# Configurer / Mettre à jour les noms des arrêts

## Ajout des entities sur Dialogflow

Pour répondre correctement, le module NLP (Dialogflow) utilisé par Tipigee doit connaître le nom de tous les arrêts ainsi que leur *stopCode*.

> Le *stopCode* est un identifiant unique pour chaque arrêt (commercial) composé de 4 lettres. Par exemple, l'arrêt *Palettes* correspond au stopCode PALE.

1. Récupérer la liste de tous les arrêts avec leur nom et leur stopCode au format json.

```bash
curl http://prod.ivtr-od.tpg.ch/v1/GetStops?key=<token> > init/data/stops.json
```

2. Formater les données récupérer pour les importer dans Dialogflow

```bash
cd init
node parseStop.js
```

3. Importer les données dans Dialogflow : Dans *Entities*, sélectionner *Upload entity* et uploader le fichier `init/data/entities-nlp.json`. Si l'entité *StopName* existe déjà, il faut la supprimer.

> Pour une meilleure reconnaissance, il est nécessaire de compléter les synonymes des arrêts pour anticiper ce que les utilisateurs peuvent taper. Par exemple, pour l'arrêt "Saint-Julien-Gare", on pourrait rajouter "St Ju gare", "St-Ju-gare" ou encore "Gare saint julien".

## Initialisation de redis

Pour les statistiques d'utilisation, il est nécessaire de fournir la liste des stopCodes à la base de données redis. Une fois que le fichier `init/data/entities-nlp.json` est créé, lancer cette commande :

```bash
cd init
node init-db.js
# CTRL + C lorsque "Finished." s'affiche
```

