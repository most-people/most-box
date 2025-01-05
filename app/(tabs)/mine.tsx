import mp from '@/constants/mp'
import { useUserStore } from '@/stores/userStore'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const ProfileScreen = () => {
  const wallet = useUserStore((state) => state.wallet)
  return (
    <ScrollView style={styles.container}>
      {/* 头像和名称区域 */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }} // 替换为实际图片 URL
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{wallet?.username}</Text>
          <Text style={styles.account}>地址：{mp.formatAddress(wallet?.address)}</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/20' }} // 替换为二维码图标
          style={styles.qrIcon}
        />
      </View>

      {/* 服务 */}
      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={{ uri: 'https://via.placeholder.com/20' }} // 替换为实际图标 URL
          style={styles.icon}
        />
        <Text style={styles.menuText}>服务</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/20' }} // 替换为箭头图标 URL
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {/* 菜单分组 */}
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
          <Text style={styles.menuText}>收藏</Text>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
          <Text style={styles.menuText}>朋友圈</Text>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
          <Text style={styles.menuText}>视频号</Text>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
          <Text style={styles.menuText}>卡包</Text>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
          <Text style={styles.menuText}>表情</Text>
          <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* 设置 */}
      <TouchableOpacity style={styles.menuItem}>
        <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
        <Text style={styles.menuText}>设置</Text>
        <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.arrowIcon} />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#1c1c1e',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  qrIcon: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  account: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#888',
  },
  menuItem: {
    gap: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#333',
  },
  menuGroup: {
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: '#333',
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: 'rgba(136,136,136,1)',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
})

export default ProfileScreen
