import React, { Component } from 'react';

export default class StickySidebar extends Component {
  constructor() {
    super();
    this.state = {
      lastWindowTop: 0,
      top: false,
      bottom: false,
      style: {},
    };
  }

  componentDidMount() {
    this.setState({lastWindowTop: window.scrollTop});
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    const windowTop     = e.pageY,
          windowHeight  = window.innerHeight,
          sidebarHeight = this.refs.node.scrollHeight,
          bodyHeight    = document.body.scrollHeight,
          sidebarOffsetTop = this.refs.node.getBoundingClientRect().top + window.pageYOffset;

    if(sidebarHeight > windowHeight) {
			if(windowTop > this.state.lastWindowTop) {
				if(this.state.top) {
          this.setState({
            top: false,
            style: {
              top: sidebarOffsetTop + 'px',
            },
          });
				} else if(!this.state.bottom && windowTop + windowHeight > sidebarHeight + sidebarOffsetTop && sidebarHeight < bodyHeight ) {
          this.setState({
            bottom: true,
            style: {
              position: 'fixed',
              bottom: '0',
            },
          });
				}
			} else if(windowTop < this.state.lastWindowTop) {
				if(this.state.bottom) {
          this.setState({
            bottom: false,
            style: {
              top: sidebarOffsetTop + 'px',
            },
          });
				} else if (!this.state.top && windowTop < sidebarOffsetTop ) {
          this.setState({
            top: true,
            style: {
              position: 'fixed',
            },
          });
				}
			} else {
				this.setState({
          top: false,
          bottom: false,
          style: {
            top: sidebarOffsetTop + 'px',
          },
        });
			}
		} else if(!this.state.top) {
			this.setState({
        top: true,
        style: {
          position: 'fixed',
        },
      });
		}

		this.setState({lastWindowTop: windowTop});
  }

  render() {
    return (
      <nav style={this.state.style} ref="node" role="navigation" id="sidebar">
        {this.props.children}
      </nav>
    );
  }
}
