import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import NumberPicker from '../../components/NumberPicker';

export default function SelectItemsScreen() {
  const router = useRouter();
  const [clothCount, setClothCount] = useState('0');
  const [jacketCount, setJacketCount] = useState('0');
  const [pantsCount, setPantsCount] = useState('0');
  const [underwearCount, setUnderwearCount] = useState('0');
  const [towelCount, setTowelCount] = useState('0');

  const totalItems = parseInt(clothCount || '0') + parseInt(jacketCount || '0') + 
                     parseInt(pantsCount || '0') + parseInt(underwearCount || '0') +
                     parseInt(towelCount || '0');

  const handleNext = () => {
    if (totalItems === 0) {
      alert('請至少選擇一件衣物');
      return;
    }
    router.push('/create-order/schedule');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>選擇衣物件數</Text>
      <Text style={styles.subtitle}>請輸入需要清洗的衣物數量</Text>

      <View style={styles.itemsContainer}>
        <View style={styles.itemCard}>
          <Text style={styles.itemLabel}>衣服</Text>
          <NumberPicker
            value={clothCount}
            onValueChange={setClothCount}
            max={30}
          />
          <Text style={styles.unit}>件</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.itemLabel}>外套</Text>
          <NumberPicker
            value={jacketCount}
            onValueChange={setJacketCount}
            max={20}
          />
          <Text style={styles.unit}>件</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.itemLabel}>褲子</Text>
          <NumberPicker
            value={pantsCount}
            onValueChange={setPantsCount}
            max={25}
          />
          <Text style={styles.unit}>件</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.itemLabel}>內衣物</Text>
          <NumberPicker
            value={underwearCount}
            onValueChange={setUnderwearCount}
            max={30}
          />
          <Text style={styles.unit}>件</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.itemLabel}>毛巾棉被</Text>
          <NumberPicker
            value={towelCount}
            onValueChange={setTowelCount}
            max={15}
          />
          <Text style={styles.unit}>件</Text>
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>總計: {totalItems} 件</Text>
        <Text style={styles.priceText}>費用: $250</Text>
      </View>

      <Pressable 
        style={[styles.nextButton, totalItems === 0 && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={totalItems === 0}
      >
        <Text style={styles.nextButtonText}>下一步：選擇時間地址</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
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
    marginBottom: 5,
  },
  unit: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  nextButton: {
    backgroundColor: '#2f95dc',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
