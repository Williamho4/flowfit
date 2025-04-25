import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux'
import type { AppDispatch, RootState, AppStore } from '../store'

// ✅ Correct typing for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<AppStore>()
