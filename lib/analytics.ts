// Google Analytics tracking ID
export const GA_TRACKING_ID = 'G-96RFEFSHND'

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Log specific events
interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
