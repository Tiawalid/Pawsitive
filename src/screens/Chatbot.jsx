import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'How may I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Vetbot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const handleSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const message = newMessages[0];

   
    setTimeout(() => {
      const botResponse = getBotResponse(message.text);
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Vetbot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }, 1000);
  }, []);

  const getBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('allergy')) {
      return 'For allergies, please consult your vet. In the meantime, you can try keeping your pet away from known allergens.';
    } else if (userMessage.toLowerCase().includes('question')) {
      return 'Sure, what is your question about your dog?';
    } else {
      return 'I am not sure how to answer that. Please contact your vet for more information.';
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Appbar.BackAction />
        </TouchableOpacity>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </Appbar.Header>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: 1,
          }}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#DCF8C6',
                },
                left: {
                  backgroundColor: '#F1F0F0',
                },
              }}
            />
          )}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputToolbar}
              primaryStyle={{ alignItems: 'center' }}
            />
          )}
          inverted 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  appbar: {
    backgroundColor: '#ADD8E6',
    elevation: 0,
  },
  logo: {
    width: 100,
    height: 50,
  },
  chatContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, 
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ffffff',
    padding: 5,
    marginBottom: Platform.OS === 'ios' ? 20 : 0, 
  },
});
