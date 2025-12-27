import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  // TODO: 從 Firebase 取得用戶資料
  const user = {
    name: '測試帳號1',
    phone: '0000',
    email: '0000',
  };

  const addresses = [
    '台中市西屯區台灣大道三段99號12樓A室',
    '台中市南屯區文心路一段521號3樓',
    '台中市北區進化路573號B1'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.avatarLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>

      {/* 常用地址 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>常用地址</Text>
        {addresses.map((address, index) => (
          <View key={index} style={styles.addressCard}>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        ))}
        <Pressable 
          style={styles.addButton}
          onPress={() => router.push('/profile/addresses')}
        >
          <Text style={styles.addButtonText}>+ 管理地址</Text>
        </Pressable>
      </View>

      {/* 設定選項 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>帳號設定</Text>
        
        <Pressable 
          style={styles.menuItem}
          onPress={() => router.push('/profile/edit')}
        >
          <Text style={styles.menuText}>個人資料</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>

        <Pressable 
          style={styles.menuItem}
          onPress={() => router.push('/profile/coupons')}
        >
          <Text style={styles.menuText}>優惠券</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>

        <Pressable 
          style={styles.menuItem}
          onPress={() => router.push('/profile/customer-service')}
        >
          <Text style={styles.menuText}>客服中心</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>
      </View>

      {/* 登出按鈕 */}
      <Pressable
        style={styles.logoutButton}
        onPress={() => {
          // TODO: 登出邏輯
          router.replace('/(auth)/welcome');
        }}
      >
        <Text style={styles.logoutText}>登出</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.version}>版本 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2f95dc',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  avatarLogo: {
    width: 60,
    height: 60,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  addressIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#2f95dc',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2f95dc',
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: 'white',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  version: {
    fontSize: 14,
    color: '#999',
  },
});
