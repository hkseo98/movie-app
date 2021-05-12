import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail" style={{  marginTop:"10px",fontSize: "20px", fontWeight: "600"}}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favorite" style={{  marginTop:"10px",fontSize: "20px", fontWeight: "600"}}>
        <a href="/favorite">favorite</a>
      </Menu.Item>
      
    </Menu>
  )
}

export default LeftMenu