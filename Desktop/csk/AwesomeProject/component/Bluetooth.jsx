import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';


const Bluetooth = () => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  useEffect(() => {
    // Check if Bluetooth is enabled
    BleManager.checkState().then(state => {
      if (state === 'on') {
        setBluetoothEnabled(true);
      }
    });
  }, []);

  
  const toggleBluetooth = async () => {
  console.log(Platform);
    if (Platform.OS === 'android' && Platform.Version >= 29){
      // Bluetooth is currently disabled, so enable it
      console.log('mm');
      BleManager.enableBluetooth().then(() => {
        setBluetoothEnabled(true);
        console.log('Bluetooth is turned on!');
      });
    }
    else{
        await BluetoothStateManager.requestToEnable();
        console.log('bluetooth ,version <10');

    }
    
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}>
            </View>
          <View>
            

            {!bluetoothEnabled && <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={toggleBluetooth}>
            <Text style={styles.buttonTextStyle}>
              { 'Turn On Bluetooth'}
            </Text>
          </TouchableOpacity>}

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Bluetooth;
