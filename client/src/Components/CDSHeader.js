import React from 'react'
import {
  Header,
  SkipToContent,
  HeaderName,
  HeaderGlobalBar,
} from '@carbon/react';
// import { Notification } from '@carbon/icons-react';


const CDSHeader = () => {

  return (
    <>
      <Header aria-label="Cambridge | Technical Assessment">
        <SkipToContent />
        <HeaderName href="#" prefix="Cambridge | ">Technical Assessment</HeaderName>

        <HeaderGlobalBar>
          
          <div className='header-username'>
            <p>username</p>
          </div>
        </HeaderGlobalBar>


      </Header>
    </>
  )
}

export default CDSHeader