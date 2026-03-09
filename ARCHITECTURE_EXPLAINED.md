# GIẢI THÍCH KIẾN TRÚC FRONTEND - SOCIAL JOB PLATFORM

## 📚 MỤC LỤC
1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Các thành phần chính](#2-các-thành-phần-chính)
3. [Flow đăng nhập với Google](#3-flow-đăng-nhập-với-google)
4. [Cách dữ liệu chạy qua hệ thống](#4-cách-dữ-liệu-chạy-qua-hệ-thống)

---

## 1. TỔNG QUAN KIẾN TRÚC

### Tech Stack:
- **Next.js 16** - Framework React cho frontend
- **Redux Toolkit** - Quản lý state toàn cục
- **RTK Query** - Gọi API và cache dữ liệu
- **Firebase Auth** - Xác thực người dùng
- **TailwindCSS** - Styling

### Cấu trúc thư mục:
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout chính của toàn app
│   ├── page.tsx           # Trang chủ
│   └── (auth)/
│       └── login/
│           └── page.tsx   # Trang đăng nhập
├── components/
│   ├── auth/
│   │   └── login-form.tsx # Form đăng nhập
│   └── providers/
│       └── store-provider.tsx  # Wrapper Redux Store
├── services/
│   ├── appApi.ts          # Cấu hình RTK Query chung
│   └── authApi.ts         # API endpoints cho auth
├── store/
│   ├── index.ts           # Redux store
│   └── slices/
│       └── authSlice.ts   # State quản lý auth
├── lib/
│   └── firebase.ts        # Cấu hình Firebase
└── types/
    └── auth.ts            # TypeScript types
```

---

## 2. CÁC THÀNH PHẦN CHÍNH

### A. Redux Store (`src/store/index.ts`)
**Nhiệm vụ:** Quản lý state toàn ứng dụng

```typescript
export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,  // ← Cache API calls
    auth: authReducer,                      // ← Lưu thông tin user & token
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),  // ← Thêm RTK Query middleware
});
```

**Giải thích:**
- `appApi.reducer`: Cache tất cả API response (tránh gọi API nhiều lần)
- `auth`: Lưu thông tin user đang đăng nhập + token JWT
- `middleware`: Xử lý các tác vụ bất đồng bộ (API calls)

---

### B. Auth Slice (`src/store/slices/authSlice.ts`)
**Nhiệm vụ:** Quản lý trạng thái đăng nhập

```typescript
interface AuthState {
  user: User | null;       // Thông tin user (id, email, name...)
  token: string | null;    // JWT token để gọi API
}

// Actions:
- setCredentials({ user, token })  → Lưu user + token vào state & localStorage
- logout()                         → Xóa user + token
```

**Flow:**
1. User đăng nhập thành công → dispatch `setCredentials()`
2. State được update, lưu vào `localStorage`
3. Các component khác đọc từ state để biết user đã login chưa

---

### C. RTK Query - API Service (`src/services/appApi.ts`)
**Nhiệm vụ:** Tạo HTTP requests tới backend

```typescript
export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",  // ← Backend URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);  // ← Tự động thêm token
      }
      return headers;
    },
  }),
  endpoints: () => ({}),  // Các endpoint được inject từ authApi
});
```

**Điểm hay:**
- **Tự động thêm JWT token** vào header mỗi request
- **Cache response** - giảm số lần gọi API
- **Auto re-fetch** khi cần

---

### D. Auth API (`src/services/authApi.ts`)
**Nhiệm vụ:** Định nghĩa các endpoint liên quan đến authentication

```typescript
export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithFirebase: builder.mutation<LoginResponse, FirebaseLoginRequest>({
      query: (body) => ({
        url: "/auth/firebase",     // ← POST /api/auth/firebase
        method: "POST",
        body: { idToken: "..." }   // ← Gửi Firebase ID token
      }),
    }),
  }),
});

