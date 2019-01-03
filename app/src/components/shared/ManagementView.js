import React, { Component } from "react";
import styled from "styled-components";
import { Header, Container, Button } from "semantic-ui-react/dist/commonjs";
import MaterialIcon from "../shared/Icon";
import EGModal from "../shared/Modals/Modal";
import HeaderWithAddBtn from '../shared/HeaderWithAddBtn';

const PageContainer = styled.div`
  width: 100vw;
  height: auto;
  min-height: 95vh;
  max-height: 95vh;
  margin-top: 5vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  overflow-y: auto;
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
  overflow-y: auto;
`;

export default class ManagementView extends Component {
  render() {
    const { children, title, entityType, openModal } = this.props;
    return (
      <PageContainer>
        <HeaderWithAddBtn title={title} entityType={entityType} openModal={openModal} />
          <hr />
        <ContentContainer>
          {children}
        </ContentContainer>
      </PageContainer>
    );
  }
}
