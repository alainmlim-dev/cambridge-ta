import React, { useContext } from 'react'
import {
  Header,
  SkipToContent,
  HeaderName,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenuItem
} from '@carbon/react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';


const CDSHeader = () => {

  let navigate = useNavigate()
  const { isLoggedIn, username, logout } = useContext(AuthContext)

  return (
    <>
      <Header aria-label="Cambridge | Technical Assessment">
        <SkipToContent />
        <HeaderName href="https://www.cambridge.org" prefix="Cambridge | ">Technical Assessment</HeaderName>

        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem onClick={() => navigate('/')}>Home</HeaderMenuItem>
            <HeaderMenuItem onClick={() => navigate('/articles/add')}>New article</HeaderMenuItem>
        </HeaderNavigation>

        <HeaderGlobalBar>
          
          <div className='header-username'>
            {!isLoggedIn ? <></> : <p>Hi, <strong>{username}</strong>! | <span style={{cursor: "pointer"}} onClick={() => logout()}>Logout</span></p>}
          </div>
        </HeaderGlobalBar>

      </Header>
    </>
  )
}

export default CDSHeader