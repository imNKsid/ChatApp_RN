import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

interface LoaderProps {
  visible: boolean;
}

const Loader = ({visible}: LoaderProps) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    width: width,
    height: height,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
});
