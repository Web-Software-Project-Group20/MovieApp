import React from "react"
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import Messages from '../components/groupsComponents/Messages';

function Groups() {
  return (
    <div className="container">
      <Global />
      <div className="header">
        <header>
          <Header />
          {/* Logo */}
          {/* Search bar */}
          {/* User icon */}
        </header>
      </div>
      <div className="content">
      <nav>
          {/* Side navigation */}
          <NavBar />
      </nav>
      <main>
        {/*main content */}
        <h1>Groups</h1>
        <h2>Main content</h2>
        <h2>ylimääräinen</h2>
      </main>
      </div>



    </div>
  )
}

export default Groups;