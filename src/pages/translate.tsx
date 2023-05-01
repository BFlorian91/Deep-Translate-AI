import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { Inter } from 'next/font/google'
import Avatar from '@/components/Avatar'

const inter = Inter({ subsets: ['latin'] })

async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  const apiKey = process.env.API_KEY
  const apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-002/completions'

  const prompt = `Translate the following text to ${targetLanguage}:\n"${text}"`

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    )

    const translation = response.data.choices[0].text.trim()

    return translation.replace(/"/g, '')
  } catch (error) {
    console.error(error)
    return ''
  }
}

export default function Home() {
  const [text, setText] = useState('')
  const [translation, setTranslation] = useState('')
  const [language, setLanguage] = useState('French')

  const handleTranslate = async () => {
    const result = await translateText(text, language)
    setTranslation(result)
  }

  return (
    <>
      <header className='flex space-between mt-8 ml-8'>
        <p className='text-3xl font-Finger text-color-[#5fb8c7]'>
          DEEP-Translate-AI
        </p>
        <div className='fixed right-8'>
          <Avatar />
        </div>
      </header>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-8 ${inter.className}`}
      >
        <Image
          className='fixed right-20 top-20'
          src='/assets/robot.png'
          width={500}
          height={500}
          alt='Robot'
        />
        <div className='z-1 w-full font-mono text-sm'>
          <div className='md:pt-6 md:pl-24 md:pr-24'>
            <select
              className='bg-gray-800 text-white p-2 rounded mb-4'
              data-testid='language-select'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value='English'>English</option>
              <option value='French'>French</option>
              <option value='Spanish'>Spanish</option>
              <option value='German'>German</option>
              <option value='Dutch'>Dutch</option>
              <option value='Italian'>Italian</option>
              <option value='Portuguese'>Portuguese</option>
              <option value='Danish'>Danish</option>
              <option value='Swedish'>Swedish</option>
              <option value='Norwegian'>Norwegian</option>
              <option value='Icelandic'>Icelandic</option>
              <option value='Finnish'>Finnish</option>
              <option value='Estonian'>Estonian</option>
              <option value='Lithuanian'>Lithuanian</option>
              <option value='Latvian'>Latvian</option>
              <option value='Polish'>Polish</option>
              <option value='Czech'>Czech</option>
              <option value='Slovak'>Slovak</option>
              <option value='Hungarian'>Hungarian</option>
              <option value='Romanian'>Romanian</option>
              <option value='Bulgarian'>Bulgarian</option>
              <option value='Slovenian'>Slovenian</option>
              <option value='Croatian'>Croatian</option>
              <option value='Serbian'>Serbian</option>
              <option value='Macedonian'>Macedonian</option>
              <option value='Albanian'>Albanian</option>
              <option value='Greek'>Greek</option>
              <option value='Russian'>Russian</option>
              <option value='Ukrainian'>Ukrainian</option>
              <option value='Belarusian'>Belarusian</option>
              <option value='Turkish'>Turkish</option>
              <option value='Armenian'>Armenian</option>
              <option value='Georgian'>Georgian</option>
              <option value='Hebrew'>Hebrew</option>
              <option value='Arabic'>Arabic</option>
              <option value='Persian'>Persian</option>
              <option value='Urdu'>Urdu</option>
              <option value='Hindi'>Hindi</option>
              <option value='Bengali'>Bengali</option>
              <option value='Punjabi'>Punjabi</option>
              <option value='Gujarati'>Gujarati</option>
              <option value='Marathi'>Marathi</option>
              <option value='Tamil'>Tamil</option>
              <option value='Telugu'>Telugu</option>
              <option value='Kannada'>Kannada</option>
              <option value='Malayalam'>Malayalam</option>
              <option value='Sinhala'>Sinhala</option>
              <option value='Thai'>Thai</option>
              <option value='Lao'>Lao</option>
              <option value='Burmese'>Burmese</option>
              <option value='Khmer'>Khmer</option>
              <option value='Korean'>Korean</option>
              <option value='Japanese'>Japanese</option>
              <option value='Chinese (Simplified)'>Chinese (Simplified)</option>
              <option value='Chinese (Traditional)'>
                Chinese (Traditional)
              </option>
              <option value='Vietnamese'>Vietnamese</option>
              <option value='Tagalog'>Tagalog</option>
              <option value='Indonesian'>Indonesian</option>
              <option value='Malay'>Malay</option>
              {/* Ajouter d'autres langues ici */}
            </select>
            <button
              className='bg-[#5fb8c7] text-black hover:bg-[#242636] hover:text-white font-bold py-2 px-4 rounded mb-4 ml-4'
              data-testid='translate-btn'
              onClick={handleTranslate}
            >
              Translate
            </button>
            <textarea
              className='bg-gray-800 text-white p-4 w-full h-64 rounded mb-4'
              placeholder='Saisissez votre texte ici...'
              data-testid='input-text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <textarea
              className='bg-gray-800 text-white p-4 w-full h-64 rounded'
              placeholder='La traduction apparaîtra ici...'
              data-testid='output-text'
              value={translation}
              readOnly
            ></textarea>
          </div>
        </div>
      </main>
    </>
  )
}
