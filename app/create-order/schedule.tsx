import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert, Platform, Modal } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { parse } from 'expo-linking';

export default function ScheduleScreen() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDropOffTime, setSelectedDropOffTime] = useState(''); // 送洗時間
  const [calculatedPickupTime, setCalculatedPickupTime] = useState(''); // 自動計算的取件時間
  const [showTimePicker, setShowTimePicker] = useState(false); // 時間選擇器Modal
  
  // 分別的選擇狀態
  const [selectedDate, setSelectedDate] = useState(''); // 今天/明天
  const [selectedHour, setSelectedHour] = useState(''); // 小時
  const [selectedMinute, setSelectedMinute] = useState(''); // 分鐘

  // 生成日期選項
  const getDateOptions = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    return [
      { 
        label: `${today.getDate()}`, 
        value: '0' 
      },
      { 
        label: `${tomorrow.getDate()}`, 
        value: '1' 
      }
    ];
  };

  // 生成小時選項 (00:00-07:59)
  const getHourOptions = () => {
    const hours = [];
    for (let i = 0; i <= 7; i++) {
      hours.push({
        label: i.toString().padStart(2, '0'),
        value: i.toString()
      });
    }
    return hours;
  };

  // 生成分鐘選項 (每5分鐘)
  const getMinuteOptions = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 5) {
      minutes.push({
        label: i.toString().padStart(2, '0'),
        value: i.toString()
      });
    }
    return minutes;
  };

  // 檢查時間是否為過去時間
  const isTimeInPast = (dateValue: string, hourValue: string, minuteValue: string) => {
    if (!dateValue || !hourValue || !minuteValue) return false;
    
    const now = new Date();
    const selectedTime = new Date();
    if(parseInt(dateValue) === 1 ) return false;
    if (parseInt(dateValue) === 0) {
      selectedTime.setHours(parseInt(hourValue), parseInt(minuteValue), 0, 0);
      return selectedTime <= now;
    }
    return false;
  };

  // 生成送洗時間選項 (今天和明天的00:00-08:00，精確到分鐘)
  const generateDropOffTimeOptions = () => {
    const options: { date: string; time: string; value: string; disabled: boolean }[] = [];
    const now = new Date();
    
    // 今天和明天
    for (let dayOffset = 0; dayOffset <= 1; dayOffset++) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() + dayOffset);
      
      // 00:00 到 08:00，每5分鐘一個選項
      for (let hour = 0; hour <= 7; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
          const optionTime = new Date(targetDate);
          optionTime.setHours(hour, minute, 0, 0);
          
          // 如果是今天，不能選擇已經過去的時間
          const isPast = dayOffset === 0 && optionTime <= now;
          
          options.push({
            date: targetDate.toLocaleDateString('zh-TW', { 
              month: '2-digit', 
              day: '2-digit',
              weekday: 'short' 
            }),
            time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
            value: optionTime.toISOString(),
            disabled: isPast,
          });
        }
      }
    }
    
    return options.filter(option => !option.disabled);
  };

  // 計算取件時間 (+2小時)
  const calculatePickupTime = (dropOffTimeISOString: string) => {
    const dropOffTime = new Date(dropOffTimeISOString);
    const pickupTime = new Date(dropOffTime.getTime() + 2 * 60 * 60 * 1000); // +2小時
    
    return pickupTime.toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 處理送洗時間選擇
  const handleDropOffTimeSelect = (timeValue: string) => {
    setSelectedDropOffTime(timeValue);
    const pickupTime = calculatePickupTime(timeValue);
    setCalculatedPickupTime(pickupTime);
  };

  // 處理三個滾輪的時間組合
  const handleTimeComponentChange = () => {
    if (selectedDate && selectedHour && selectedMinute) {
      const now = new Date();
      const selectedTime = new Date();
      selectedTime.setDate(now.getDate() + parseInt(selectedDate));
      selectedTime.setHours(parseInt(selectedHour), parseInt(selectedMinute), 0, 0);
      
      // 檢查是否為過去時間
      if (selectedTime <= now) {
        return; // 不更新過去時間
      }
      
      const timeValue = selectedTime.toISOString();
      setSelectedDropOffTime(timeValue);
      const pickupTime = calculatePickupTime(timeValue);
      setCalculatedPickupTime(pickupTime);
    }
  };

  // 格式化顯示選中的時間
  const getDisplayTime = () => {
    if (selectedDate && selectedHour && selectedMinute) {
      const today = new Date();
      const selectedDateObj = new Date(today);
      selectedDateObj.setDate(today.getDate() + parseInt(selectedDate));
      
      const dateText = selectedDate === '0' 
        ? `今天 ${today.getMonth() + 1}/${today.getDate()}`
        : `明天 ${selectedDateObj.getMonth() + 1}/${selectedDateObj.getDate()}`;
      const timeText = `${selectedHour.padStart(2, '0')}:${selectedMinute.padStart(2, '0')}`;
      return `${dateText} ${timeText}`;
    }
    return '請選擇送洗時間';
  };

  const dropOffTimeOptions = generateDropOffTimeOptions();

  const handleConfirm = () => {
    // 驗證必填欄位
    if (!selectedDropOffTime) {
      Alert.alert('請選擇', '請選擇送洗時間');
      return;
    }
    if (!address.trim()) {
      Alert.alert('請填寫', '請填寫取送地址');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('請填寫', '請填寫聯絡電話');
      return;
    }

    // TODO: 儲存訂單資料到 Firebase
    
    // 導航到成功頁面，傳遞訂單資料
    router.push({
      pathname: '/create-order/success',
      params: {
        dropOffTime: selectedDropOffTime,
        pickupTime: calculatedPickupTime,
        address: address,
        phone: phone,
        notes: notes
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>預約送洗時間與地址</Text>

      {/* 送洗時間選擇 */}
      <View style={styles.section}>
        <Text style={styles.label}>送洗時間 *(今天/明天 00:00~08:00)</Text>
        <Pressable 
          style={styles.timePickerButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.timePickerButtonText}>
            {getDisplayTime()}
          </Text>
          <Text style={styles.timePickerArrow}>▼</Text>
        </Pressable>
      </View>

      {/* 時間選擇器 Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>選擇送洗時間</Text>
              <Pressable 
                style={styles.modalCloseButton}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>
            
            {/* 三個並排的滾輪選擇器 */}
            <View style={styles.pickerContainer}>
              {/* 日期選擇 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>日期</Text>
                <Picker
                  selectedValue={selectedDate}
                  onValueChange={(itemValue) => {
                    setSelectedDate(itemValue);
                    setTimeout(handleTimeComponentChange, 100);
                  }}
                  style={styles.picker}
                >
                  {getDateOptions().map((option, index) => (
                    <Picker.Item 
                      key={index}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>

              {/* 小時選擇 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>小時</Text>
                <Picker
                  selectedValue={selectedHour}
                  onValueChange={(itemValue) => {
                    setSelectedHour(itemValue);
                    setTimeout(handleTimeComponentChange, 100);
                  }}
                  style={styles.picker}
                >
                  {getHourOptions().map((option, index) => (
                    <Picker.Item 
                      key={index}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>

              {/* 分鐘選擇 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>分鐘</Text>
                <Picker
                  selectedValue={selectedMinute}
                  onValueChange={(itemValue) => {
                    setSelectedMinute(itemValue);
                    setTimeout(handleTimeComponentChange, 100);
                  }}
                  style={styles.picker}
                >
                  {getMinuteOptions().map((option, index) => (
                    <Picker.Item 
                      key={index}
                      label={option.label}
                      value={option.value}
                      enabled={!isTimeInPast(selectedDate, selectedHour, option.value)}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* 確認按鈕 */}
            <View style={styles.modalButtonContainer}>
              <Pressable 
                style={[
                  styles.modalConfirmButton,
                  (!selectedDate || !selectedHour || !selectedMinute) && styles.modalConfirmButtonDisabled
                ]}
                onPress={() => {
                  if (selectedDate && selectedHour && selectedMinute) {
                    setShowTimePicker(false);
                  }
                }}
                disabled={!selectedDate || !selectedHour || !selectedMinute}
              >
                <Text style={[
                  styles.modalConfirmButtonText,
                  (!selectedDate || !selectedHour || !selectedMinute) && styles.modalConfirmButtonTextDisabled
                ]}>
                  確認選擇
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* 自動計算的取件時間顯示 */}
      {calculatedPickupTime && (
        <View style={styles.section}>
          <Text style={styles.label}>預計取件時間</Text>
          <View style={styles.calculatedTimeContainer}>
            <Text style={styles.calculatedTimeText}>{calculatedPickupTime}</Text>
            <Text style={styles.calculatedTimeNote}>(送洗後 2 小時)</Text>
          </View>
        </View>
      )}

      {/* 地址輸入 */}
      <View style={styles.section}>
        <Text style={styles.label}>取送地址 *</Text>
        <TextInput
          style={styles.input}
          placeholder="請輸入完整地址（包含樓層、門牌號碼）"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* 電話輸入 */}
      <View style={styles.section}>
        <Text style={styles.label}>聯絡電話 *</Text>
        <TextInput
          style={styles.input}
          placeholder="請輸入手機號碼"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>

      {/* 備註 */}
      <View style={styles.section}>
        <Text style={styles.label}>特殊需求 (選填)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="例如：門口有警衛、需按電鈴、特殊注意事項"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={2}
          maxLength={100}
        />
        <Text style={styles.charCount}>{notes.length}/100</Text>
      </View>

      {/* 費用說明 */}
      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>洗衣費用</Text>
          <Text style={styles.priceValue}>$250</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>取送服務</Text>
          <Text style={styles.priceValue}>免費</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>總計</Text>
          <Text style={styles.totalValue}>$250</Text>
        </View>
      </View>

      {/* 確認按鈕 */}
      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>確認預約</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  timeScrollView: {
    marginBottom: 10,
  },
  timeOption: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timeOptionSelected: {
    borderColor: '#2f95dc',
    backgroundColor: '#f0f8ff',
  },
  timeOptionDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  timeOptionTime: {
    fontSize: 12,
    color: '#888',
  },
  timeOptionTextSelected: {
    color: '#2f95dc',
  },
  calculatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fd',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2f95dc',
  },
  calculatedTimeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  calculatedTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f95dc',
    flex: 1,
  },
  calculatedTimeNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  priceSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  confirmButton: {
    backgroundColor: '#2f95dc',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2f95dc',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  // 時間選擇器新樣式
  timePickerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  timePickerButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  timePickerArrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  // Modal 樣式
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#666',
  },
  picker: {
    height: 200,
    width: '100%',
  },
  // 新增的三列滾輪樣式
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  modalConfirmButton: {
    backgroundColor: '#2f95dc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  modalConfirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  modalConfirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfirmButtonTextDisabled: {
    color: '#999',
  },
});