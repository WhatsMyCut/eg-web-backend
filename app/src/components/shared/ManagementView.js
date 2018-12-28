import React, { Component } from "react";
import styled from "styled-components";
import { Header, Container, Button } from "semantic-ui-react/dist/commonjs";
import MaterialIcon from "../shared/Icon";
import EGModal from "../shared/Modals/Modal";
import PetitionsModal from '../shared/Modals/PetitionsModal';

const PageContainer = styled.div`
  width: 100vw;
  height: 95vh;
  margin-top: 5vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
`;

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

const ContentContainer = styled.div`
  flex: 1;
`;

export default class ManagementView extends Component {
  render() {
    const { children, title, entityType, openModal } = this.props;
    return (
      <PageContainer>
        <HeaderContainer>
          <Header as="h1" style={{ margin: 0 }}>
            {title}
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
        <ContentContainer>
          <hr />
          {children}
        </ContentContainer>
      </PageContainer>
    );
  }
}
