import React, { Component } from 'react';
import { styles } from './styles';
import {
  Header,
  Segment,
  Dimmer
} from 'semantic-ui-react/dist/commonjs';
import styled from 'styled-components';
// import TBIndicator from '../shared/Indicators/indicator';
// import TBTable from '../shared/table';
// import TBMap from '../shared/map';

import * as _ from 'lodash';

import { minWidthMediaQuery } from '../../constants/responsive';

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;

  & > div {
    padding-bottom: 16px;
  }

  div:last-of-type {
    padding-bottom: 0;
  }

  ${minWidthMediaQuery.laptopL`
    flex-direction: row;
    font-size: 250% !important;
  `}
`;

DashboardContainer.Header = styled(Header)`
  width: 100%;
`;

DashboardContainer.IndicatorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

DashboardContainer.GroupContainer = styled.div`
  width: 100%;
  h3 {
    font-size: 1rem !important;
  }

  table {
    font-size: 14px !important;
  }

  ${minWidthMediaQuery.laptopL`
    width: 50%;
    padding: 16px;

    h3 {
      font-size: 1.65rem !important;
    }

    table {
      font-size: 1.45rem !important;
    }
  `}
`;

DashboardContainer.MapContainer = styled.div`
  width: 100%;
  height: 400px;

  ${minWidthMediaQuery.laptopL`
    width: 50%;
    height: 650px;
  `}

  @media (min-height: 1440px) {
    height: 800px;
  }
`;

export default class Dashboard extends Component {

  createGroups() {
    const { items } = this.props;
    let groups = [];

    // order by group name
    // sum all the values

    let grouped = _.groupBy(items.items, item => {
      if (!item.group || !item.group.group_name) {
        return null;
      } else {
        return item.group.group_name;
      }
    });
    let keys = Object.keys(grouped);
    keys.map(key => {
      let online_count = grouped[key].filter(item => item.status == 'online')
        .length;
      console.log(grouped);
      let some_id = grouped[key][0].group.id;
      let total = grouped[key].length;
      groups.push({
        id: some_id,
        Name: key,
        OnlineDevices: online_count,
        OfflineDevices: total - online_count,
        TotalDevices: total,
        Link: `/dashboard/group/${some_id}`
      });
    });
    return groups;
  }

  render() {
    const { user, items } = this.props;

    console.log('inside of dashboard component', this.props);
    if (user.loading || items.loading) {
      // if user exists passed down from props
      return (
        <Segment loading style={{ height: '100vh', width: '100%' }}>
          <Dimmer active style={{ height: '100vh', width: '100%' }} />
        </Segment>
      );
    }

    const online_count = items.items.filter(item => item.status == 'online')
      .length;
    const offline_count = items.items.length - online_count;
    const total_count = items.items.length;

    const IndicatorData = [
      {
        status: 'ONLINE',
        value: online_count,
        units: 'DEVICES'
      },
      {
        status: 'OFFLINE',
        value: offline_count,
        units: 'DEVICES'
      },
      {
        status: 'TOTAL',
        value: total_count,
        units: 'DEVICES'
      }
    ];

    return (
      <DashboardContainer className="container">
        <DashboardContainer.Header
          as="h5"
          style={{
            color: '#8A8A8A',
            marginBottom: 0,
            fontSize: '0.7rem',
            fontFamily: ['Open Sans', 'sans-serif'],
            fontWeight: '200'
          }}
        >
          Overview
        </DashboardContainer.Header>
        <DashboardContainer.Header
          as="h2"
          style={{
            marginTop: 3,
            fontWeight: '500',
            fontFamily: ['Teko', 'sans-serif']
          }}
        >
          {user.me.company.name}
        </DashboardContainer.Header>
        <DashboardContainer.GroupContainer>
            <Header
              as="h3"
              style={{
                fontFamily: ['Open Sans', 'sans-serif'],
                fontWeight: '700'
              }}
            >
              Groups
            </Header>
            {/* <TBTable
              collapsable={true}
              headings={[
                'Name',
                'Online Devices',
                'Offline Devices',
                'Total Devices'
              ]}
              data={this.createGroups()}
              leftAlignCellIndexes={[0, 1, 2, 3]}
              leftAlignColumns={[0, 1, 2, 3]}
              hyperlinkColumns={[0]}
              hyperlinkFunctions={[{ index: 0, fn: this.goToGroupView }]}
            /> */}
        </DashboardContainer.GroupContainer>
        <DashboardContainer.MapContainer>
            {/* <TBMap items={items.items} /> */}
        </DashboardContainer.MapContainer>
      </DashboardContainer>
    );
  }
}