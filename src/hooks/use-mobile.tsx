
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if window exists (for SSR compatibility)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      
      // Create a proper media query listener
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      
      // Modern approach for detecting changes
      const handleChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches)
      }
      
      // Fallback for resize events in older browsers
      const handleResize = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
      
      // Use the modern API if available
      if (mql.addEventListener) {
        mql.addEventListener('change', handleChange)
      } else {
        // Fallback to resize event
        window.addEventListener('resize', handleResize)
      }
      
      // Clean up
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', handleChange)
        } else {
          window.removeEventListener('resize', handleResize)
        }
      }
    }
  }, [])

  // Return false as fallback if undefined (e.g., during SSR)
  return isMobile === undefined ? false : isMobile
}

// Add custom breakpoint hooks for more precise responsive handling
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth
        setIsTablet(width >= 768 && width < 1024)
      }
      
      handleResize()
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  return isTablet === undefined ? false : isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024)
      }
      
      handleResize()
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  return isDesktop === undefined ? false : isDesktop
}
