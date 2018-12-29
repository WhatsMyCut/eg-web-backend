import React, { Component } from "react";
import styled from "styled-components";
import { Header, Container, Button } from "semantic-ui-react/dist/commonjs";
import MaterialIcon from "../shared/Icon";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddBtnContainer = styled.div`
  margin: 0;
  display: flex;
  flexdirection: row;
  justifycontent: flex-end;
  alignitems: center;
`;

export default class HeaderWithAddBtn extends Component {
    render() {
      const { title, entityType, openModal, style } = this.props;
      return (
          <HeaderContainer style={style}>
            <Header as="h1" style={{ margin: 0 }}>
              {this.getTitleText(title)}
            </Header>
            <AddBtnContainer>
              <Button
                primary
                onClick={openModal}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "16px"
                }}
              >
                <MaterialIcon name="add" />
                New {entityType}
              </Button>
            </AddBtnContainer>
          </HeaderContainer>
      );
    }
    getTitleText = (title) => {
      const {clickable, onClick} = this.props;
      if(clickable){
        return (
          <a
            style={{ cursor: 'pointer' }}
            onClick={onClick}
          >
          {title}
        </a>
        )
      } else{
        return title;
      }
    }
  }