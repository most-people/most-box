import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

interface Message {
  id: string
  text: string
  isSender: boolean
}

const ChatPage = () => {
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
    <View style={styles.container}>
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
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#d1e7ff',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
})

export default ChatPage
