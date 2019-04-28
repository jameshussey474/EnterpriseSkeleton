/**
 *
 * AdminSubscribePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import SearchIcon from '@material-ui/icons/Search';

import CustomInput from '@material-ui/core/Input';
import { Paper, Divider } from '@material-ui/core';
import Table from 'components/Table/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectOne, makeSelectQuery } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

const styles = theme => ({
  TableButton: { padding: 8 },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class AdminSubscribePage extends React.PureComponent {
  static propTypes = {
    loadSubscriberRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadSubscriberRequest(this.props.query);
  }

  handleView(id) {
    this.props.push(`/admin/subscribe-manage/view/${id}`);
    this.props.loadOneRequest(id);
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadSubscriberRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const {
      all: { data, page, size, totaldata },
      query,
      one,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ _id, email, is_subscribed, added_at }) => [
      email,
      `${is_subscribed}`,
      moment(added_at).format('MMM Do YY'),

      <React.Fragment>
        <Tooltip id="tooltip-top" title="View subscribe" placement="top">
          <IconButton onClick={() => this.handleView(_id)}>
            <ViewIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      <>
        <PageHeader>Subscribe Manage</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <CustomInput
              name="find_email"
              id="email"
              placeholder="Search Subscriber"
              fullWidth
              value={query.find_email}
              onChange={this.handleQueryChange}
            />
            <Divider style={{ width: 1, height: 40, margin: 4 }} />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />
          <Paper>
            <Table
              tableHead={['Email', 'Is Subscribed', 'Added at', 'Actions']}
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={this.handlePagination}
            />
          </Paper>
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminSubscribePage', reducer });
const withSaga = injectSaga({ key: 'adminSubscribePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminSubscribePage);