import React from 'react'
import App from './components/App'
import './stylesheet/Page.css'

export default (props) => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='title'> Hypnos </div>
      </div>

      <div className='application'>
        <App />
      </div>

      <div className='footer'>

      </div>
    </div>
  )
}
