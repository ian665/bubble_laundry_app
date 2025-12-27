import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter, Stack } from 'expo-router';

export default function CouponsScreen() {
  const router = useRouter();

  const [coupons, setCoupons] = useState([
    {
      id: '1',
      title: '新用戶專享',
      discount: '9折優惠',
      description: '首次使用享9折優惠，最高折抵50元',
      code: 'NEW10',
      minAmount: 100,
      maxDiscount: 50,
      expiry: '2025-12-31',
      used: false,
      type: 'percentage' // percentage 或 fixed
    },
    {
      id: '2',
      title: '聖誕節特惠',
      discount: '折抵30元',
      description: '聖誕節專屬優惠券，滿200元可使用',
      code: 'XMAS30',
      minAmount: 200,
      maxDiscount: 30,
      expiry: '2025-12-25',
      used: true,
      type: 'fixed'
    },
    {
      id: '3',
      title: '週末限定',
      discount: '9折優惠',
      description: '週末專享優惠，洗衣服務9折',
      code: 'WEEKEND9',
      minAmount: 150,
      maxDiscount: 40,
      expiry: '2025-12-28',
      used: false,
      type: 'percentage'
    },
  ]);

  const [inputCode, setInputCode] = useState('');

  const handleRedeem = () => {
    if (!inputCode.trim()) {
      Alert.alert('錯誤', '請輸入優惠碼');
      return;
    }

    // 模擬兌換邏輯
    const newCoupon = {
      id: Date.now().toString(),
      title: '手動兌換',
      discount: '9折優惠',
      description: '透過優惠碼兌換的優惠券',
      code: inputCode.toUpperCase(),
      minAmount: 100,
      maxDiscount: 50,
      expiry: '2025-12-31',
      used: false,
      type: 'percentage'
    };

    setCoupons(prev => [newCoupon, ...prev]);
    setInputCode('');
    Alert.alert('成功', '優惠券兌換成功！');
  };

  const handleUseCoupon = (couponId: string) => {
    Alert.alert(
      '使用優惠券',
      '確定要在下次訂單中使用此優惠券嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定',
          onPress: () => {
            // TODO: 實際應用到訂單邏輯
            Alert.alert('成功', '優惠券已設定，將在下次訂單時自動使用');
            router.push('/(tabs)');
          }
        }
      ]
    );
  };

  const formatExpiry = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: '我的優惠券',
        headerShown: true,
      }} />
      <ScrollView style={styles.container}>
        {/* 兌換優惠碼區域 */}
        <View style={styles.redeemSection}>
          <Text style={styles.sectionTitle}>兌換優惠碼</Text>
          <View style={styles.redeemContainer}>
            <TextInput
              style={styles.codeInput}
              value={inputCode}
              onChangeText={setInputCode}
              placeholder="請輸入優惠碼"
              autoCapitalize="characters"
            />
            <Pressable style={styles.redeemButton} onPress={handleRedeem}>
              <Text style={styles.redeemButtonText}>兌換</Text>
            </Pressable>
          </View>
        </View>

        {/* 優惠券列表 */}
        <View style={styles.couponList}>
          <Text style={styles.sectionTitle}>可用優惠券 ({coupons.filter(c => !c.used && !isExpired(c.expiry)).length})</Text>
          
          {coupons.map((coupon) => {
            const expired = isExpired(coupon.expiry);
            const disabled = coupon.used || expired;
            
            return (
              <View key={coupon.id} style={[
                styles.couponCard,
                disabled && styles.couponCardDisabled
              ]}>
                <View style={styles.couponLeft}>
                  <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>{coupon.discount}</Text>
                  </View>
                </View>
                
                <View style={styles.couponRight}>
                  <Text style={styles.couponTitle}>{coupon.title}</Text>
                  <Text style={styles.couponDescription}>{coupon.description}</Text>
                  <Text style={styles.couponCode}>優惠碼: {coupon.code}</Text>
                  <Text style={styles.couponExpiry}>
                    有效期限: {formatExpiry(coupon.expiry)}
                  </Text>
                  
                  {coupon.used && (
                    <Text style={styles.statusText}>已使用</Text>
                  )}
                  {expired && !coupon.used && (
                    <Text style={[styles.statusText, styles.expiredText]}>已過期</Text>
                  )}
                  
                  {!disabled && (
                    <Pressable 
                      style={styles.useButton}
                      onPress={() => handleUseCoupon(coupon.id)}
                    >
                      <Text style={styles.useButtonText}>立即使用</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
          
          {coupons.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>暫無優惠券</Text>
              <Text style={styles.emptySubtitle}>完成訂單或輸入優惠碼來獲得優惠券</Text>
            </View>
          )}
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
  redeemSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  redeemContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  codeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  redeemButton: {
    backgroundColor: '#2f95dc',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  couponList: {
    padding: 15,
  },
  couponCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  couponCardDisabled: {
    opacity: 0.6,
  },
  couponLeft: {
    backgroundColor: '#2f95dc',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  discountContainer: {
    alignItems: 'center',
  },
  discountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  couponRight: {
    flex: 1,
    padding: 15,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  couponDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  couponCode: {
    fontSize: 12,
    color: '#2f95dc',
    fontWeight: '600',
    marginBottom: 5,
  },
  couponExpiry: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  expiredText: {
    color: '#ff3b30',
  },
  useButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  useButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 50,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});