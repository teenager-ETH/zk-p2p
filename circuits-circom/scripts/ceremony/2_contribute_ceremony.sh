#!/bin/bash

source circuit.env

R1CS_FILE="$BUILD_DIR/$CIRCUIT_NAME.r1cs"
PARTIAL_ZKEYS="$BUILD_DIR"/partial_zkeys
PHASE1="$PTAU_DIR/powersOfTau28_hez_final_$PTAU.ptau"

if [ ! -d "$BUILD_DIR"/partial_zkeys ]; then
    echo "No partial_zkeys directory found. Creating partial_zkeys directory..."
    mkdir -p "$BUILD_DIR"/partial_zkeys
fi

echo "****GENERATING ZKEY NONCHUNKED 1****"
start=$(date +%s)
set -x
NODE_OPTIONS='--max-old-space-size=112000' node ../circuits/$CIRCUIT_DIR/node_modules/.bin/snarkjs zkey contribute "$PARTIAL_ZKEYS"/"$CIRCUIT_NAME"_"$PREV_VERSION".zkey "$PARTIAL_ZKEYS"/"$CIRCUIT_NAME"_"$CURR_VERSION".zkey --name="1st Contributor Name" -v -e=$ENTROPY
{ set +x; } 2>/dev/null
end=$(date +%s)
echo "DONE ($((end - start))s)"
echo
