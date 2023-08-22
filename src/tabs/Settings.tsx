import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from '../types/types';
import Loader from '../components/Loader';

const Settings = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const logoutUser = async () => {
    setShowLoader(true);
    await AsyncStorage.setItem('NAME', '');
    await AsyncStorage.setItem('EMAIL', '');
    await AsyncStorage.setItem('USERID', '');
    setTimeout(() => {
      navigation.navigate('Login');
      setShowLoader(false);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logoutUser()} style={styles.btn}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
      <Loader visible={showLoader} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 80,
    width: '70%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'purple',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
});
