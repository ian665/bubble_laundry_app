import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter, Stack } from 'expo-router';

export default function AddressesScreen() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([
    { id: '1', name: '家', address: '台中市西屯區台灣大道三段99號12樓A室', isDefault: true },
    { id: '2', name: '公司', address: '台中市南屯區文心路一段521號3樓', isDefault: false },
    { id: '3', name: '朋友家', address: '台中市北區進化路573號B1', isDefault: false },
  ]);

  const handleDelete = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address?.isDefault) {
      Alert.alert('無法刪除', '預設地址無法刪除，請先設定其他地址為預設');
      return;
    }

    Alert.alert(
      '確認刪除',
      '確定要刪除這個地址嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
          }
        }
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    Alert.alert('成功', '已設定為預設地址');
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: '地址管理',
        headerShown: true,
      }} />
      <ScrollView style={styles.container}>
        <View style={styles.addressList}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressName}>{address.name}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>預設</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.addressText}>{address.address}</Text>
              
              <View style={styles.addressActions}>
                <Pressable 
                  style={styles.actionButton}
                  onPress={() => {
                    // TODO: 實現編輯地址功能
                    Alert.alert('功能開發中', '編輯地址功能即將推出');
                  }}
                >
                  <Text style={styles.actionText}>編輯</Text>
                </Pressable>
                
                {!address.isDefault && (
                  <Pressable 
                    style={styles.actionButton}
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Text style={styles.actionText}>設為預設</Text>
                  </Pressable>
                )}
                
                <Pressable 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(address.id)}
                >
                  <Text style={[styles.actionText, styles.deleteText]}>刪除</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <Pressable 
          style={styles.addButton}
          onPress={() => router.push('/profile/add-address')}
        >
          <Text style={styles.addButtonText}>+ 新增地址</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addressList: {
    padding: 15,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionText: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    borderColor: '#ff3b30',
  },
  deleteText: {
    color: '#ff3b30',
  },
  addButton: {
    backgroundColor: '#2f95dc',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});