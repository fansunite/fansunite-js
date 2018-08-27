#!/usr/bin/env bash

cd node_modules/fansunite-core;
truffle compile
truffle migrate --network=dev --reset --all
cp build/contracts/BetManager.json ../../src/artifacts/BetManager.json
cp build/contracts/Vault.json ../../src/artifacts/Vault.json
cp build/contracts/League001.json ../../src/artifacts/League001.json
cp build/contracts/LeagueRegistry.json ../../src/artifacts/LeagueRegistry.json
cp build/contracts/Registry.json ../../src/artifacts/Registry.json