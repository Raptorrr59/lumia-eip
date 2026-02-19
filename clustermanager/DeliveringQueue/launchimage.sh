#!/bin/bash

USER_FILE=$(ls "$WORKDIR_PATH" | head -n 1)

# Regenerate gameselect with fresh random images for each game
if [ -d "dataset-imagerecognition" ]; then
    rm -rf gameselect
    python3 -u selection.py
fi

if [ "$GAME_NAME" == "image" ] && [ "$IS_TRAINING" == "true" ]; then
    TRAINING_DIR="/train${WORKDIR_PATH}"
    mkdir -p "${TRAINING_DIR}/${USER_ID}"

    MODEL_PATH="${TRAINING_DIR}/${USER_ID}/model.pt"

    echo "⚠️ Avant (entraînement CNN) ==="
    # User file is in the mounted volume (WORKDIR_PATH is the mount point)
    python3 -u "${USER_ID}_${GAME_NAME}.py" --train=True --dataset="dataset-imagerecognition" --model_path="${MODEL_PATH}"
    wait
    echo "✅ Fin entraînement ==="
else
    if [ "$GAME_NAME" == "image" ] && [ "$IS_TRAINING" == "false" ]; then
        cp "../train${WORKDIR_PATH}/${USER_ID}/model.pt" .
    fi

    LOGS_DIR="/logs/${USER_ID}"
    mkdir -p "${LOGS_DIR}"
    LOG_FILE="${LOGS_DIR}/${GAME_NAME}.json"
    echo "📄 Logs seront enregistrés dans : ${LOG_FILE}"
    python3 -u "${LOCAL_GAME}" >> "${LOG_FILE}" 2>&1 &

    sleep 5

    # Si connect4, on lance l'IA
    if [ "$GAME_NAME" == "connect4" ]; then
        python3 -u AI-connect4.py &
        sleep 2
    fi

    # Puis le jeu utilisateur - user file is in the mounted volume (WORKDIR_PATH is the mount point)
    python3 -u "${USER_ID}_${GAME_NAME}.py"
    wait
fi
