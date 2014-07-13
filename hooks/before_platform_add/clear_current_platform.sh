#!/bin/sh

clear_platform() {
  PLATFORM=$1
  rm -rf "platforms/$PLATFORM" "plugins/$PLATFORM.json" "plugins/com.phonegap.plugins.facebookconnect"
}

if test -d "platforms/android"; then
  if ! cat "platforms/android/assets/www/config.xml" | grep -q "id=\"$BUNDLE_ID\""; then
    echo "Current android app isn't named as $BUNDLE_ID, clearing it..." 
    clear_platform android
  fi
fi

if test -d "platforms/ios"; then
  if ! cat "platforms/ios/www/config.xml" | grep -q "id=\"$BUNDLE_ID\""; then
    echo "Current ios app isn't named as $BUNDLE_ID, clearing it..." 
    clear_platform ios
  fi
fi
