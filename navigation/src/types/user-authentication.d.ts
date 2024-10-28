declare module 'user-authentication/UserAuthentication' {
  const UserAuthentication: React.ComponentType;
  export default UserAuthentication;
}

declare module 'user-authentication/authSlice' {
  import { Reducer } from '@reduxjs/toolkit';
  const authReducer: Reducer;
  export default authReducer;
}
