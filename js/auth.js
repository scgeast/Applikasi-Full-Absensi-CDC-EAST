// js/auth.js
import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    signOut, 
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

export class AuthManager {
    // Login function
    static async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Logout function
    static async logout() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Change password function
    static async changePassword(currentPassword, newPassword) {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: "User not authenticated" };
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Check auth state
    static onAuthChange(callback) {
        return onAuthStateChanged(auth, callback);
    }

    // Get current user
    static getCurrentUser() {
        return auth.currentUser;
    }
}
