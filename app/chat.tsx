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
  useColorScheme,
  SafeAreaView,
} from 'react-native'
import { AppHeader } from '@/components/AppHeader'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { useToast } from 'expo-toast'
import { useChat } from '@/hooks/useChat'
import { useUserStore } from '@/stores/userStore'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default function ChatPage() {
  const params = useLocalSearchParams()
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)
  const toast = useToast()
  const topic = params.name as string
  const [message, setMessage] = useState('')
  const chat = useChat(topic)
  const wallet = useUserStore((state) => state.wallet)

  const send = () => {
    if (message.trim()) {
      chat.send(message)
      setMessage('')
    }
  }

  const messages = chat.messages.sort((a, b) => b.timestamp - a.timestamp)

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader
        title={topic}
        rightContent={
          <TouchableOpacity onPress={() => toast.show('更多操作，开发中...')}>
            <Icon.More width={20} height={20} fill={Colors[theme].text} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={messages}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.address === wallet?.address ? styles.sender : styles.receiver,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.address === wallet?.address ? styles.senderText : styles.receiverText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => String(item.timestamp)}
        style={styles.messageList}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="说点什么..."
            placeholderTextColor="#888"
            onSubmitEditing={send}
          />
          <TouchableOpacity style={styles.sendButton} onPress={send}>
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
