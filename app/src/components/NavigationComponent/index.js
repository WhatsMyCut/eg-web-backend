import React, { Component } from 'react';
import { Image, Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import MaterialIcon from '../shared/Icon';
import {styles} from './styles';
import { AUTH_TOKEN_NAME } from '../../consts';

function NavbarBrand({ onClick }) {
  return (
    <Menu.Item onClick={onClick} style={{ ...styles.navbarBrand }}>
      LogoHere
    </Menu.Item>
  );
}

function NavbarMenuIcon({ name, ...rest }) {
  return (
    <Menu.Item {...rest}>
      <MaterialIcon name={name} style={styles.navbarIcon} />
    </Menu.Item>
  );
}

function AccountCircleMenuItem({ name, history }) {
  const trigger = (
    <Menu.Item>
      <MaterialIcon name={name} style={{ ...styles.navbarIcon }} />
    </Menu.Item>
  );

  const options = [
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      onClick: () => {
        localStorage.removeItem(AUTH_TOKEN_NAME);
        history.push('/login');
      }
    },
    {
      key: 'profile_info',
      text: 'Profile',
      icon: 'user',
      onClick: () => {
        history.push('/settings/profile');
      }
    }
  ];

  return (
    <Dropdown
      trigger={trigger}
      options={options}
      pointing="right"
      icon={null}
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
    />
  );
}

export default function NavBar(props) {
//   console.log('props inside of navbar function', props);
  const { onBrandClick } = props;
  return <div style={styles.navbar}>
      <Menu borderless fluid style={styles.navbarMenu}>
        {/* <NavbarBrand onClick={onBrandClick} /> */}
        <NavLink to="/home" style={styles.navbarLink}>
          <div className="item" style={styles.navbarText}>
            LogoHere
          </div>
        </NavLink>
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <NavLink to="/actions" style={{ ...styles.navbarLink, ...{ display: props.location.pathname === "/home" ? "none" : "flex" } }}>
            <div className="item" style={styles.navbarText}>
              <i>Actions</i>
            </div>
          </NavLink>
          <NavLink to="/petitions" style={{ ...styles.navbarLink, ...{ display: props.location.pathname === "/home" ? "none" : "flex" } }}>
            <div className="item" style={styles.navbarText}>
              <i>Petitions</i>
            </div>
          </NavLink>
          <NavLink to="/game-items" style={{ ...styles.navbarLink, ...{ display: props.location.pathname === "/home" ? "none" : "flex" } }}>
            <div className="item" style={styles.navbarText}>
              <i>Game Items</i>
            </div>
          </NavLink>
          <AccountCircleMenuItem name="Account" history={props.history} style={{ height: "100%" }} />
        </div>
      </Menu>
    </div>;
}
