import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // define:{
  //   'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(import.meta.env.VITE_FIREBASE_API_KEY),
  //   'process.env.VITE_FIREBASE_AUTHDOMAIN':JSON.stringify(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
  //   'process.env.VITE_FIREBASE_PROJECTID':JSON.stringify(import.meta.env.VITE_FIREBASE_PROJECTID),
  //   'process.env.VITE_FIREBASE_STORAGEBUCKET':JSON.stringify(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
  //   'process.env.VITE_FIREBASE_MESSAGINGSENDERID':JSON.stringify(import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID),
  //   'process.env.VITE_FIREBASE_APPID':JSON.stringify(import.meta.env.VITE_FIREBASE_APPID),

  // },
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [react()],
})
