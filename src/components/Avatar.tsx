import { useState } from 'react'
import { useRouter } from 'next/router'

const Avatar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white focus:outline-none'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
          <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z' />
          <path d='M16 11H8v2h8v-2z' />
        </svg>
      </button>
      {isMenuOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 hover:bg-[#5fb8c7] ring-1 ring-black ring-opacity-5'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu'
          >
            <button
              className='block px-4 py-2 text-sm text-white bg-gray-800 hover:text-black hover:bg-[#5fb8c7] w-full text-left'
              role='menuitem'
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Avatar
