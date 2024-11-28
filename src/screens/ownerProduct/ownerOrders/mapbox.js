import React, { useState } from 'react';
import { MapView, CircleLayer, UserLocation, Camera, UserTrackingMode, Viewport, ShapeSource, LineLayer } from '@rnmapbox/maps';
import { Button, Platform, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { ButtonGroup, Text } from '@rneui/base';

const DEFAULT_CENTER_COORDINATE = [40.7128, -74.0060];
const SettingsGroup = ({ children, label }) => (
    <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{label}</Text>
        {children}
    </View>
);

const styles = { matchParent: { flex: 1 } };

function humanize(name) {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map((i) => i.charAt(0).toUpperCase() + i.substring(1)).join(' ');
}

const ExampleRenderMode = {
    Normal: 'normal',
    Native: 'native',
    CustomChildren: 'customChildren',
    Hidden: 'hidden',
};

const ANDROID_RENDER_MODES = ['normal', 'compass', 'gps'];

const UserLocationRenderMode = () => {
    const [renderMode, setRenderMode] = useState(ExampleRenderMode.Normal);
    const [followUserLocation, setFollowUserLocation] = useState(true);
    const [followUserMode, setFollowUserMode] = useState(UserTrackingMode.Follow);
    const [showsUserHeadingIndicator, setShowsUserHeadingIndicator] = useState(false);
    const [androidRenderMode, setAndroidRenderMode] = useState('normal');
    const viewport = React.useRef(null);

    const [coords, setCoords] = useState([]);

    return (
        <SafeAreaView style={styles.matchParent}>
            <View>
                <Button
                    title={followUserLocation ? "Don`t follow User Location" : 'Follow user location'}
                    onPress={() => setFollowUserLocation(!followUserLocation)}
                />
                <Button
                    title={showsUserHeadingIndicator ? 'Hide user heading indicator' : 'Show user heading indicator'}
                    onPress={() => setShowsUserHeadingIndicator(!showsUserHeadingIndicator)}
                />
                <TouchableOpacity
                    onPress={() => {
                        console.log(' => log print', coords)
                    }}
                >
                    <Text>log print</Text>
                </TouchableOpacity>
                

                <SettingsGroup label="Follow User Mode">
                    <ButtonGroup
                        buttons={Object.values(UserTrackingMode)}
                        selectedIndex={Object.values(UserTrackingMode).indexOf(followUserMode)}
                        onPress={(index) => {
                            setFollowUserMode(Object.values(UserTrackingMode)[index]);
                        }}
                    />
                </SettingsGroup>

                {Platform.OS === 'android' && (
                    <SettingsGroup label="Android Render Mode">
                        <ButtonGroup
                            disabled={renderMode !== ExampleRenderMode.Native}
                            buttons={ANDROID_RENDER_MODES}
                            selectedIndex={ANDROID_RENDER_MODES.indexOf(androidRenderMode)}
                            onPress={(index) => {
                                setAndroidRenderMode(ANDROID_RENDER_MODES[index]);
                            }}
                        />
                    </SettingsGroup>
                )}
            </View>

            <MapView style={styles.matchParent} tintColor={'red'}>
                <Viewport
                    ref={viewport}
                    onStatusChanged={(event) => {

                        console.log(' => Viewport native event:', event, typeof event)
                        if (event.from.kind === "state" && event.to.kind === "idle") {
                            setFollowUserLocation(false);
                        }
                    }

                    }
                />
                <Camera
                    defaultSettings={{
                        centerCoordinate: DEFAULT_CENTER_COORDINATE,
                        zoomLevel: 18,
                    }}
                    followUserLocation={followUserLocation}
                    followUserMode={followUserMode}
                    followZoomLevel={18}
                // onUserTrackingModeChange={(event) => {
                //     if (!event.nativeEvent.payload.followUserLocation) {
                //         setFollowUserLocation(false);
                //     }
                // }}
                />
                <ShapeSource id="line1" shape={{ type: 'LineString', coordinates: coords }}>
                    <LineLayer
                        id="point1"
                        style={{
                            circleRadius: 5,
                            circleColor: 'red',
                        }}
                    />
                </ShapeSource>
                <UserLocation
                    onUpdate={(location) => {
                        console.log(' => UserLocation native event:', location, typeof location)
                        const newCoords = [...coords, [location.coords.longitude, location.coords.latitude]]
                        setCoords(newCoords)
                    }}
                    visible={renderMode !== ExampleRenderMode.Hidden}
                    renderMode={renderMode === ExampleRenderMode.Native ? 'native' : 'normal'}
                    showsUserHeadingIndicator={showsUserHeadingIndicator}
                    androidRenderMode={androidRenderMode}
                >
                    {renderMode === ExampleRenderMode.CustomChildren
                        ? [
                            <CircleLayer
                                key="customer-user-location-children-red"
                                id="customer-user-location-children-red"
                                style={{ circleColor: 'red', circleRadius: 8 }}
                            />,
                            <CircleLayer
                                key="customer-user-location-children-white"
                                id="customer-user-location-children-white"
                                style={{ circleColor: 'white', circleRadius: 4 }}
                            />,
                        ]
                        : undefined}
                </UserLocation>
            </MapView>
            <ButtonGroup
                buttons={Object.values(ExampleRenderMode).map(humanize)}
                selectedIndex={Object.values(ExampleRenderMode).indexOf(renderMode)}
                onPress={(index) => {
                    setRenderMode(Object.values(ExampleRenderMode)[index]);
                }}
            />
        </SafeAreaView>
    );
};

export default UserLocationRenderMode;