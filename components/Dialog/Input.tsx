import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { AppHeader } from '../AppHeader'

// 定义 props 类型
interface PageModalProps {
  onComplete: (inputText: string) => void // 完成回调
}

const PageModal = forwardRef(({ onComplete }: PageModalProps, ref) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [inputText, setInputText] = useState('')

  // 暴露控制方法
  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
  }))

  // 完成按钮点击事件
  const handleComplete = () => {
    onComplete(inputText) // 返回输入内容
    setModalVisible(false) // 关闭弹窗
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.container}>
        <AppHeader
          title={'加入话题'}
          leftContent={
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.headerButton}>取消</Text>
            </TouchableOpacity>
          }
          rightContent={
            <TouchableOpacity onPress={handleComplete}>
              <Text style={styles.headerButton}>完成</Text>
            </TouchableOpacity>
          }
        ></AppHeader>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            autoFocus
            maxLength={100}
            returnKeyType="go"
          />
        </View>
      </View>
    </Modal>
  )
})

// 设置组件名称
PageModal.displayName = 'PageModal'

export default PageModal

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  input: {
    paddingInline: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    height: 40,
  },
})
