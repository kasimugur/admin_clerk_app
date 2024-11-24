import React from 'react'

interface AuthLoyoutProps{
   children:React.ReactNode
}

export default function AuthLoyout({children}:AuthLoyoutProps) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      {children}
    </div>
  )
}
