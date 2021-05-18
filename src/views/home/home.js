import { Component } from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../Config';

export default class Home extends Component {
  render = () =>
    <div>
      <Link to={Routes.itemManagement}>Item Management</Link>
    </div>
}