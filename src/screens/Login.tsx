import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/types';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        if (res.docs?.length > 0) {
          console.log('User Fetched', JSON.stringify(res.docs[0].data()));
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(err => {
        console.log('Error =>', err);
        Alert.alert('User not found');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        value={password}
        onChangeText={t => setPassword(t)}
      />
      <TouchableOpacity onPress={() => loginUser()} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>Or Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#000',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: -30,
    alignSelf: 'center',
    paddingLeft: 10,
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
  loginText: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
