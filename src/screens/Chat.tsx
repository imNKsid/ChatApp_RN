import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useRoute, RouteProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
  Chat: {
    id: string;
    data: {
      userId: string;
    };
  };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]); // Use your custom IMessage type

  const route = useRoute<ChatScreenRouteProp>();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = subscriber.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        const data = item.data();
        // return { ...data, createdAt: data.createdAt };
        return {
          _id: data._id,
          text: data.text,
          user: data.user,
          createdAt: data.createdAt,
        };
      });
      setMessages(allMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const msg = newMessages[0];
    const myMsg = {
      ...msg,
      sendBy: route?.params?.id,
      sendTo: route?.params?.data.userId,
      createdAt: new Date(msg.createdAt), //Date.parse(msg?.createdAt),
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [myMsg]),
    );
    //Notice that I've wrapped myMsg in an array ([myMsg]) when using the GiftedChat.append function.
    //This way, you're correctly appending the new message to the existing array of messages.

    firestore()
      .collection('chats')
      .doc('' + route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + route?.params?.data?.userId + route?.params?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: route?.params?.id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
