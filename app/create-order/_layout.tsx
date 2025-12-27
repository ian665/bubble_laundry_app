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
        options={{ title: '1. 選擇衣物' }} 
      />
      <Stack.Screen 
        name="schedule" 
        options={{ title: '2. 預約時間' }} 
      />
    </Stack>
  );
}