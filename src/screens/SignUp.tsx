import {
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

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={t => setName(t)}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        value={mobile}
        onChangeText={t => setMobile(t)}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        value={password}
        onChangeText={t => setPassword(t)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={t => setConfirmPassword(t)}
      />
      <TouchableOpacity onPress={() => {}} style={styles.btn}>
        <Text style={styles.btnText}>SignUp</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Or Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
