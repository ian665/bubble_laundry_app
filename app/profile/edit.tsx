import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { useRouter, Stack } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();

  // 模擬從用戶資料獲取的初始值
  const [name, setName] = useState('測試帳號1');
  const [phone, setPhone] = useState('0912345678');
  const [email, setEmail] = useState('test@example.com');
  const [birthday, setBirthday] = useState('1990-01-01');

  const handleSave = () => {
    // 驗證輸入
    if (!name.trim()) {
      Alert.alert('錯誤', '請輸入姓名');
      return;
    }
    if (!phone.trim() || phone.length !== 10) {
      Alert.alert('錯誤', '請輸入正確的手機號碼（10位數）');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('錯誤', '請輸入正確的電子郵件');
      return;
    }

    // TODO: 儲存到 Firebase
    Alert.alert(
      '成功', 
      '個人資料已更新',
      [{ text: '確定', onPress: () => router.back() }]
    );
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: '編輯個人資料',
        headerShown: true,
      }} />
      <ScrollView style={styles.container}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.avatarLogo}
              resizeMode="contain"
            />
          </View>
          <Pressable style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>更換頭像</Text>
          </Pressable>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>姓名</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="請輸入姓名"
              maxLength={20}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>手機號碼</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="請輸入手機號碼"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>電子郵件</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="請輸入電子郵件"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>生日</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>儲存變更</Text>
          </Pressable>
          
          <Pressable 
            style={styles.cancelButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>取消</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  avatarSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2f95dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
  },
  avatarLogo: {
    width: 70,
    height: 70,
    tintColor: 'white',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  changePhotoButton: {
    borderWidth: 1,
    borderColor: '#2f95dc',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  changePhotoText: {
    color: '#2f95dc',
    fontSize: 14,
    fontWeight: '500',
  },
  formSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonSection: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#2f95dc',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});