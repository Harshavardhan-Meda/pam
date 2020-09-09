import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Shell } from '@carbon/ibm-security';
import './menu.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
  /**
   * TODO: Remove closeMenu and NavLinks from title properties after @carbon/ibm-security refactor Shell component
   * Currently Shell component doesn't support custom elements as links.
   * It couse some problems because we are using NavLink from react-router-dom to navigate on our app.
   * When we used current shell implementation -
   * using href we end it up refreshing the whole page after clicking on a menu item
   * Workaround for that is passing NavLink component to title properties. But there are some problems with that:
   *  - it creates wrong HTML structure <a> tag inside <a> tag
   *  - after clicking on menu item the menu does't close automatically - that is the purpose of closeMenu function
   *  - it breaks style - that is the purpose of complex selectors in menu.scss
   *  - there is no indicator on which tab user is - blue strap
   *  https://pages.github.ibm.com/security/carbon-addons-security/branch/v2/?path=/story/patterns-shell--default
   */

  static closeMenu() {
    document.querySelector('.security--toolbar__button--active.security--button--icon--active').click();
  }

  static getDerivedStateFromProps(props) {
    const { displayDemoBanner, isBannerVisible } = props;
    const securityShell = document.querySelector('.security--shell');
    if (securityShell) {
      if (isBannerVisible || displayDemoBanner) {
        securityShell.classList.add('security--shell--banner-visible');
      } else {
        securityShell.classList.remove('security--shell--banner-visible');
      }
    }
  }

  render() {
    const { firstName, lastName, email, customerContactId } = this.props;
    return (
      <Shell
        header={{
          labels: {
            brand: {
              company: 'IBM',
              product: 'Security Services'
            },
            notifications: {},
            profile: {
              account: 'Account',
              button: 'Toggle profile',
              edit_profile: 'Edit profile',
              sign_out: 'Sign out'
            }
          },
          links: {
            sign_out: '/api/logout',
            edit_profile: `https://portal.sec.ibm.com/mss/user/profile.mss?userId=${customerContactId}`
          }
        }}
        profile={{
          image_url: null,
          name: {
            first_name: firstName,
            surname: lastName
          },
          email
        }}
        toolbar={{
          labels: {
            menu: {
              button: 'Toggle menu',
              tooltip: 'Menu'
            },
            settings: {
              button: 'Toggle settings',
              tooltip: 'Settings'
            },
            support: {
              button: 'Toggle support',
              tooltip: 'Support'
            }
          },
          menu: [
            {
              navigation: [
                {
                  title: (
                    <NavLink
                      to="/new-ticket?type=request"
                      className="security--nav__list__item__link navLinks"
                      onClick={Menu.closeMenu}
                    >
                      Create New Request
                    </NavLink>
                  )
                }
              ],
              title: 'First tab'
            },
            {
              navigation: [
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/logs.mss',
                      title: 'Log Search'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/log/downloads.mss',
                      title: 'Log Downloads'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/device/list.mss',
                      title: 'Managed Devices'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/asset/manager.mss',
                      title: 'Other Assets'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/policy/analyzer.mss',
                      title: 'Analyze Device Policies'
                    }
                  ],
                  title: 'Logs and Devices'
                },
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/report/idsEventTrafficReport.mss',
                      title: 'IDS/IPS Event Counts by Event Names'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/report/serviceOverviewReport.mss',
                      title: 'Service Overview'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/report/firewallServiceOverviewReport.mss',
                      title: 'Firewall Service Overview'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/reports/list.mss',
                      title: 'Browse All'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/reports/viewSchedules.mss',
                      title: 'Schedule Reports'
                    }
                  ],
                  title: 'Reports'
                },
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/ai/aiAlertMonitor/list.mss',
                      title: 'Alert Monitor'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/xps/rulePolicy/customerDefault.mss',
                      title: 'Alert Rules'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/activeAnalyzer/eventNameView.mss',
                      title: 'Active Analyzer'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/suspicioushost/list.mss',
                      title: 'Suspicious Hosts'
                    }
                  ],
                  title: 'Alerts and Analytics'
                },
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/resilient/launch.mss',
                      title: 'IBM Resilent'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/qradar/open.mss',
                      title: 'Qradar'
                    }
                  ],
                  title: 'Security Information and Event Management'
                },
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/qualys/launch.mss',
                      title: 'Qualys'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/advancedMalware/malwareManagement/launch.mss',
                      title: 'Endpoints Malware Protection (Cisco Security)'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/advancedMalware/malwareResearch/launch.mss',
                      title: 'Endpoints Thread Response only (Cisco)'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/carbonblack/launch.mss',
                      title: 'Carbon Black Enterprise Server'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/vms/pci.mss',
                      title: 'Payment Card Industry (Rapid7 PCI)'
                    }
                  ],
                  title: 'Vulnerability Management Service and Malware Protection'
                },
                {
                  children: [
                    {
                      href: 'https://portal.sec.ibm.com/mss/'
                        + 'adaptiveSecurityHybridCloud.mss?service=cloudAccessSecurityBroker',
                      title: 'Cloud Access Security Broker (McAfee)'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/adaptiveSecurityHybridCloud.mss?service=microSegmentation',
                      title: 'Micro Segmentation (illumio)'
                    },
                    {
                      href: 'https://portal.sec.ibm.com/mss/emailWebSecurity/messageLabs.mss',
                      title: 'Email and Web Security (Symantec.cloud)'
                    }
                  ],
                  title: 'Cloud Services'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/mediaLibrary.mss',
                  title: 'Share Documents'
                }
              ]
            }
          ],
          settings: [
            {
              navigation: [
                {
                  href: `https://portal.sec.ibm.com/mss/user/profile.mss?userId=${customerContactId}`,
                  title: 'Your Profile'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/settings/users.mss',
                  title: 'Manage Portal Users'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/settings/contactList.mss',
                  title: 'Manage Support Roles'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/settings/index.mss',
                  title: 'Browse All'
                }
              ],
              title: 'Settings'
            }
          ],
          support: [
            {
              navigation: [
                {
                  href: 'https://portal.sec.ibm.com/mss/knowledgebase/list.mss',
                  title: 'Knowledgebase'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/resources/eLearningCourses.mss',
                  title: 'eLearning, Videos, Documentation'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/resources/bestPractices.mss',
                  title: 'Best Practices'
                }
              ],
              title: 'Help'
            },
            {
              navigation: [
                {
                  href: 'https://portal.sec.ibm.com/mss/ulaPackage/list.mss',
                  title: 'Download ULA Software'
                },
                {
                  href: 'https://portal.sec.ibm.com/mss/vms/software/list.mss',
                  title: 'Download VMS Software'
                }
              ],
              title: ''
            },
            {
              navigation: [
                {
                  href: 'https://portal.sec.ibm.com/mss/contact.mss',
                  title: 'Find SOC Contact'
                }
              ],
              title: 'Contact'
            }
          ]
        }}
      />
    );
  }
}

Menu.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerContactId: PropTypes.string.isRequired,
  displayDemoBanner: PropTypes.bool.isRequired,
  isBannerVisible: PropTypes.bool.isRequired
};

export const mapStateToProps = (state) => ({
  firstName: state.profile.profile.firstName,
  lastName: state.profile.profile.lastName,
  email: state.profile.profile.email,
  customerContactId: state.profile.profile.customerContactId,
  isBannerVisible: state.preferences.isBannerVisible
});

export default connect(mapStateToProps)(Menu);
