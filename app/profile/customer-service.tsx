import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function CustomerServiceScreen() {
  const router = useRouter();

  const handleCall = () => {
    const phoneNumber = '0800-123-456';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = () => {
    const email = 'support@bubblelaundry.com';
    const subject = '客服諮詢';
    const body = '請在此描述您的問題...';
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const handleLine = () => {
    Alert.alert('Line客服', 'Line ID: @bubblelaundry\n\n或掃描QR Code加入官方帳號');
  };

  const faqData = [
    {
      question: '營業時間是什麼時候？',
      answer: '我們的服務時間為每天晚上0點到早上8點，全年無休為您服務。'
    },
    {
      question: '洗衣需要多長時間？',
      answer: '一般洗衣服務約需2小時完成，包含取件、洗滌、烘乾和送回的完整流程。'
    },
    {
      question: '如何計算洗衣費用？',
      answer: '基本洗衣服務每次250元，包含取送服務。特殊衣物或加急服務可能需要額外費用。'
    },
    {
      question: '可以指定洗衣時間嗎？',
      answer: '可以！您可以在預約時選擇方便的取件時間，我們會準時到達為您服務。'
    },
    {
      question: '衣物遺失或損壞怎麼辦？',
      answer: '我們為每件衣物投保，如有遺失或損壞，將依照衣物價值進行賠償。請保留購買憑證。'
    },
    {
      question: '可以取消訂單嗎？',
      answer: '在師傅取件前30分鐘可免費取消。取件後如需取消，將酌收部分費用。'
    }
  ];

  return (
    <>
      <Stack.Screen options={{ 
        title: '客服中心',
        headerShown: true,
      }} />
      <ScrollView style={styles.container}>
        {/* 聯絡方式 */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>聯絡我們</Text>
          
          <Pressable style={styles.contactItem} onPress={handleCall}>
            <View style={styles.contactIcon}>
              <Text style={styles.contactEmoji}>📞</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>客服專線</Text>
              <Text style={styles.contactDetail}>0800-123-456</Text>
              <Text style={styles.contactTime}>服務時間: 24小時</Text>
            </View>
            <Text style={styles.contactArrow}>›</Text>
          </Pressable>

          <Pressable style={styles.contactItem} onPress={handleLine}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Line客服</Text>
              <Text style={styles.contactDetail}>@bubblelaundry</Text>
              <Text style={styles.contactTime}>回覆時間: 10分鐘內</Text>
            </View>
            <Text style={styles.contactArrow}>›</Text>
          </Pressable>

          <Pressable style={styles.contactItem} onPress={handleEmail}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>電子郵件</Text>
              <Text style={styles.contactDetail}>support@bubblelaundry.com</Text>
              <Text style={styles.contactTime}>回覆時間: 24小時內</Text>
            </View>
            <Text style={styles.contactArrow}>›</Text>
          </Pressable>
        </View>

        {/* 常見問題 */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>常見問題</Text>
          
          {faqData.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Q: {faq.question}</Text>
              <Text style={styles.faqAnswer}>A: {faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* 服務資訊 */}
        <View style={styles.serviceSection}>
          <Text style={styles.sectionTitle}>服務資訊</Text>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>營業時間</Text>
            <Text style={styles.serviceDetail}>每天 06:00 - 22:00</Text>
          </View>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>服務區域</Text>
            <Text style={styles.serviceDetail}>台中市全區（部分偏遠地區除外）</Text>
          </View>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>付款方式</Text>
            <Text style={styles.serviceDetail}>現金、信用卡、LINE Pay、街口支付</Text>
          </View>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>品質保證</Text>
            <Text style={styles.serviceDetail}>專業洗衣設備、環保洗劑、品質保證</Text>
          </View>
        </View>

        {/* 緊急聯絡 */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>緊急聯絡</Text>
          <Text style={styles.emergencyText}>
            如遇緊急情況或服務問題，請立即撥打24小時客服專線
          </Text>
          <Pressable style={styles.emergencyButton} onPress={handleCall}>
            <Text style={styles.emergencyButtonText}>立即撥打 0800-123-456</Text>
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
  contactSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactEmoji: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactDetail: {
    fontSize: 14,
    color: '#2f95dc',
    marginBottom: 2,
  },
  contactTime: {
    fontSize: 12,
    color: '#999',
  },
  contactArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  faqSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  serviceSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  serviceDetail: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  emergencySection: {
    backgroundColor: '#fff3cd',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffeaa7',
    marginBottom: 30,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 15,
    lineHeight: 18,
  },
  emergencyButton: {
    backgroundColor: '#ff6b35',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});