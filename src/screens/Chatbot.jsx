import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'How may I help you?', sender: 'Vetbot', time: '11:14' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { id: messages.length + 1, text: message, sender: 'User', time: new Date().toLocaleTimeString() };
      setMessages([...messages, newMessage]);
      setMessage('');

      setTimeout(() => {
        const botResponse = getBotResponse(message);
        const newBotMessage = { id: messages.length + 2, text: botResponse, sender: 'Vetbot', time: new Date().toLocaleTimeString() };
        setMessages(currentMessages => [...currentMessages, newBotMessage]);
      }, 1000);
    }
  };

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
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </Appbar.Header>
      <Text style={styles.title}>Ask anything!</Text>
      <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingBottom: 10 }}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageRow, msg.sender === 'User' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageRow: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#6e6e6e',
    textAlign: 'right',
  },
  logoContainer: {
    marginRight: 'auto',
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  sendButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 40,
  },
  sendButtonText: {
    color: '#fff',
  },
});
