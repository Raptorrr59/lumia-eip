#!/bin/bash

set -a
source .env
set +a

if [ -z "$USER_ID" ]; then
  echo "Erreur : USER_ID n'est pas défini dans le fichier .env"
  exit 1
fi

if [ "$IS_TRAINING" = "true" ]; then
  TARGET_DIR="train/${USER_ID}"
  echo "Création du dossier: $TARGET_DIR"
  mkdir -p "$TARGET_DIR"
else
  echo "IS_TRAINING n'est pas 'true', aucune création de dossier"
fi
