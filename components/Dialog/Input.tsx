import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.headerButton}>取消</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleComplete}>
            <Text style={styles.headerButton}>完成</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TextInput style={styles.input} value={inputText} onChangeText={setInputText} />
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerButton: {
    fontSize: 16,
    color: '#007BFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'top', // 文本垂直对齐
  },
})
