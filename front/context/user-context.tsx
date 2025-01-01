import { UserEntity } from '@/types/user'
import React, { useContext } from 'react'

export const UserContext = React.createContext<UserEntity | null>(null)

export const useUser = () => {
  return useContext(UserContext)
}
