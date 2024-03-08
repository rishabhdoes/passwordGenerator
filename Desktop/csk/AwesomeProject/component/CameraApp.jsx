import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export default function CameraApp() {
 
    const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const device = useCameraDevice('back');

  const camera=useRef(null);
  useEffect(() => {
    askPermission();
  }, []);

  async function askPermission() {
    try {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  async function handleTakePhoto() {
    try {
      console.log('photo taking')
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
      flash: 'off',
      enableShutterSound: true})
      console.log('photo taken')

      // Save the photo to the device's file system

      Alert.alert('Photo Saved', 'Your photo has been saved to the device.');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to take photo');
    }
  }


  if (isLoading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!device) return <Text>No camera device available</Text>;

  return (
    <View style={styles.container}>
      <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} />
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={()=>handleTakePhoto()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
}
  );

