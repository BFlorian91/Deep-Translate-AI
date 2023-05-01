import React from 'react'

interface FooterProps {
  author: string
}

const Footer: React.FC<FooterProps> = ({ author }) => {
  return (
    <footer className='flex items-center justify-center h-16 text-xs text-gray-400 fixed bottom-0 right-0 left-0'>
      <p>&copy; 2023 {author}</p>
    </footer>
  )
}

export default Footer
