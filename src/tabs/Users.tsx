import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    let tempData: any = [];

    firestore()
      .collection('users')
      .where('userId', '!=', userId)
      .get()
      .then(res => {
        if (res.docs?.length > 0) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };
  const renderUser = ({item, index}: {item: {name: string}; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => navigation.navigate('Chat', {data: item})}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.userImg}
        />
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RN Firebase</Text>
      </View>
      <FlatList data={users} renderItem={renderUser} />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userItem: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  userImg: {
    height: 45,
    width: 45,
  },
  userName: {
    color: '#000',
    paddingLeft: 10,
    fontSize: 20,
  },
});
