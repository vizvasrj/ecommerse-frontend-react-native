import { PermissionsAndroid, Platform } from 'react-native';


export async function requestAndroidLocationPermissions() {
    const isAndroid = Platform.OS === 'android';
    if (isAndroid) {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (granted) {
            // Check if both permissions were granted
            return granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            return false;
        }
    } else {
        throw new Error('You should only call this method on Android!');
    }
}