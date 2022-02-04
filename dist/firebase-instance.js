"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
class FirebaseInstance {
    constructor() {
        this.firebaseApp = undefined;
        this.firebaseApp = (0, app_1.initializeApp)({
            apiKey: "AIzaSyCG-sx8hrcHPef8okwcivViSsoxBc3-2vc",
            authDomain: "code-labs-e4e35.firebaseapp.com",
            projectId: "code-labs-e4e35",
            storageBucket: "code-labs-e4e35.appspot.com",
            messagingSenderId: "591323735595",
            appId: "1:591323735595:web:e70a5dc77234bfb8cd6c6e",
            measurementId: "G-P4TGK0P94N",
        });
    }
}
//# sourceMappingURL=firebase-instance.js.map