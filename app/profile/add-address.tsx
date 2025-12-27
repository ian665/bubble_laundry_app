import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter, Stack } from 'expo-router';

export default function AddAddressScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('台中市');
  const [district, setDistrict] = useState('');
  const [detail, setDetail] = useState('');

  const handleSave = () => {
    // 驗證輸入
    if (!name.trim()) {
      Alert.alert('錯誤', '請輸入地址名稱');
      return;
    }
    if (!district.trim()) {
      Alert.alert('錯誤', '請選擇區域');
      return;
    }
    if (!detail.trim()) {
      Alert.alert('錯誤', '請輸入詳細地址');
      return;
    }

    const fullAddress = `${city}${district}${detail}`;

    // TODO: 儲存到 Firebase
    Alert.alert(
      '成功', 
      '地址已新增',
      [{ text: '確定', onPress: () => router.back() }]
    );
  };

  const districts = [
    '西屯區', '南屯區', '北屯區', '中區', '東區', 
    '西區', '南區', '北區', '豐原區', '太平區'
  ];

  return (
    <>
      <Stack.Screen options={{ 
        title: '新增地址',
        headerShown: true,
      }} />
      <ScrollView style={styles.container}>
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>地址名稱</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="例如：家、公司、朋友家"
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>城市</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{city}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>區域</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.districtContainer}>
              {districts.map((d) => (
                <Pressable
                  key={d}
                  style={[
                    styles.districtButton,
                    district === d && styles.districtButtonSelected
                  ]}
                  onPress={() => setDistrict(d)}
                >
                  <Text style={[
                    styles.districtText,
                    district === d && styles.districtTextSelected
                  ]}>
                    {d}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>詳細地址</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={detail}
              onChangeText={setDetail}
              placeholder="請輸入路名、門牌號碼、樓層等詳細資訊"
              multiline
              numberOfLines={3}
              maxLength={100}
            />
            <Text style={styles.charCount}>{detail.length}/100</Text>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>完整地址預覽</Text>
            <Text style={styles.previewText}>
              {city}{district}{detail || '請輸入詳細地址'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>儲存地址</Text>
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
  formSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 12,
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
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  districtContainer: {
    flexDirection: 'row',
  },
  districtButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: 'white',
  },
  districtButtonSelected: {
    backgroundColor: '#2f95dc',
    borderColor: '#2f95dc',
  },
  districtText: {
    fontSize: 14,
    color: '#666',
  },
  districtTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  previewSection: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0ff',
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f95dc',
    marginBottom: 5,
  },
  previewText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
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