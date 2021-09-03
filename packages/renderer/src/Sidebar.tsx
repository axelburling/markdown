import React from 'react'
import './Sidebar.css'


const Sidebar: React.FC = props => {
    return (
        <header className="main-head">
      <nav className="head-nav">
        <ul className="menu">
          <li>
            <a href="#">
              <svg className="person">
               
              </svg><span>About</span></a>
          </li>
          <li>
            <a href="#">
              <svg className="video-player">
              </svg><span>Work</span></a>
          </li>
          <li>
            <a href="#">
              <svg className="speech-bubble">
              </svg><span>Blog</span></a>
          </li>
          <li>
            <a href="#">
              <svg className="paper-airplane">
              </svg><span>Contact</span></a>
          </li>
        </ul>
      </nav>
</header> 
    )
}

export default Sidebar
