import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* 隱藏 (tabs) 的 Header，因為 tabs 內部會自己處理 */}
      <Stack.Screen name="(tabs)" options={{ presentation: 'modal',headerTitle: "訂單詳情" ,headerShown: false }} />
      
      {/* 預約流程的彈窗感 (Modal) */}
      <Stack.Screen 
        name="create-order" 
        options={{ 
          presentation: 'modal', 
          headerTitle: '預約取件', 
          headerShown: false, // 顯示導航欄，包含返回按鈕
          headerBackTitle: '返回',
        }} 
      />
      <Stack.Screen 
        name="order/[id]" 
        options={{ 
          headerTitle: '訂單詳情',
          headerShown: true, // 顯示 navigation header
          headerBackTitle: '返回',
        }} 
      />
    </Stack>
  );
}