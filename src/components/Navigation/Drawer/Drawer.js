import React, {Component} from 'react';
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {

  renderLinks (availableLinks) {
    console.log('availableLinks', availableLinks)

    return availableLinks.map((link, index) => {
      return (<li
      key={index}
      >
        <NavLink to={link.route}
                 exact={link.exact}
                 onClick={this.props.onToggle}
                 activeClassName={classes.active}
        >
          { link.title }
        </NavLink>
      </li>);
    })
  }

  render() {

    let availableLinks = [
        {title: 'About us', route: 'about', exact: true },
    ];

    if(this.props.isAuthorized) {
      availableLinks = availableLinks.concat([
        {title: 'Home', route: '/', exact: true },
         {title: 'Quiz Creator', route: '/quiz-creator', exact: false },
        {title: 'Quiz', route: 'quiz', exact: false },
        {title: 'Cars', route: 'cars', exact: false },
        {title: 'Counter', route: 'counter', exact: false },
        {title: 'LogOut', route: '/logout', exact: false },
      ]);

    } else {
      availableLinks = availableLinks.concat([
        {title: 'Auth', route: '/auth', exact: false },
      ])
    }

    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {
              this.renderLinks(availableLinks)
            }
          </ul>
        </nav>

        { this.props.isOpen ? <Backdrop onClick={this.props.onToggle} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;