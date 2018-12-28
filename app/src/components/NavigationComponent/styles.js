import { colors } from '../../constants/colors';

export const styles = {
  navbar: {
    height: '5vh',
    backgroundColor: colors.darkGray,
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    zIndex: 999
  },

  navbarIcon: {
    color: colors.lightGray,
  },

  navbarLink: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  navbarText: {
    color: colors.lightGray,
    paddingTop: '.425rem',
    paddingBottom: '.425rem',
  },

  // navbarBrand: {
  //   paddingLeft: '.5625rem',
  //   paddingRight: '.5625rem',
  //   paddingTop: '1.5rem'
  // },

  navbarMenu: {
    height: '100%',
    backgroundColor: colors.darkGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  subNav: {
    left: '4.125rem',
    backgroundColor: '#E7E7E7'
  },

  subNavIcon: {
    verticalAlign: 'middle',
    marginRight: '.3125rem'
  },

  subMenu: {
    backgroundColor: '#D7D7D7',
    boxShadow: 'none',
    border: 'none'
  },

  activeSubMenu: {
    backgroundColor: '#D7D7D7'
  }
};
