import { Stack } from 'expo-router';

export default function CreateOrderLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerBackTitle: '返回',
        // 讓這整個流程從右邊滑入，或是維持 RootLayout 設定的 Modal 效果
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '1. 選擇衣物',
          // 顯示返回按鈕回到首頁
        }} 
      />
      <Stack.Screen 
        name="schedule" 
        options={{ title: '2. 預約時間', headerShown: true }} 
      />
      <Stack.Screen 
        name="confirm" 
        options={{ title: '3. 確認訂單' }} 
      />
      <Stack.Screen 
        name="success" 
        options={{ 
          title: '預約成功',
          headerBackVisible: false, // 成功頁面不顯示返回按鈕
        }} 
      />
    </Stack>  
  );
}