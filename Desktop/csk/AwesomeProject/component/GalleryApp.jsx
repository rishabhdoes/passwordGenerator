import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function GalleryApp() {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        hasPermission();
    }, []);

    async function hasPermission() {  
        const permission = Platform.Version >= 33 ?
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES :
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);

        if (hasPermission) {
            console.log('permission hain');
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === "granted";  
    }

    const getPhotos = () => {
        CameraRoll.getPhotos({
            first: 2,
            assetType: 'Photos',
        })
        .then(r => {
            setPhotos(r.edges);
            console.log(photos);
        })
        .catch((err) => {
            // Error Loading Images
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
                {photos.map((item, index) => (
                    <View key={index} style={{ height: 100, width: 100 }}>
                        <Image source={{uri:item.node.image.uri}} style={{ height: 50, width: 50 }}/>
                    </View>
                ))}
            </View>

            <TouchableOpacity  
                style={{
                    width: 200,
                    height: 50,
                    backgroundColor: '#000',
                    justifyContent: 'center',
                    borderRadius: 10,
                    alignItems: 'center',
                    alignSelf: 'center',
                    position: 'absolute',
                    top: 600
                }} 
                onPress={() => { getPhotos(); }}
            >
                <Text style={{ color: '#fff', fontSize: 20 }}>Sync Photos</Text>
            </TouchableOpacity>
        </View>
    );
}
