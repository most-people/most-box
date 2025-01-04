import { useLocalSearchParams } from 'expo-router'
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
  useColorScheme,
  SafeAreaView,
} from 'react-native'
import { AppHeader } from '@/components/AppHeader'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { gun } from '@/stores/gun'

interface Message {
  id: string
  text: string
  isSender: boolean
}

const ChatPage = () => {
  const params = useLocalSearchParams()
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！', isSender: false },
    { id: '2', text: '你好，有什么可以帮助你的吗？', isSender: true },
  ])
  const [inputMessage, setInputMessage] = useState('')

  const name = params.name as string

  const chat = gun.get(name)

  useEffect(() => {
    // 模拟一个消息监听器
    chat.on((data, key) => {
      // 忽略内部标记
      console.log('🌊', key)
      console.log('🌊', data)
    })
  }, [chat])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage)
      setInputMessage('')
    }
  }

  const addMessage = (text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: `${prevMessages.length + 1}`, text, isSender: true },
    ])

    chat.put({ user: '赛博佛客', text, timestamp: Date.now() })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader
        title={name}
        rightContent={
          <TouchableOpacity onPress={() => alert('更多操作')}>
            <Icon.More width={20} height={20} fill={Colors[theme].text} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isSender ? styles.sender : styles.receiver]}>
            <Text
              style={[styles.messageText, item.isSender ? styles.senderText : styles.receiverText]}
            >
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="请输入消息..."
            placeholderTextColor="#888"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>发送</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const createStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
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
      backgroundColor: Colors.sender,
    },
    senderText: {
      color: '#ffffff',
    },
    receiver: {
      alignSelf: 'flex-start',
      backgroundColor: theme === 'dark' ? '#2C2C2C' : '#ffffff',
    },
    receiverText: {
      color: Colors[theme].text,
    },
    messageText: {
      fontSize: 16,
    },
    safeArea: {
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#ffffff',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: theme === 'dark' ? '#444' : '#e0e0e0',
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: Colors[theme].input.border,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: Colors[theme].input.background,
      color: Colors[theme].text,
      fontSize: 16,
    },
    sendButton: {
      marginLeft: 10,
      backgroundColor: Colors.sender,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    sendButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
  })
}

export default ChatPage
