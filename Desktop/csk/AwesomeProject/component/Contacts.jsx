import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, ActivityIndicator } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true); // Start loading indicator
      // Check and request contacts permission for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Contacts permission denied');
          setLoading(false); // Stop loading indicator
          return;
        }
      }

      // Load contacts
      Contacts.getAll()
        .then((contacts) => {
          setContacts(contacts);
        })
        .catch((error) => {
          console.error('Error loading contacts:', error);
        })
        .finally(() => {
          setLoading(false); // Stop loading indicator
        });
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      setLoading(false); // Stop loading indicator
    }
  };

  const displayContacts = () => {
    if (contacts.length === 0) {
      return <Text>No contacts found.</Text>;
    }

    return contacts.map((contact) => (
      <View key={contact.recordID}>
        <Text>Name: {contact.displayName}</Text>
        <Text>Emails: {contact.emailAddresses.map((email) => email.email).join(', ')}</Text>
        <Text>Phone Numbers: {contact.phoneNumbers.map((phone) => phone.number).join(', ')}</Text>
        <Text>--------------------------</Text>
      </View>
    ));
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Contact List</Text>
      {loading ? ( // Render activity indicator if loading
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        displayContacts()
      )}
      <Button title="Reload Contacts" onPress={loadContacts} />
    </View>
  );
};

export default ContactList;
