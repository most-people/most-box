import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
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
import { ThemeHeader } from '@/components/Theme'
import { Icon } from '@/assets/icon'

interface Message {
  id: string
  text: string
  isSender: boolean
}

const MessageBubble = ({ text, isSender }: { text: string; isSender: boolean }) => (
  <View style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
    <Text style={styles.messageText}>{text}</Text>
  </View>
)

const ChatInput = ({
  value,
  onChangeText,
  onSend,
}: {
  value: string
  onChangeText: (text: string) => void
  onSend: () => void
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="请输入消息..."
      placeholderTextColor="#888"
      onSubmitEditing={onSend}
    />
    <TouchableOpacity style={styles.sendButton} onPress={onSend}>
      <Text style={styles.sendButtonText}>发送</Text>
    </TouchableOpacity>
  </View>
)
const ChatPage = () => {
  const params = useLocalSearchParams()

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！', isSender: false },
    { id: '2', text: '你好，有什么可以帮助你的吗？', isSender: true },
  ])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addMessage(inputText)
      setInputText('')
    }
  }

  const addMessage = (text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: `${prevMessages.length + 1}`, text, isSender: true },
    ])
  }

  // const headerHeight = useHeaderHeight()
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={headerHeight}
    >
      <ThemeHeader
        title={params.name}
        rightContent={
          <TouchableOpacity onPress={() => alert('更多操作')}>
            <Icon.Add fill={'white'} width={20} height={20} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble text={item.text} isSender={item.isSender} />}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <ChatInput value={inputText} onChangeText={setInputText} onSend={handleSendMessage} />
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
    paddingVertical: 5,
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
