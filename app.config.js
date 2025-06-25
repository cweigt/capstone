import 'dotenv/config';

export default {
    "expo": {
        "name": "MobileApp",
        "slug": "MobileApp",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "myapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "supportsTablet": true
        },
        "android": {
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
                "projectId": "e81b6cf0-43cc-43b6-b0ae-c4d1092a1881"
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
