import React from 'react'
import { Image, Button, Typography, Space, Badge } from "antd";
function DashFooter() {
  return (
    <div className='AppFooter'>
      <Typography.Link href='tel:+1176048078'>+1176048078</Typography.Link>
      <Typography.Link href='https://www.google.com'target={"_blank"}>Privacy Policy</Typography.Link>
      <Typography.Link href='https://www.google.com' target={"_blank"}>Terms of Use</Typography.Link>
    </div>
  )
}

export default DashFooter