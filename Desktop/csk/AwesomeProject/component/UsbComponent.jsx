import { useEffect, useState } from 'react';
import { Button, NativeModules, Text, View } from 'react-native';

const { UsbManagerModule } = NativeModules;

const UsbComponent = () => {
  const [deviceCount, setDeviceCount] = useState(0);

  useEffect(() => {
    getDeviceCount();
  }, []);

  const getDeviceCount = () => {
    UsbManagerModule.getDeviceCount()
      .then(count => {
        console.log(count);
        setDeviceCount(count);
      })
      .catch(error => {
        console.error('Error getting device count:', error);
      });
  };

  return (
    <View>
      <Text>Number of USB Devices: {deviceCount}</Text>
      <Button title="Refresh Device Count" onPress={getDeviceCount} />
    </View>
  );
};

export default UsbComponent;
