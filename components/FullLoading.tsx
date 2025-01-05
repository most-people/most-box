import React from 'react'
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import { useUserStore } from '@/stores/userStore'

const FullLoading = () => {
  const fullLoading = useUserStore((state) => state.fullLoading)

  return (
    <Modal visible={fullLoading} transparent={true} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default FullLoading
