import React, { useState, useEffect } from "react";
import { Nav, Button, ButtonGroup } from "react-bootstrap";
import Sidebar1 from "./Sidebar1";
import Sidebar3 from "./Sidebar3";
import "./Sidebar.css";
import OverlayScrollbars from 'overlayscrollbars';
import '../../assets/css/style.css';
{/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css'> */}


// import "../../assets/css/core.css"
// import 'bootstrap/dist/css/bootstrap.min.css';



// import '../../assets/css/theme-default.css';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.body;
    const openLeftSidebar = 'open-left-sidebar';
    const sidebarBtn = document.getElementById('sidebar_btn');
    const leftSidebar = document.getElementById('left_sidebar');
    const anchors = document.querySelectorAll('.sidebar-elements li a');
    const wrapper = document.querySelector('.be-wrapper');
    const menuSpeed = 200;

    // Only for debugging (stop page navigating away)
    const debugLinks = document.querySelectorAll(
      '.be-wrapper > .navbar a, .be-wrapper > .be-left-sidebar a'
    );
    Array.from(debugLinks).forEach(link =>
      link.setAttribute('href', '#' + Math.random())
    );

    // Add necessary classes for sidebar animation
    body.classList.add('be-animate', 'be-offcanvas-menu', openLeftSidebar);

    // Scrollbar initialization
    const scrollbar = OverlayScrollbars(
      document.querySelector('.left-sidebar-scroll'),
      {
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 100
        }
      }
    );

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    sidebarBtn.addEventListener('click', toggleSidebar);

    const slideUp = ($subMenu, event) => {
      const target = event.currentTarget;
      const parent = $subMenu.parentNode;
      const item = parent.querySelector('li.open');
      const isRoot = !target.closest(leftSidebar);

      if (!window.matchMedia('(max-width: 767px)').matches) {
        if (wrapper.classList.contains('be-collapsible-sidebar-collapsed')) {
          parent.classList.remove('open');
          $subMenu.classList.remove('visible');
          item.classList.remove('open');
        } else {
          $subMenu.slideUp({
            duration: menuSpeed,
            complete: function () {
              parent.classList.remove('open');
              this.removeAttribute('style');
              item.classList.remove('open');
            }
          });
        }
      } else if (
        wrapper.classList.contains('be-collapsible-sidebar-collapsed') &&
        (target.closest('.sidebar-elements') || isRoot)
      ) {
        parent.classList.remove('open');
        $subMenu.classList.remove('visible');
        item.classList.remove('open');
      } else {
        $subMenu.slideUp({
          duration: menuSpeed,
          complete: function () {
            parent.classList.remove('open');
            this.removeAttribute('style');
            item.classList.remove('open');
          }
        });
      }
    };

    const slideDown = ($el, event) => {
      const parent = $el.parentNode;
      const next = $el.nextElementSibling;
      const hasElements = $el.closest('.sidebar-elements');
      const siblingsOpen = parent.parentNode.querySelectorAll('.open');

      if (siblingsOpen) {
        Array.from(siblingsOpen).forEach(sibling =>
          slideUp(sibling.querySelector('ul'), event)
        );
      }

      if (
        !window.matchMedia('(max-width: 767px)').matches &&
        wrapper.classList.contains('be-collapsible-sidebar-collapsed') &&
        hasElements
      ) {
        parent.classList.add('open');
        next.classList.add('visible');
      } else {
        next.slideDown({
          duration: menuSpeed,
          complete: function () {
            parent.classList.add('open');
            this.removeAttribute('style');
          }
        });
      }
    };

    Array.from(anchors).forEach(anchor =>
      anchor.addEventListener('click', event => {
        const $el = event.currentTarget;
        const $li = $el.parentNode;
        const $subMenu = $el.nextElementSibling;

        if ($li.classList.contains('open')) {
          slideUp($subMenu, event);
        } else {
          slideDown($el, event);
        }

        if ($el.nextElementSibling.tagName === 'UL') {
          event.stopPropagation();
          event.preventDefault();
        }
      })
    );

    const handleClickOutside = event => {
       const { currentTarget } = event;
    const parent = currentTarget.parentNode;
    const isOpen = parent.classList.contains('open');

    if (isOpen) {
      parent.classList.remove('open');
    } else {
      parent.classList.add('open');
    }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      sidebarBtn.removeEventListener('click', toggleSidebar);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="be-wrapper be-offcanvas-menu be-fixed-sidebar">
        <nav className="navbar navbar-expand fixed-top be-top-header">
          <div className="container-fluid">
            <div className="be-navbar-header">
              <a className="nav-link be-toggle-left-sidebar" href="#" id="sidebar_btn">
                <span className="icon zmdi zmdi-menu"></span>
              </a>
              <a className="navbar-brand" href="#"></a>
            </div>
          </div>
        </nav>
        <div className="be-left-sidebar" id="left_sidebar">
          <div className="left-sidebar-wrapper">
            <div className="left-sidebar-spacer">
              <div className="left-sidebar-scroll">
                <div className="left-sidebar-content">
                  <ul className="sidebar-elements">
                    <li className="active"><a href="#"><i className="icon zmdi zmdi-home"></i><span>Home</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-fire"></i><span>Trending</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-hourglass-alt"></i><span>History</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-label"></i><span>Purchases</span></a></li>
                    <li className="divider">More Features</li>
                    <li className="parent"><a href="#"><i className="icon zmdi zmdi-comments"></i><span>Forum</span></a>
                      <ul className="sub-menu">
                        <li><a href="#">CodePen</a></li>
                        <li><a href="#">Stack Overflow</a></li>
                        <li><a href="#">Google</a></li>
                      </ul>
                    </li>
                    <li className="parent"><a href="#"><i className="icon zmdi zmdi-apps"></i><span>Apps</span></a>
                      <ul className="sub-menu">
                        <li><a href="#">YouTube</a></li>
                        <li><a href="#">Search</a></li>
                        <li><a href="#">Email</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Diary</a></li>
                        <li><a href="#">More</a></li>
                      </ul>
                    </li>
                    <li><a href="#"><i className="icon zmdi zmdi-notifications"></i><span>Notifications</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-translate"></i><span>Translate</span></a></li>
                    <li className="divider">Settings</li>
                    <li id="debug_only_menuopen" className="parent">
                      <a href="#"><i className="icon zmdi zmdi-settings"></i><span>Settings</span></a>
                      <ul className="sub-menu">
                        <li className="parent"><a href="#">Account</a>
                          <ul className="sub-menu">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li className="parent"><a href="#">Brand</a>
                              <ul className="sub-menu">
                                <li><a href="#">Add New</a></li>
                                <li><a href="#">Deactivate</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li><a href="#">Language</a></li>
                        <li><a href="#">Data Usage</a></li>
                      </ul>
                    </li>
                    <li><a href="#"><i className="icon zmdi zmdi-flag"></i><span>Report History</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-help"></i><span>Help</span></a></li>
                    <li><a href="#"><i className="icon zmdi zmdi-comment-alert"></i><span>Send Feedback</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="be-content">
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
