import React from 'react'
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemeText } from '@/components/Theme'
import { useUserStore } from '@/stores/userStore'
import { Colors } from '@/constants/Colors'

interface DeleteConfirmationModalProps {
  visible: boolean
  onClose: () => void
  onConfirmDelete: () => void
  title?: string
  message?: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirmDelete,
  title = '删除确认',
  message = '确定要删除吗？',
}) => {
  const handleDelete = () => {
    onConfirmDelete()
    onClose()
  }

  const { theme } = useUserStore()

  const styles = createStyles(theme)

  return (
    <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ThemeText style={styles.modalTitle}>{title}</ThemeText>
          <ThemeText style={styles.modalText}>{message}</ThemeText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <ThemeText style={styles.textStyleCancel}>取消</ThemeText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={handleDelete}>
              <ThemeText style={styles.textStyleDelete}>删除</ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark'

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: isDark ? '#2C2C2C' : '#FFFFFF',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%',
      maxWidth: 450,
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#000000',
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 16,
      color: isDark ? '#B0B0B0' : '#666666',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      borderRadius: 8,
      padding: 10,
      elevation: 2,
      width: '45%',
      alignItems: 'center',
    },
    buttonCancel: {
      backgroundColor: isDark ? '#3A3A3A' : '#E0E0E0',
    },
    buttonDelete: {
      backgroundColor: Colors.tint,
    },
    textStyleCancel: {
      color: isDark ? '#FFFFFF' : 'black',
      textAlign: 'center',
    },
    textStyleDelete: {
      color: 'white',
      textAlign: 'center',
    },
  })
}

export default DeleteConfirmationModal
