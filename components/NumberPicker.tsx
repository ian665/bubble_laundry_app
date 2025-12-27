import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NumberPickerProps {
  value: string;
  onValueChange: (value: string) => void;
  max?: number;
  placeholder?: string;
}

export default function NumberPicker({ value, onValueChange, max = 20, placeholder = "0" }: NumberPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // 生成數字選項 (0-max)
  const pickerItems = Array.from({ length: max + 1 }, (_, i) => i.toString());

  const handleInputChange = (text: string) => {
    // 只允許數字輸入
    const numericText = text.replace(/[^0-9]/g, '');
    if (parseInt(numericText || '0') <= max) {
      onValueChange(numericText);
    }
  };

  const handlePickerConfirm = () => {
    onValueChange(tempValue);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* 輸入框 */}
      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={value}
          onChangeText={handleInputChange}
          placeholder={placeholder}
        /> */}
        
        {/* 滾輪按鈕 */}
        <Pressable 
          style={styles.pickerButton}
          onPress={() => {
            setTempValue(value);
            setShowPicker(true);
          }}
        >
        <Text style={styles.input}>
            {value || placeholder} 
          </Text>
        </Pressable>
      </View>

      {/* 滾輪選擇器 Modal */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Pressable onPress={() => setShowPicker(false)}>
                <Text style={styles.cancelButton}>取消</Text>
              </Pressable>
              <Text style={styles.pickerTitle}>選擇數量</Text>
              <Pressable onPress={handlePickerConfirm}>
                <Text style={styles.confirmButton}>確認</Text>
              </Pressable>
            </View>
            
            <Picker
              selectedValue={tempValue}
              onValueChange={(itemValue: string) => setTempValue(itemValue)}
              style={styles.picker}
            >
              {pickerItems.map((item) => (
                <Picker.Item 
                  key={item} 
                  label={`${item} 件`} 
                  value={item} 
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: 80,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  pickerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 5,
  },
  pickerButtonText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 300,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    color: '#999',
    fontSize: 16,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    color: '#2f95dc',
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    height: 200,
  },
});