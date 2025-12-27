import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // TODO: 從 Firebase 取得進行中的訂單
  const activeOrders = [
    { id: 'LN25122601', status: '洗滌中', pickupDate: '2025-12-26' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 歡迎區塊 */}
      <View style={styles.header}>
        <Text style={styles.title}>歡迎使用 泡泡潔衣</Text>
      </View>

      {/* 快速預約按鈕 */}
      <Pressable 
        style={styles.mainButton}
        onPress={() => router.push('/create-order/')}
      >
        <View style={styles.buttonContent}>
          <View>
            <Text style={styles.buttonTitle}>點擊預約洗衣 $250</Text>
          </View>
        </View>
      </Pressable>

      {/* 進行中的訂單 */}
      {activeOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>進行中的訂單</Text>
          {activeOrders.map((order) => (
            <Pressable 
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push(`/order/${order.id}`)}
            >
              <View style={styles.orderHeader} >
                <Text style={styles.orderStatus}>{order.status}</Text>
                <Text style={styles.orderDate}>{order.pickupDate}</Text>
              </View>
              <Text style={styles.orderDetail}>訂單編號: {order.id}</Text>
              <Text style={styles.viewDetail}>查看詳情 →</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* 服務說明 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>服務流程</Text>
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepText}>預約</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.step}>
            <Text style={styles.stepText}>取件</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.step}>
            <Text style={styles.stepText}>洗衣</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.step}>
            <Text style={styles.stepText}>送回</Text>
          </View>
        </View>
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  mainButton: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  buttonIcon: {
    fontSize: 40,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  banner: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerIcon: {
    fontSize: 30,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  bannerText: {
    fontSize: 14,
    color: '#856404',
    marginTop: 2,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  viewDetail: {
    fontSize: 14,
    color: '#2f95dc',
    fontWeight: '600',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  stepText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  arrow: {
    fontSize: 16,
    color: '#ccc',
    marginHorizontal: 5,
  },
});