import React,{useState} from 'react'
import {IoMdBookmark, IoMdCall, IoMdChatboxes, IoMdClipboard, IoMdClose, IoMdHammer, IoMdHome, IoMdImage, IoMdMenu, IoMdPerson} from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Sidenav.css'

const Sidenav = () => {

    const [active,setActive] = useState(false)

    const activateNav = () => {
        setActive(!active)
    } 

  return (

    <div className='sidenav fixed'>
    <div className={active ? 'header' : 'header-mobile'}>

               <div className='menu-icon' onClick={activateNav}>

                    {!active ? <IoMdMenu className='menu'/> : <IoMdClose className='menu'/>}

               </div>

        <nav>
            <ul className={active ? 'ul-item' : 'ul-item oicon'}>

              
                <li>
                    <IoMdImage className='icon'/> 
                    <Link to='/auto' onClick={activateNav}>Auto Trading</Link>                                       
                </li>

                <li>
                    <IoMdBookmark className='icon'/>
                    <Link to='/manual' onClick={activateNav} >Manual Trading</Link>
                </li>


                <li>
                    <IoMdPerson className='icon'/>
                    <Link to='/' onClick={activateNav} >Testimonials</Link>
                </li>


                <li>
                    <IoMdHome className='icon'/>
                    <Link to='/' onClick={activateNav} >Partners</Link>
                </li>


                <li>
                    <IoMdChatboxes className='icon'/>
                    <Link to='/' onClick={activateNav} >About</Link>
                </li>


                <li>
                    <IoMdHammer className='icon'/>
                    <Link to='/' onClick={activateNav} >Tutorials</Link>
                </li>



                <li>
                    <IoMdCall className='icon'/>
                    <Link to='/' onClick={activateNav} >Contact</Link>
                </li>


                <li>
                    <IoMdClipboard className='icon'/>
                    <Link to='/' onClick={activateNav} >FAQ</Link>
                </li>

            </ul>
        </nav>

    </div>
    </div>
  )
}

export default Sidenav