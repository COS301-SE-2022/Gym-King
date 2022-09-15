#!/bin/bash
pushd front-end/android
chmod +x gradlew
./gradlew bundleRelease
popd
