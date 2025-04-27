import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/header'
import HomeHeader from './homeHeader'


const HomeLayout = () => {
  return (
    <div className='flex items-center flex-col justify-center gap-3 bg-primary w-full'>
        {/* Header */}
        <HomeHeader/>
        <div className='w-full'>
          <Outlet/>
        </div>
       

    </div>
  )
}

export default HomeLayout
