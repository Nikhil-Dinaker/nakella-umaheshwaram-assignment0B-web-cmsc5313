import { signOutFirebase } from "./firebase_auth.js";

export async function onClickSignoutMenu(e) {
    await signOutFirebase(e);
}