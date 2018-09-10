#!/usr/bin/env bash
set -o errexit

trap cleanup EXIT

cleanup() {
  if [ ! -z "$ganache_pid" ]; then
    kill -9 $ganache_pid
  fi
}

is_running() {
  nc -z localhost 8545
}

start_ganache() {
  node_modules/.bin/ganache-cli -i 15 --gasLimit 90000000 > /dev/null &
  ganache_pid=$!
}

init() {
  if is_running; then
    echo "Using existing ganache instance"
  else
    echo "Starting our own ganache instance"
    start_ganache
  fi

  if [ "$SOLIDITY_COVERAGE" = true ]; then
    node_modules/.bin/solidity-coverage
  else
    cd node_modules/fansunite-core
    truffle migrate --network=dev --reset --all
    cp build/contracts/BetManager.json ../../lib/src/artifacts/BetManager.json
    cp build/contracts/Vault.json ../../lib/src/artifacts/Vault.json
    cp build/contracts/League001.json ../../lib/src/artifacts/League001.json
    cp build/contracts/LeagueRegistry.json ../../lib/src/artifacts/LeagueRegistry.json
    cp build/contracts/Registry.json ../../lib/src/artifacts/Registry.json
    ../../node_modules/.bin/mocha ../../lib/test/*.js
  fi

  cleanup
}

init