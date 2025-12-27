import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();

  // TODO: 從 Firebase 取得訂單詳情
  const mockOrders: Record<string, any> = {
    'LN25122601': {
      id: 'LN25122601',
      status: '洗滌中',
      pickupDate: '2025-12-26 09:30',
      deliveryDate: '2025-12-26 11:30',
      address: '台中市西屯區台灣大道三段99號12樓A室',
      phone: '0912345678',
      items: '白襯衫 2件, 牛仔褲 1件, 毛衣 1件',
      notes: '白襯衫請仔細處理領口污漬',
      totalPrice: 250,
      createTime: '2025-12-26 08:45',
    },
    'LN25122002': {
      id: 'LN25122002',
      status: '已完成',
      pickupDate: '2025-12-20 14:00',
      deliveryDate: '2025-12-20 16:00',
      address: '台中市南屯區文心路一段521號3樓',
      phone: '0987654321',
      items: '套裝 1套, 洋裝 2件, 外套 1件',
      notes: '套裝需要熨燙整理',
      totalPrice: 250,
      createTime: '2025-12-20 13:20',
    },
    'LN25121503': {
      id: 'LN25121503',
      status: '已完成',
      pickupDate: '2025-12-15 10:15',
      deliveryDate: '2025-12-15 12:15',
      address: '台中市北區進化路573號B1',
      phone: '0923456789',
      items: 'T恤 3件, 短褲 2件, 運動服 1套',
      notes: '運動服有汗漬，需要特別處理',
      totalPrice: 250,
      createTime: '2025-12-15 09:30',
    }
  };

  // 根據 ID 取得訂單，如果找不到則使用預設資料
  const order = mockOrders[id as string] || {
    id: id,
    status: '找不到訂單',
    pickupDate: '未知',
    deliveryDate: '未知',
    address: '未知地址',
    items: '未知項目',
    totalPrice: 0,
  };


  const statusSteps = [
    { label: '已取件', completed: order.status !== '找不到訂單', icon: '📦' },
    { label: '洗滌中', completed: order.status === '洗滌中' || order.status === '已完成', icon: '🧺' },
    { label: '烘乾中', completed: order.status === '已完成', icon: '🌪️' },
    { label: '配送中', completed: order.status === '已完成', icon: '🚚' },
    { label: '已送達', completed: order.status === '已完成', icon: '✅' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>訂單編號: {order.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {/* 進度條 */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>洗滌進度</Text>
        {statusSteps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={[
              styles.stepIcon,
              step.completed && styles.stepIconCompleted
            ]}>
              <Text style={styles.stepIconText}>{step.icon}</Text>
            </View>
            <Text style={[
              styles.stepLabel,
              step.completed && styles.stepLabelCompleted
            ]}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* 訂單詳情 */}
      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>訂單詳情</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>取件時間</Text>
          <Text style={styles.detailValue}>{order.pickupDate}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>送回時間</Text>
          <Text style={styles.detailValue}>{order.deliveryDate}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>地址</Text>
          <Text style={styles.detailValue}>{order.address}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>衣物</Text>
          <Text style={styles.detailValue}>{order.items}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>費用</Text>
          <Text style={[styles.detailValue, styles.priceText]}>
            ${order.totalPrice}
          </Text>
        </View>
      </View>

      {/* 聯絡客服 */}
      {/* <View style={styles.contactSection}>
        <Text style={styles.contactText}>需要協助？</Text>
        <Text style={styles.contactLink}>聯絡客服</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: '#2f95dc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepIconCompleted: {
    backgroundColor: '#2f95dc',
  },
  stepIconText: {
    fontSize: 20,
  },
  stepLabel: {
    fontSize: 16,
    color: '#999',
  },
  stepLabelCompleted: {
    color: '#333',
    fontWeight: '600',
  },
  detailSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  priceText: {
    color: '#2f95dc',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contactSection: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  contactLink: {
    fontSize: 16,
    color: '#2f95dc',
    fontWeight: '600',
  },
});
