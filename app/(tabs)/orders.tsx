import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();

  // TODO: 從 Firebase 取得訂單列表
  const orders = [
    { id: 'LN25122601', status: '洗滌中', date: '2025-12-26', price: 250 },
    { id: 'LN25122002', status: '已完成', date: '2025-12-20', price: 250 },
    { id: 'LN25121503', status: '已完成', date: '2025-12-15', price: 250 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '洗滌中':
        return '#2f95dc';
      case '已完成':
        return '#4caf50';
      case '已取消':
        return '#999';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>我的訂單</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>暫無訂單</Text>
          <Text style={styles.emptySubtext}>立即預約您的第一筆洗衣服務</Text>
        </View>
      ) : (
        <View style={styles.ordersList}>
          {orders.map((order) => (
            <Pressable
              key={order.id}
              style={styles.orderCard}
              onPress={() => router.push(`/order/${order.id}`)}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>

              <View style={styles.orderBody}>
                <Text style={styles.orderId}>訂單編號: {order.id}</Text>
                <Text style={styles.orderPrice}>${order.price}</Text>
              </View>

              <Text style={styles.viewDetail}>查看詳情 →</Text>
            </Pressable>
          ))}
        </View>
      )}
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
  },
  ordersList: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    color: '#333',
  },
  orderPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  viewDetail: {
    fontSize: 14,
    color: '#2f95dc',
    fontWeight: '600',
  },
});
