import React, { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Form from './form';
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import Column from './Column/Column';
import { urls } from '../../../config/urls';
import {checkTokenExpiry} from '../../../helpers/helpers';

const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;
class Banner extends React.Component {
  state = {
    banners: [],
    columns: [{ id: '1', title: 'Banners' }],
    newbanner: null,
    formData: { name: '', link: '' },
    addBannerButtonDisabled: false,
    authorizationToken: null,
  };

  getAuthorization = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      await this.setState({ authorizationToken: token });

      return true;
    }

    return false;
  };

  disableAddBannerButton = () => {
    this.setState({
      addBannerButtonDisabled: true,
    });
  };

  fileChangedHandler = event => {
    this.setState({ newbanner: event.target.files[0] });
  };

  getBanner = async () => {
    try {
      const response = await axios.get(`${API_ROOT}${urls.BANNER_URL}`, {
        headers: {
          Authorization: 'NO_TOKEN',
        },
      });
      if (response.data.Error) {
        return [];
      }

      const newState = {
        ...this.state,
        banners: response.data.data,
      };

      this.setState(newState);
    } catch (err) {
      checkTokenExpiry(err)
      console.log(err);
    }
  };

  refreshBanner = async event => {
    this.setState({
      banners: [],
    });
    await this.getBanner();
    await this.setState({ addBannerButtonDisabled: false });
  };

  updateBanner = async event => {
    const { banners } = this.state;
    console.log('invoked');
    try {
      const response = await axios.put(
        `${API_ROOT}${urls.BANNER_URL}`,
        banners,
        {
          headers: {
            Authorization: this.state.authorizationToken,
          },
        },
      );
      this.setState({ addBannerButtonDisabled: false });
      if (response.data.Error) {
        return [];
      }
      this.getBanner();
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    this.getBanner();
    this.getAuthorization();
  }

  deleteBanner = async id => {
    const bannerIndex = this.state.banners.findIndex(
      banner => banner._id === id,
    );
    const newArray = [...this.state.banners];
    newArray[bannerIndex] = {
      ...newArray[bannerIndex],
      isDeleted: !newArray[bannerIndex].isDeleted,
    };
    await this.setState({
      banners: newArray,
    });
  };

  onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newBannersArray = Array.from(this.state.banners);

    const sourceItem = newBannersArray.splice(source.index, 1);
    newBannersArray.splice(destination.index, 0, sourceItem[0]);

    const newState = {
      ...this.state,
      banners: newBannersArray,
    };
    this.setState(newState);
  };

  render() {
    if (this.state.authorizationToken === null) {
      return <div>Not logged In. Please login first.</div>;
    }
    console.log('admin banner called');
    return (
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: '60px' }}>
          <TopBar />
        </Grid>
        <Grid item xs={2}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={10}>
          <Container>
            <Card>
              <CardContent>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  {this.state.columns.map(column => (
                    <Column
                      key={column.id}
                      column={column}
                      banners={this.state.banners}
                      update={this.updateBanner}
                      refresh={this.refreshBanner}
                      deleteBanner={this.deleteBanner}
                      disableAddBannerButton={this.disableAddBannerButton}
                    />
                  ))}
                </DragDropContext>
                <Form
                  getBanner={this.getBanner}
                  authorization={this.state.authorizationToken}
                  addBannerButtonDisabled={this.state.addBannerButtonDisabled}
                />
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default Banner;
