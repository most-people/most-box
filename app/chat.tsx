import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

interface Message {
  id: string
  text: string
  isSender: boolean
}

const ChatPage = () => {
  const navigation = useNavigation()
  const { name } = useLocalSearchParams()

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [navigation, name])

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！', isSender: false },
    { id: '2', text: '你好，有什么可以帮助你的吗？', isSender: true },
  ])
  const [inputText, setInputText] = useState('')

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${prevMessages.length + 1}`, text: inputText, isSender: true },
      ])
      setInputText('')
    }
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="请输入消息..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E88E5',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#444',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1E1E1E',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#1E88E5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
})

export default ChatPage
