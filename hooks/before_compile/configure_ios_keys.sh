#!/bin/sh

# Exit, if there's no ios here.
test ! -d "platforms/ios" && exit

# to list all installed iOS identities, run:
#     security find-identity |  sed -n 's/.*\("[^"]*"\).*/\1/p' | grep 'iPhone'
#
# generic 'iPhone Developer' (no quotes) will match the right Identity with the right Provisioning Profile plus Certificate, based on the app bundle id

echo "CODE_SIGN_IDENTITY = $IOS_CODE_SIGN_IDENTITY" > platforms/ios/cordova/build.xcconfig
echo "iOS platform has been configured to sign the app with key '$IOS_CODE_SIGN_IDENTITY.'"