// Tự động tạo hook:
export const { useLoginWithFirebaseMutation } = authApi;
```

**Khi gọi:**
```typescript
const [loginWithFirebase] = useLoginWithFirebaseMutation();
const response = await loginWithFirebase({ idToken: "xyz..." });
```

---

### E. Firebase Config (`src/lib/firebase.ts`)
**Nhiệm vụ:** Khởi tạo Firebase Authentication

```typescript
const app = initializeApp(firebaseConfig);    // ← Kết nối Firebase project
const auth = getAuth(app);                    // ← Firebase Auth service
const googleProvider = new GoogleAuthProvider();  // ← Google login provider
```

---

### F. Login Form Component (`src/components/auth/login-form.tsx`)
**Nhiệm vụ:** UI đăng nhập + xử lý logic

```typescript
const handleGoogleLogin = async () => {
  // 1. Mở popup Google login
  const result = await signInWithPopup(auth, googleProvider);
  
  // 2. Lấy Firebase ID token
  const idToken = await result.user.getIdToken();
  
  // 3. Gửi token lên backend
  const response = await loginWithFirebase({ idToken });
  
  // 4. Lưu user + token (TODO)
  // dispatch(setCredentials(response));
};
```

---

## 3. FLOW ĐĂNG NHẬP VỚI GOOGLE

### Bước 1: User click "Tiếp tục với Google"
📍 File: `login-form.tsx`
```
User click button
  ↓
handleGoogleLogin() được gọi
```

---

### Bước 2: Firebase mở popup Google
📍 File: `firebase.ts` + `login-form.tsx`
```
signInWithPopup(auth, googleProvider)
  ↓
✨ Popup Google mở ra
  ↓
User chọn tài khoản Google
  ↓
Firebase nhận thông tin từ Google
  ↓
Trả về FirebaseUser object
```

**Dữ liệu nhận được:**
```javascript
{
  uid: "firebase-uid-123",
  email: "user@gmail.com",
  displayName: "Nguyễn Văn A",
  photoURL: "https://..."
}
```

---

### Bước 3: Lấy Firebase ID Token
📍 File: `login-form.tsx`
```
const idToken = await result.user.getIdToken();
```

**ID Token là gì?**
- Một chuỗi JWT do Firebase tạo ra
- Chứa thông tin user đã đăng nhập
- Backend dùng nó để verify user có thật không

**Ví dụ token:**
```
eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5...  (rất dài)
```

---

### Bước 4: Gửi ID Token lên Backend
📍 File: `authApi.ts` → Backend
```
const response = await loginWithFirebase({ idToken });
  ↓
POST http://localhost:8080/api/auth/firebase
Body: { "idToken": "eyJhbGci..." }
  ↓
Backend nhận request
```

---

### Bước 5: Backend xử lý
📍 Backend: `AuthController.java` → `AuthService.java`
```java
// 1. Verify token với Firebase
FirebaseToken token = firebaseAuth.verifyIdToken(idToken);

// 2. Lấy thông tin user
String email = token.getEmail();
String name = token.getName();

// 3. Tìm hoặc tạo user trong database
User user = findOrCreateUser(email, name);

// 4. Tạo UserAuth record (lưu firebaseUid)
ensureUserAuth(user, token.getUid());

// 5. Trả về user cho frontend
return user;
```

---

### Bước 6: Frontend nhận response
📍 File: `login-form.tsx`
```javascript
const response = await loginWithFirebase({ idToken });

console.log(response);
// Output:
// {
//   user: {
//     id: "1",
//     email: "user@gmail.com",
//     fullName: "Nguyễn Văn A",
//     username: "user",
//     avatarUrl: "https://..."
//   },
//   token: "jwt-token-from-backend"  // ← Backend tạo (TODO)
// }
```

---

### Bước 7: Lưu thông tin vào Redux Store (TODO - chưa làm)
📍 File: `login-form.tsx`
```typescript
// Sau khi có response, cần dispatch action:
dispatch(setCredentials({
  user: response.user,
  token: response.token
}));

