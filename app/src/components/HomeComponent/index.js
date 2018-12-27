import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { minWidthMediaQuery } from '../../constants/responsive';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: black;

  ${minWidthMediaQuery.laptopL`
    flex-direction: row;
    font-size: 250% !important;
  `}
`;

@withRouter class Home extends Component {
  state = {
    count: 0
  };

  render(){
    const {count} = this.state;
    return (
      <HomeContainer>
        <DropdownSection text="Actions" drop={count >= 1} backgroundImage='https://humandesign.com/wp-content/uploads/2018/11/Ladder-Grab-6.jpg'></DropdownSection>
        <DropdownSection text="Petitions" drop={count >= 2} backgroundImage='https://humandesign.com/wp-content/uploads/2018/04/3.jpg'></DropdownSection>
        <DropdownSection text="Events" drop={count >= 3} backgroundImage='https://humandesign.com/wp-content/uploads/2018/03/BFH_PDP_Hero_01-1.jpg'></DropdownSection>
      </HomeContainer>
    )
  }

  componentDidMount(){
    let count = 1;
    let interval = setInterval(() => {
      if(count <= 3){
        this.setState({
          count
        })
        count++;
      } else{
        clearInterval(interval);
      }
    }, 300);
  }
}

const DropdownSection = props => {
  const componentClasses = ['third-section'];
  if(props.drop === true) componentClasses.push('drop');
  return (
    <div className={componentClasses.join(' ')} style={{backgroundImage: `url(${props.backgroundImage}` || ''}}>
      <div style={{fontSize: '4vw', fontWeight: 900, display: props.drop === true ? 'block' : 'none'}}>{props.text}</div>
    </div>
  );
}

export default Home;