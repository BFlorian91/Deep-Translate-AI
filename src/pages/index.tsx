import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Credentials {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      router.push('/translate')
    } else {
      setError(data.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/translate')
    }
  }, [])

  return (
    <div className='flex flex-col justify-center align-center items-center min-h-screen -mt-8'>
      <h1 className='text-3xl font-Finger text-color-[#5fb8c7] p-4'>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          <span className='text-gray-400 text-xs p-2'>Email:</span>
          <input
            type='text'
            className='bg-gray-800 text-white p-4 w-sm h-4 rounded'
            value={credentials.email}
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
          />
        </label>
        <br />
        <label className='flex flex-col'>
          <span className='text-gray-400 text-xs p-2'>Password:</span>
          <input
            type='password'
            className='bg-gray-800 text-white p-4 w-sm h-4 rounded mb-4'
            value={credentials.password}
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
          />
        </label>
        <br />
        <button
          className='bg-[#5fb8c7] text-black hover:bg-[#242636] hover:text-white font-bold py-2 px-4 rounded mb-4 w-full'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
