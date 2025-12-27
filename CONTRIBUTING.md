# 🔄 Git 工作流程指南

## 🌳 分支策略

### **主要分支**
- **`main`** - 產品發布分支（穩定版本）
- **`develop`** - 開發主分支（整合分支）

### **功能分支**
- **`feature/功能名稱`** - 新功能開發
- **`bugfix/問題描述`** - 錯誤修復
- **`hotfix/緊急修復`** - 緊急修復

## 📋 工作流程

### 1. **開始新功能**
```bash
# 從 develop 分支開始
git checkout develop
git pull origin develop

# 建立功能分支
git checkout -b feature/user-authentication
```

### 2. **開發過程**
```bash
# 定期提交
git add .
git commit -m "feat: 新增用戶登入功能"

# 推送到遠程
git push origin feature/user-authentication
```

### 3. **完成功能**
```bash
# 合併回 develop
git checkout develop
git pull origin develop
git merge feature/user-authentication

# 刪除功能分支
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

## 📝 Commit 訊息規範

### **格式**
```
<類型>(<範圍>): <簡短描述>

<詳細說明>

<相關 Issue>
```

### **類型定義**
- **feat**: 新功能
- **fix**: 錯誤修復
- **docs**: 文件更新
- **style**: 格式調整
- **refactor**: 程式重構
- **test**: 測試相關
- **chore**: 建置或工具變更

### **範例**
```bash
git commit -m "feat(auth): 新增 Google OAuth 登入功能

- 整合 Google Sign-In SDK
- 新增 OAuth 回調處理
- 更新用戶資料結構

Closes #123"
```