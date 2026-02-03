import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '../app/page'
import Header from '../app/components/Header'
import { SearchProvider } from '../app/context/SearchContext'

// Mock next/navigation because Header uses usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock next/image because it's tricky in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, unoptimized, quality, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />
  },
}))
 
describe('Search Integration', () => {
  it('shows all characters initially', () => {
    render(
      <SearchProvider>
        <Page />
      </SearchProvider>
    )
    // Characters appear twice (front/back of card), so we check generally
    expect(screen.getAllByText('Gon Freecss').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Killua Zoldyck').length).toBeGreaterThan(0)
  })

  it('filters the list when user types "Gon"', async () => {
    const user = userEvent.setup()
    
    render(
      <SearchProvider>
        <Header />
        <Page />
      </SearchProvider>
    )

    // Verify initial state
    expect(screen.getAllByText('Gon Freecss').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Killua Zoldyck').length).toBeGreaterThan(0)

    // Find input and type
    const input = screen.getByRole('textbox', { name: /search/i })
    await user.type(input, 'Gon')

    // Verify filtering
    expect(screen.getAllByText('Gon Freecss').length).toBeGreaterThan(0)
    
    // Wait for Killua to disappear
    await waitFor(() => {
        expect(screen.queryAllByText('Killua Zoldyck')).toHaveLength(0)
    })
  })
})



