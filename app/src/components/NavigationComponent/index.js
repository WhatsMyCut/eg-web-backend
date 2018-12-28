import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
// import MaterialIcon from '../shared/Icon';
import {styles} from './styles';
import { AUTH_TOKEN_NAME } from '../../consts';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

// function NavbarBrand({ onClick }) {
//   return (
//     <Menu.Item onClick={onClick} style={{ ...styles.navbarBrand }}>
//       LogoHere
//     </Menu.Item>
//   );
// }

function AccountCircleMenuItem({ name, history }) {
  const trigger = (
    <Item className="item">
        <i>Account</i>
    </Item>
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

const Item = styled.div`
	color: ${colors.lightGray} !important;
	paddingTop: .425rem;
	paddingBottom: .425rem;
`

export default function NavBar(props) {
//   console.log('props inside of navbar function', props);
//   const { onBrandClick } = props;
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
            <Item className="item">
              <i>Actions</i>
            </Item>
          </NavLink>
          <NavLink to="/petitions" style={{ ...styles.navbarLink, ...{ display: props.location.pathname === "/home" ? "none" : "flex" } }}>
		  <Item className="item">
              <i>Petitions</i>
            </Item>
          </NavLink>
          <NavLink to="/users" style={{ ...styles.navbarLink, ...{ display: props.location.pathname === "/home" ? "none" : "flex" } }}>
		  <Item className="item">
              <i>Users</i>
            </Item>
          </NavLink>
          <AccountCircleMenuItem name="Account" history={props.history} style={{ height: "100%" }} />
        </div>
      </Menu>
    </div>;
}
