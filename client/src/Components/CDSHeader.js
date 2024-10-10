import React, { useContext } from 'react'
import {
  Header,
  SkipToContent,
  HeaderName,
  HeaderGlobalBar,
} from '@carbon/react';
import { AuthContext } from "../App";


const CDSHeader = () => {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Header aria-label="Cambridge | Technical Assessment">
        <SkipToContent />
        <HeaderName href="https://www.cambridge.org" prefix="Cambridge | ">Technical Assessment</HeaderName>

        <HeaderGlobalBar>
          <div className='header-username'>
            {!isLoggedIn ? <></> : <p>username</p>}
          </div>
        </HeaderGlobalBar>

      </Header>
    </>
  )
}

export default CDSHeader