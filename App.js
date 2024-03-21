import { Camera, CameraType } from 'expo-camera';
import { Image } from 'expo-image';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [source, setSource] = useState(null);
    const cameraRef = useRef();
    useEffect(() => {
        
            (async () => {
                
                const { status } = await Camera.requestCameraPermissionsAsync();
                
                requestPermission(status === "granted");
                
            })();
        
    }, []);
    const takePicture = async () => {
        const options = { quality: 0.5, base64: true, skipProcessing: true };

        const data = await this.camera.takePictureAsync(options);
        setSource(data.uri);
        console.log("picture source ", source)
    }
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => {this.camera = ref } }>
                <View style={styles.buttonContainer}>
                    <Button
                        title="flip camera"
                        style={styles.button}
                        onPress={toggleCameraType}
                    />
                    <Button title="take picture" onPress={takePicture } />
                </View>
            </Camera>
            <Image
                source={source}
                style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'center'
                }} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height: '50%',
        width: '50%',
        fontSize: 20
    },
    camera: {
        height: '50%',
        width: '100%',
    },
    button: {
        marginTop: 300,
        padding: 20,
    }
});
