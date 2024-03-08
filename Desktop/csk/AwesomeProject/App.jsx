import React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import BluetoothToggle from './component/BluetoothToggle';
import Bluetooth from './component/Bluetooth';
import ContactList from './component/ContactList';
import NewModuleButton from './component/NewModuleButton';
import UsbComponent from './component/UsbComponent';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#ffffff" />
      <View >
      </View>
     <UsbComponent/>
    </SafeAreaView>
  );
};

export default App;
