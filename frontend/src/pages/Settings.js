import React from 'react'
import Header from '../components/global/Header'
import Settingsnav from '../components/settingsComponents/Settingsnav'
import General from '../components/settingsComponents/General'
import User from '../components/settingsComponents/User'
import Groups from '../components/settingsComponents/Groups'

function Settings() {
  return (
    <>
      <Header />
      <h1>Settings</h1>
      <Settingsnav />
      <General />
      <User />
      <Groups />
    </>
  )
}

export default Settings