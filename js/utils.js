// js/utils.js
import { db } from './firebase-config.js';
import { 
    collection, 
    query, 
    where, 
    getDocs,
    doc,
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

export class Utils {
    // Format date to Indonesian format
    static formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format time
    static formatTime(date) {
        return new Date(date).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Calculate overtime hours
    static calculateOvertime(checkIn, checkOut, shiftEnd) {
        const checkOutTime = new Date(checkOut).getTime();
        const shiftEndTime = new Date(shiftEnd).getTime();
        
        if (checkOutTime > shiftEndTime) {
            const overtimeMs = checkOutTime - shiftEndTime;
            const overtimeHours = (overtimeMs / (1000 * 60 * 60)).toFixed(2);
            return parseFloat(overtimeHours);
        }
        return 0;
    }

    // Get user role
    static async getUserRole(userId) {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                return userDoc.data().role || 'user';
            }
            return 'user';
        } catch (error) {
            console.error('Error getting user role:', error);
            return 'user';
        }
    }

    // Filter data by date range
    static filterByDateRange(data, startDate, endDate, dateField = 'date') {
        if (!startDate || !endDate) return data;
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of day
        
        return data.filter(item => {
            const itemDate = new Date(item[dateField]);
            return itemDate >= start && itemDate <= end;
        });
    }

    // Show loading spinner
    static showLoading() {
        let spinner = document.getElementById('loading-spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.id = 'loading-spinner';
            spinner.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                           background: rgba(0,0,0,0.5); display: flex; justify-content: center; 
                           align-items: center; z-index: 9999;">
                    <div style="background: white; padding: 2rem; border-radius: 10px;">
                        <div style="text-align: center;">
                            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #8B0000; 
                                      border-radius: 50%; width: 40px; height: 40px; 
                                      animation: spin 1s linear infinite; margin: 0 auto;"></div>
                            <p style="margin-top: 1rem;">Loading...</p>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            document.body.appendChild(spinner);
        }
        spinner.style.display = 'flex';
    }

    // Hide loading spinner
    static hideLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }
}
