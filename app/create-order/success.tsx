import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 動畫值
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;
  const fadeInValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // 打勾動畫
    Animated.sequence([
      Animated.timing(checkmarkScale, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(checkmarkScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // 旋轉動畫
    Animated.timing(checkmarkRotate, {
      toValue: 1,
      duration: 600,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();

    // 淡入動畫
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // 倒數計時
    // const timer = setInterval(() => {
    //   setCountdown(prev => {
    //     if (prev <= 1) {
    //       clearInterval(timer);
    //       // 倒數結束，但不自動跳轉
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  const rotate = checkmarkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 生成訂單編號
  const generateOrderId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LN${year}${month}${date}${random}`;
  };

  const orderId = generateOrderId();

  return (
    <View style={styles.container}>
      {/* 成功打勾動畫 */}
      <Animated.View 
        style={[
          styles.checkmarkContainer,
          {
            transform: [
              { scale: checkmarkScale },
              { rotate: rotate }
            ]
          }
        ]}
      >
        <Text style={styles.checkmark}>✓</Text>
      </Animated.View>

      {/* 成功信息 */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeInValue }]}>
        <Text style={styles.successTitle}>預約成功！</Text>
        <Text style={styles.successSubtitle}>您的洗衣訂單已成功建立</Text>
        
        {/* 訂單信息卡片 */}
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderIdLabel}>訂單編號</Text>
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
          
          <View style={styles.orderDetails}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>送洗時間</Text>
              <Text style={styles.orderValue}>
                {params.dropOffTime ? new Date(params.dropOffTime as string).toLocaleString('zh-TW') : '未指定'}
              </Text>
            </View>
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>預計取件</Text>
              <Text style={styles.orderValue}>{params.pickupTime || '未指定'}</Text>
            </View>
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>取送地址</Text>
              <Text style={styles.orderValue} numberOfLines={2}>
                {params.address || '未指定'}
              </Text>
            </View>
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>聯絡電話</Text>
              <Text style={styles.orderValue}>{params.phone || '未指定'}</Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>總金額</Text>
              <Text style={styles.totalAmount}>$250</Text>
            </View>
          </View>
        </View>

        {/* 下一步提示 */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>接下來</Text>
          <Text style={styles.nextStepsText}>• 我們會在預約時間前聯絡您確認</Text>
          <Text style={styles.nextStepsText}>• 可在「我的訂單」中查看進度</Text>
          <Text style={styles.nextStepsText}>• 有問題請撥打客服專線</Text>
        </View>

        {/* 倒數計時 */}
        {/* {countdown > 0 ? (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>
              倒數計時 {countdown} 秒
            </Text>
          </View>
        ) : (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>
              ✨ 預約完成！
            </Text>
          </View> */}
        
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  checkmark: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  orderCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  orderHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderIdLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f95dc',
    letterSpacing: 1,
  },
  orderDetails: {
    gap: 15,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  orderValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  nextStepsContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  nextStepsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  countdownContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  countdownText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});