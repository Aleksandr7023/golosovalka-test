// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import TestScreen from './screens/TestScreen.jsx'
import './styles/screens/TestScreen.css'

createRoot(document.getElementById('root')).render(<TestScreen />)