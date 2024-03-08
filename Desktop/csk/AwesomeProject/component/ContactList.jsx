import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ContactList() {

    const contacts = [
        {
            uid: 1,
            name: 'kkhhk'
        },
        {
            uid: 2,
            name: 'sam'
        },
        {
            uid: 3,
            name: 'dreq'
        },
        {
            uid: 4,
            name: 'pouty'
        },
        {
            uid: 5,
            name: 'laws'
        },
        {
            uid: 6,
            name: 'potty'
        },
        {
            uid: 7,
            name: 'fjkhk'
        },
    ]

    return (
        <View>
            <Text style={styles.headingText}>ContactList</Text>
            <ScrollView style={styles.container}
            scrollEnabled={false}
            >
               {contacts.map(({uid,name,status})=>(<View key={uid} style={styles.usercard}>
                   <Image source={{
                    uri:'https://plus.unsplash.com/premium_photo-1709311398545-767e7222349e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D'
                   }}
                   style={styles.userImage}
                   
                   />
                   <Text style={styles.userName}>{name}</Text>

               </View>))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
headingText:{fontSize:24,
fontWeight: '200',
paddingHorizontal:8},
container:{paddingHorizontal:16},
usercard:{flex:1,flexDirection:'row'},
userImage:{width:60,height:60,borderRadius:30},
userName:{}

})
