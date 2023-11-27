import React from 'react';
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';

function Home() {
  return (
    <div className="container">
      <Global />
      <div className="header">
        <header>
          {/* Logo */}
          {/* Search bar */}
          {/* User icon */}
          <Header />
        </header>
      </div>
      <div className="content">
        <nav>
          {/* Side navigation */}
          <NavBar />
        </nav>
        <main>
          {/* Main content */}
          <h1>Home</h1>
          <h2>Main content</h2>
        </main>
        <div className="side-section">
          {/* Article content */}
          <h1>Article</h1>
          <h2>Text</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;

