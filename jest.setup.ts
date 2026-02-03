import '@testing-library/jest-dom'

// Mock ResizeObserver for Framer Motion
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

