// contexts/UserContext.tsx
import { createContext, useContext } from 'react';

interface UserContextType {
  avatarUrl: string;
}

export const UserContext = createContext<UserContextType>({
  avatarUrl: '',
});

export const useUser = () => useContext(UserContext);
