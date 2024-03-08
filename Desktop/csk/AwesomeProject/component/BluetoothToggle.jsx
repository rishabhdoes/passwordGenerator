import React, { useState, useEffect } from 'react';
import { View, Button, Text, Linking } from 'react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

const BluetoothToggle = () => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  useEffect(() => {
    // Check the initial Bluetooth state when component mounts
    checkBluetoothState();
  }, []);

  const checkBluetoothState = async () => {
    try {
      const isEnabled = await BluetoothStateManager.getState();
      setBluetoothEnabled(isEnabled === 'PoweredOn');
    } catch (error) {
      console.error('Error checking Bluetooth state:', error);
    }
  };

  const toggleBluetooth = async () => {
    try {
      if (!bluetoothEnabled) {
        // Open Bluetooth settings
        await BluetoothStateManager.requestToEnable();
      }
    } catch (error) {
      console.error('Error toggling Bluetooth state:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bluetooth is {bluetoothEnabled ? 'enabled' : 'disabled'}</Text>
      {!bluetoothEnabled && <Button title="Enable Bluetooth" onPress={toggleBluetooth} />}
    </View>
  );
};

export default BluetoothToggle;
