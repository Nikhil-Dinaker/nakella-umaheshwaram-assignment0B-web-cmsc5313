import {
    initFirestoreDocs,
    attachRealtimeListener,
    updateDocForLED,
} from "./firestore_controller.js";

import * as Constants from '../model/constants.js';

export let unsubButtonsDoc = null;
export let unsubDistanceDoc = null;
export let unsubCameraDoc = null;

export async function initConfigButtonClick() {
    try {
        await initFirestoreDocs();
        alert('Firestore collection initialized!')
    } catch (e) {
        console.log(`Init Config error:\n${e}`);
        alert(`Init Config error:\n${e}`);
    }
}

export function ledButtonClick(e) {
    const label = e.target.innerHTML;
    if (label == 'Turn ON') {
        e.target.innerHTML = 'Turn OFF';
        updateDocForLED({ led1: true });
    } else {
        e.target.innerHTML = 'Turn ON';
        updateDocForLED({ led1: false });
    }
}

export function statusMonitorButtonClick(e) {
    const label = e.target.innerHTML;
    if (label == 'Start') {
        e.target.innerHTML = 'Stop';
        // listen to Firestore doc changes
        unsubButtonsDoc = attachRealtimeListener(Constants.COLLECTION,
            Constants.DOCNAME_BUTTONS, buttonListener);
        unsubDistanceDoc = attachRealtimeListener(Constants.COLLECTION,
            Constants.DOCNAME_DISTANCE, distanceListener);
        unsubCameraDoc = attachRealtimeListener(Constants.COLLECTION,
            Constants.DOCNAME_CAMERA, cameraListener);
    } else {
        e.target.innerHTML = 'Start';
        const status1 = document.getElementById('status-button1');
        const status2 = document.getElementById('status-button2');
        const distance = document.getElementById('distance')
        status1.innerHTML = 'Not enabled';
        status2.innerHTML = 'Not enabled';
        distance.innerHTML = 'N/A';
        if (unsubButtonsDoc) unsubButtonsDoc();
        if (unsubDistanceDoc) unsubDistanceDoc();
        if (unsubCameraDoc) unsubCameraDoc();
    }
}

export function buttonListener(doc) {
    const status1 = document.getElementById('status-button1');
    const status2 = document.getElementById('status-button2');
    const buttonDoc = doc.data();
    if (buttonDoc['button1']) {
        status1.innerHTML = 'ON';
    } else {
        status1.innerHTML = 'OFF';
    }
    if (buttonDoc['button2']) {
        status2.innerHTML = 'ON';
    } else {
        status2.innerHTML = 'OFF';
    }
}

export function distanceListener(doc) {
    const distanceDoc = doc.data();
    const dist = distanceDoc['sensor1'];
    document.getElementById('distance').innerHTML = dist.toFixed(2);
}

export function cameraListener(doc) {
    const cameraDoc = doc.data();
    const url = cameraDoc['url'];
    const timestamp = cameraDoc['timestamp'];
    document.getElementById('image').src = url;
    // timestamp = ns while Date() takes ms
    document.getElementById('image-timestamp').innerText = new Date(timestamp / 1e6).toString();
}