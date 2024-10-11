import React, { useContext } from 'react'
import {
  Header,
  SkipToContent,
  HeaderName,
  HeaderGlobalBar,
} from '@carbon/react';
import { AuthContext } from "../App";


const CDSHeader = () => {

  const { isLoggedIn, username, logout } = useContext(AuthContext)

  return (
    <>
      <Header aria-label="Cambridge | Technical Assessment">
        <SkipToContent />
        <HeaderName href="https://www.cambridge.org" prefix="Cambridge | ">Technical Assessment</HeaderName>

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