/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import TrashIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const Path = props => {
  const {
    each,
    pathIndex,
    handleAccessTypeChange,
    handleAdminRoutesChange,
    handleRemoveAdminRoute,
    handleAddAdminRoute,
    handleServerRoutesMethodChange,
    handleServerRoutesRouteChange,
    handleRemoveServerRoute,
    handleAddServerRoute,
    handleRemovePath,
  } = props;
  return (
    <Card>
      <TextField
        className="mt-0"
        label="Access Type"
        id={`${each._id}-access-type`}
        formControlProps={{
          fullWidth: false,
        }}
        inputProps={{
          value: each.access_type,
          onChange: handleAccessTypeChange(each._id),
        }}
      />
      <ul className="customUL">
        {(each.admin_routes || []).map((eachAdminRoute, index) => (
          <li key={`${each._id}-${pathIndex}-each-admin-route-${index}`}>
            <TextField
              label="Client Route"
              id={`${each._id}-each-admin-route-access-type-${index}`}
              formControlProps={{
                fullWidth: false,
              }}
              inputProps={{
                value: eachAdminRoute,
                onChange: handleAdminRoutesChange(each._id, index),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Delete client route"
                      onClick={handleRemoveAdminRoute(each._id, index)}
                    >
                      <TrashIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </li>
        ))}
      </ul>
      <Button
        size="sm"
        aria-label="Add Client Route"
        onClick={handleAddAdminRoute(each._id)}
      >
        Add Client Route
      </Button>
      <ul className="customUL">
        {(each.server_routes || []).map((eachServerRoute, index) => (
          <li
            key={`${each._id}-${pathIndex}-${
              eachServerRoute._id
            }-each-server-route-${index}`}
          >
            <FormControl className="selectbox methodInput">
              <InputLabel
                htmlFor={`${each._id}-${
                  eachServerRoute._id
                }-each-server-route-${index}-method`}
              >
                Method
              </InputLabel>

              <Select
                placeholder="Method"
                value={eachServerRoute.method}
                onChange={handleServerRoutesMethodChange(each._id, index)}
                inputProps={{
                  name: 'Method',
                  id: `${each._id}-${
                    eachServerRoute._id
                  }-each-server-route-${index}-method`,
                }}
              >
                {methods.map(eachMethod => (
                  <MenuItem
                    key={`${eachMethod._id}-${pathIndex}-${
                      eachServerRoute._id
                    }-each-server-route-method-${eachMethod}`}
                    value={eachMethod}
                  >
                    {eachMethod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Server Route"
              id={`${each._id}-${
                eachServerRoute._id
              }-each-admin-server-route-route-access-type-${index}`}
              formControlProps={{
                fullWidth: false,
              }}
              inputProps={{
                value: eachServerRoute.route,
                onChange: handleServerRoutesRouteChange(each._id, index),
              }}
            />
            <IconButton
              aria-label="Delete Server Route"
              onClick={handleRemoveServerRoute(each._id, index)}
            >
              <TrashIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        size="sm"
        aria-label="Add Server Route"
        onClick={handleAddServerRoute(pathIndex)}
      >
        Add Server Route
      </Button>
      <IconButton
        className="btn-circle"
        color="secondary"
        aria-label="Delete"
        onClick={handleRemovePath(pathIndex)}
      >
        <TrashIcon size="small" />
      </IconButton>
    </Card>
  );
};

Path.propTypes = {
  each: PropTypes.object.isRequired,
  pathIndex: PropTypes.number.isRequired,
  handleAccessTypeChange: PropTypes.func.isRequired,
  handleAdminRoutesChange: PropTypes.func.isRequired,
  handleRemoveAdminRoute: PropTypes.func.isRequired,
  handleAddAdminRoute: PropTypes.func.isRequired,
  handleServerRoutesMethodChange: PropTypes.func.isRequired,
  handleServerRoutesRouteChange: PropTypes.func.isRequired,
  handleRemoveServerRoute: PropTypes.func.isRequired,
  handleAddServerRoute: PropTypes.func.isRequired,
  handleRemovePath: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Path);