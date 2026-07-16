import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

// Receiving arguments for API return values
type ApiResponse = {
  id: number
  name: string
  email: string
}