// Chuyển đến dashboard
router.push("/dashboard");
```

**State được update:**
```typescript
// Redux state:
auth: {
  user: { id: "1", email: "user@gmail.com", ... },
  token: "jwt-token..."
}

// localStorage:
localStorage.setItem("token", "jwt-token...");
localStorage.setItem("user", JSON.stringify(user));
```

---

## 4. CÁCH DỮ LIỆU CHẠY QUA HỆ THỐNG

### A. Khi app khởi động
```
1. index.tsx (root)
     ↓
2. layout.tsx
     ↓
3. <StoreProvider> wrap toàn bộ app
     ↓ (Redux store được tạo)
4. Mọi component con có thể:
   - useSelector() → đọc state
   - useDispatch() → update state
   - useLoginMutation() → gọi API
```

---

### B. Khi gọi API
```
Component gọi hook
     ↓
const [loginWithFirebase] = useLoginWithFirebaseMutation();
     ↓
loginWithFirebase({ idToken })
     ↓
RTK Query tạo HTTP request:
  - URL: http://localhost:8080/api/auth/firebase
  - Method: POST
  - Headers: { "Authorization": "Bearer <token-nếu-có>" }
  - Body: { "idToken": "..." }
     ↓
Backend xử lý
     ↓
Response trả về
     ↓
RTK Query cache response
     ↓
Component nhận data
```

---

### C. Khi cần check user đã login chưa
```typescript
// Trong bất kỳ component nào:
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function SomeComponent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (!user) {
    return <Navigate to="/login" />;  // Chưa login → redirect
  }
  
  return <div>Xin chào {user.fullName}</div>;
}
```

---

## 5. VẤN ĐỀ HIỆN TẠI & CẦN LÀM

### ❌ Chưa làm:
1. **Lưu token vào Redux store** sau khi login thành công
2. **Backend chưa trả về JWT token** (chỉ trả user object)
3. **Chưa có protected routes** (ai cũng vào được mọi trang)
4. **Chưa có auto-refresh token**
5. **Chưa handle logout**

### ✅ Cần làm tiếp:
```typescript
// login-form.tsx - Sau dòng console.log("Login successful:"):
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

const dispatch = useDispatch();

// Sau khi có response:
dispatch(setCredentials({
  user: response.user,
  token: response.token  // Backend cần trả về token này
}));

router.push("/dashboard");
```

---

## 6. CÁCH DEBUG

### Kiểm tra Redux State:
```typescript
// Trong component bất kỳ:
const state = useSelector((state: RootState) => state);
console.log("Full state:", state);
```

### Xem API calls:
- Mở Chrome DevTools → Network tab
- Filter: XHR
- Xem request/response

### Xem Redux actions:
- Install Redux DevTools Extension
- Mở DevTools → Redux tab
- Xem mọi action được dispatch

---

## 7. TÓM TẮT NGẮN GỌN

```
User → Click Google login
  ↓
Firebase → Mở popup Google
  ↓
Google → User chọn tài khoản
  ↓
Firebase → Trả về ID token
  ↓
Frontend → Gửi token lên backend (RTK Query)
  ↓
Backend → Verify token, tạo/tìm user
  ↓
Backend → Trả về user data
  ↓
Frontend → Lưu vào Redux store (TODO)
  ↓
Frontend → Redirect to dashboard (TODO)
```

---

## 8. CÂU HỎI THƯỜNG GẶP

**Q: Tại sao cần Redux khi đã có RTK Query cache?**
→ RTK Query cache API response, Redux lưu **global state** (như user hiện tại)

**Q: Token được lưu ở đâu?**
→ Redux state (trong RAM) + localStorage (trên disk)

**Q: Tại sao cần Firebase khi backend đã có auth?**
→ Firebase làm OAuth với Google, backend chỉ verify token

**Q: prepareHeaders trong appApi.ts làm gì?**
→ Tự động thêm token vào header mỗi request đến backend

**Q: Tại sao dùng .unwrap()?**
→ Để bắt lỗi theo kiểu try/catch thay vì .then().catch()

---

Có câu hỏi gì không rõ không? 🚀
