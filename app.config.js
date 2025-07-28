import 'dotenv/config';

export default {
    "expo": {
        "name": "Aurora Agent",
        "slug": "aurora-agent",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "myapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "googleServicesFile": "./keys/Firebase/GoogleService-Info.plist",
            "supportsTablet": true,
            "bundleIdentifier": process.env.IOS_BUNDLE_ID || "com.aurorawdc.auroramobile",
            "infoPlist": {
                "ITSAppUsesNonExemptEncryption": false
            },
            "entitlements": {
                "aps-environment": process.env.NODE_ENV === 'production' ? "production" : "development"
            },
            // Universal links / Associated Domains
            "associatedDomains": [
                process.env.IOS_ASSOCIATED_DOMAIN || "applinks:aurorawdc.com"
            ]
        },
        "android": {
            "googleServicesFile": "./keys/Firebase/google-services.json",
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.aurorawdc.auroramobile"
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/favicon.png"
        },
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/splash-icon.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff"
                }
            ],
            "expo-font",
            "expo-web-browser"
        ],
        "experiments": {
            "typedRoutes": true
        },
        "extra": {
            "router": {},
            "eas": {
                "projectId": "842fb628-dfeb-4e71-8392-32f190b2dba5"
            },
            "firebaseApiKey": process.env.FIREBASE_API_KEY,
            "firebaseAuthDomain": process.env.FIREBASE_AUTH_DOMAIN,
            "firebaseduburl": process.env.FIREBASE_DB_URL,
            "firebaseProjectId": process.env.FIREBASE_PID,
            "firebaseStorageBucket": process.env.FIREBASE_STORAGE,
            "firebaseMessagingSenderId": process.env.FIREBASE_MSG_SENDERID,
            "firebaseAppId": process.env.FIREBASE_APPID,
            "firebaseMeasurementId": process.env.FIREBASE_MEASUREID
        }
    }
};
