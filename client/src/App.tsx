// import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <>
      <div className='h-screen flex flex-col'>
        <main className='ng-neutral-50 dark:bg-neutral-800 transition-colors duration-300 flex-1'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
