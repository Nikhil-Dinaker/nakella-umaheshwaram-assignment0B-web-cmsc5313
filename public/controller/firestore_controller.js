import {
	getFirestore, onSnapshot, doc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

import * as Constants from '../model/constants.js'
import { app } from "./firebase_core.js";

const db = getFirestore(app);

export async function initFirestoreDocs() {
	await setDoc(
		doc(db, Constants.COLLECTION, Constants.DOCNAME_BUTTONS), Constants.docButtons
	);
	await setDoc(
		doc(db, Constants.COLLECTION, Constants.DOCNAME_LEDS), Constants.docLEDs
	);
	await setDoc(
		doc(db, Constants.COLLECTION, Constants.DOCNAME_DISTANCE), Constants.docDistance
	);
	await setDoc(
		doc(db, Constants.COLLECTION, Constants.DOCNAME_CAMERA), Constants.docCamera
	);
}

export async function updateDocForLED(update) {
	const docRef = doc(db, Constants.COLLECTION, Constants.DOCNAME_LEDS);
	await updateDoc(docRef, update);
}

export function attachRealtimeListener(collection, document, callback) {
	const unsubscribeListener = onSnapshot(doc(db, collection, document), callback);
	return unsubscribeListener;
}