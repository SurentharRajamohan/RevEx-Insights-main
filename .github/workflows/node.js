# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x, 22.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        cache-dependency-path: 'Frontend/react-chartjs-app/package-lock.json' # THIS PATTERN did the trick for me.

    - name: Install dependencies
      run: |
        cd ./Frontend/react-chartjs-app
        npm ci

    - name: Build the project
      run: |
        cd ./Frontend/react-chartjs-app
        npm run build --if-present

    - name: Run tests
      run: |
        cd ./Frontend/react-chartjs-app
        npm test
