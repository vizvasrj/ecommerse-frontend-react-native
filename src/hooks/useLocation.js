import React, { useState, useEffect } from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
    // console.log("callback", callback, shouldTrack)
    const [err, setErr] = useState(null);
    const [subscriber, setSubscriber] = useState(null);
    
    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            let {status} = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErr("Permission to access location was denied");
                return;
            }
            subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
                callback
                // ()
            );   
            // subscriber.remove
            // setSubscriber(sub);
            
        }
    

        console.log("shouldtrack", shouldTrack)
        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
            // setSubscriber(null);
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };

    },[shouldTrack, callback, subscriber]);

    return [err];
}