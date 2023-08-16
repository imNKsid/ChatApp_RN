import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Users from '../tabs/Users';
import Settings from '../tabs/Settings';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      {selectedTab === 0 ? <Users /> : <Settings />}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(0)}>
          <Image
            source={require('../assets/images/users.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 0 ? 'white' : '#000'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(1)}>
          <Image
            source={require('../assets/images/settings.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 1 ? 'white' : '#000'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {},
});
