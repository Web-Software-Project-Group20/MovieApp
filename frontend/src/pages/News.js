import React from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';

function News() {
  return (
    <div className="container">
      <Global />
      <header>
        {/* Logo */}
        {/* Search bar */}
        {/* User icon */}
        <Header />
      </header>
      <div className="content">
        <nav>
          {/* Side navigation */}
          <NavBar />
        </nav>
        <main>
          {/* Main content */}
          <h1>News</h1>
          <h2>Hear ye, hear ye!</h2>
        </main>
        <div className="side-section">
          {/* Article content */}
          <h1>Side Article</h1>
          <p>Adds for example</p>
        </div>
      </div>
    </div>
  );
}

export default News