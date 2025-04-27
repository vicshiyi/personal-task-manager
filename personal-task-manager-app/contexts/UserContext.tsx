// Provides a global user context for the app.
// Currently supports accessing the user's avatar URL.

import { createContext, useContext } from 'react';

// Define the shape of the UserContext
interface UserContextType {
  avatarUrl: string; // URL of the user's profile avatar
}

// Initialize UserContext with default values
export const UserContext = createContext<UserContextType>({
  avatarUrl: '', // Default avatar URL (empty)
});

/**
 * Custom hook to access the UserContext.
 * @returns {UserContextType} - The current user context values.
 */
export const useUser = () => useContext(UserContext);
