import React from "react";
import {Component} from "react";
import {AppHeader} from "../components/AppHeader";
import {AppFooter} from "../components/AppFooter";
import classNames from "classnames";
import {AppRightPanel} from "../components/AppRightPanel";
import {AppMenu} from "../components/AppMenu";
import {ScrollPanel} from "primereact/scrollpanel";
import {AppInlineProfile} from "../components/AppInlineProfile";

interface Props {
    menuClick?:boolean
    horizontal?:boolean
}

interface State {
    layoutMode: string,
    profileMode: string,
    overlayMenuActive: boolean,
    staticMenuDesktopInactive: boolean,
    staticMenuMobileActive: boolean,
    rotateMenuButton: boolean,
    topbarMenuActive: boolean,
    activeTopbarItem: any,
    darkMenu: boolean,
    rightPanelActive: boolean,
    menuActive: boolean
}

export class App extends Component<Props,State> {
    private menu: any;
    private topbarItemClick:boolean=false;
    private rightPanelClick:boolean=false;
    private menuClick:boolean=false;
    private layoutMenuScroller: any;
    private layoutContainer:any;


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            layoutMode: 'static',
            profileMode: 'inline',
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            rotateMenuButton: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkMenu: false,
            rightPanelActive: false,
            menuActive: false
        };
        this.createMenu();
    }

    onMenuClick = (event:any) => {
        this.menuClick = true;

        if(!this.isHorizontal()) {
            setTimeout(() => {this.layoutMenuScroller.moveBar(); }, 500);
        }
    };

    onMenuButtonClick = (event:any) => {
        this.menuClick = true;
        this.setState(({
            rotateMenuButton: !this.state.rotateMenuButton,
            topbarMenuActive: false
        }));

        if(this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else {
            if(this.isDesktop())
                this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
            else
                this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
        }

        event.preventDefault();
    };

    onTopbarMenuButtonClick = (event:any) => {
        this.topbarItemClick = true;
        this.setState({topbarMenuActive: !this.state.topbarMenuActive});
        this.hideOverlayMenu();
        event.preventDefault();
    };

    onTopbarItemClick = (event:any) => {
        this.topbarItemClick = true;

        if(this.state.activeTopbarItem === event.item)
            this.setState({activeTopbarItem: null});
        else
            this.setState({activeTopbarItem: event.item});

        event.originalEvent.preventDefault();
    };

    onMenuItemClick = (event:any) => {
        if(!event.item.items) {
            this.hideOverlayMenu();
        }
        if(!event.item.items && (this.isHorizontal() || this.isSlim())) {
            this.setState({
                menuActive: false
            })
        }
    };

    onRootMenuItemClick = (event:any) => {
        this.setState({
            menuActive: !this.state.menuActive
        });

        event.originalEvent.preventDefault();
    };

    onRightPanelButtonClick = (event:any) => {
        this.rightPanelClick = true;
        this.setState({
            rightPanelActive: !this.state.rightPanelActive
        });
        event.preventDefault();
    };

    onRightPanelClick = (event:any) => {
        this.rightPanelClick = true;
    };

    onDocumentClick = (event:any) => {
        if(!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if(!this.menuClick) {
            if(this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            this.hideOverlayMenu();
        }

        if(!this.rightPanelClick) {
            this.setState({
                rightPanelActive: false
            })
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    };

    hideOverlayMenu = () => {
        this.setState({
            rotateMenuButton: false,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    };

    isTablet = () => {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    };

    isDesktop = () => window.innerWidth > 1024;

    isMobile = () => window.innerWidth <= 640;

    isOverlay = () => this.state.layoutMode === 'overlay';

    isHorizontal = () => this.state.layoutMode === 'horizontal';

    isSlim = () => this.state.layoutMode === 'slim';

    changeTheme = (theme:any) => {
        this.changeStyleSheetUrl('layout-css', theme, 'layout');
        this.changeStyleSheetUrl('theme-css', theme, 'theme');
    };

    changeStyleSheetUrl = (id:any, value:any, prefix:any) => {
        let element = document.getElementById(id);
        if (element) {
            let urlTokens = element.getAttribute('href')!.split('/');
            urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
            let newURL = urlTokens.join('/');
            element.setAttribute('href', newURL);
        }
    };

    createMenu = () => {
        this.menu = [
            {label: 'Dashboard', icon: 'dashboard', command:()=>{ window.location.href = "#/"}},
            {
                label: 'Themes', icon: 'palette', badge: '6',
                items: [
                    {label: 'Indigo - Pink', icon: 'brush', command: (event:any) => {this.changeTheme('indigo')}},
                    {label: 'Brown - Green', icon: 'brush', command: (event:any) => {this.changeTheme('brown')}},
                    {label: 'Blue - Amber', icon: 'brush', command: (event:any) => {this.changeTheme('blue')}},
                    {label: 'Blue Grey - Green', icon: 'brush', command: (event:any) => {this.changeTheme('blue-grey')}},
                    {label: 'Dark - Blue', icon: 'brush', command: (event:any) => {this.changeTheme('dark-blue')}},
                    {label: 'Dark - Green', icon: 'brush', command: (event:any) => {this.changeTheme('dark-green')}},
                    {label: 'Green - Yellow', icon: 'brush', command: (event:any) => {this.changeTheme('green')}},
                    {label: 'Purple - Cyan', icon: 'brush', command: (event:any) => {this.changeTheme('purple-cyan')}},
                    {label: 'Purple - Amber', icon: 'brush', command: (event:any) => {this.changeTheme('purple-amber')}},
                    {label: 'Teal - Lime', icon: 'brush', command: (event:any) => {this.changeTheme('teal')}},
                    {label: 'Cyan - Amber', icon: 'brush', command: (event:any) => {this.changeTheme('cyan')}},
                    {label: 'Grey - Deep Orange', icon: 'brush', command: (event:any) => {this.changeTheme('grey')}}
                ]
            },
            {
                label: 'Customization', icon: 'settings_application',
                items: [
                    {label: 'Static Menu', icon: 'menu',  command: () => this.setState({layoutMode: 'static'} )},
                    {label: 'Overlay Menu', icon: 'exit_to_app',  command: () => this.setState({layoutMode: 'overlay'}) },
                    {label: 'Slim Menu', icon: 'more_vert',  command: () => this.setState({layoutMode: 'slim'}) },
                    {label: 'Horizontal Menu', icon: 'border_horizontal',  command: () => this.setState({layoutMode: 'horizontal'}) },
                    {label: 'Light Menu', icon: 'label_outline',  command: () => this.setState({darkMenu: false}) },
                    {label: 'Dark Menu', icon: 'label',  command: () => this.setState({darkMenu: true}) },
                    {label: 'Inline Profile', icon: 'contacts',  command: () => this.setState({profileMode: 'inline'}) },
                    {label: 'Top Profile', icon: 'person_pin',  command: () => this.setState({profileMode: 'top'}) },
                ]
            },
            {
                label: 'Components', icon: 'list', badge: '2', badgeStyleClass: 'teal-badge',
                items: [
                    {label: 'Sample Page', icon: 'desktop_mac', command:()=>{ window.location.href = "#/sample"}},
                    {label: 'Forms', icon: 'input', command:()=>{ window.location.href = "#/forms"}},
                    {label: 'Data', icon: 'grid_on', command:()=>{ window.location.href = "#/data"}},
                    {label: 'Panels', icon: 'content_paste', command:()=>{ window.location.href = "#/panels"}},
                    {label: 'Overlays', icon: 'content_copy', command:()=>{ window.location.href = "#/overlays"}},
                    {label: 'Menus', icon: 'menu', command:()=>{ window.location.href = "#/menus"}},
                    {label: 'Messages', icon: 'message', command:()=>{ window.location.href = "#/messages"}},
                    {label: 'Charts', icon: 'insert_chart', command:()=>{ window.location.href = "#/charts"}},
                    {label: 'Misc', icon: 'toys', command:()=>{ window.location.href  = "#/misc"}}
                ]
            },
            {
                label: 'Template Pages', icon: 'get_app',
                items: [
                    {label: 'Empty Page', icon: 'hourglass_empty', command:()=>{ window.location.href  = "#/empty"}},
                    {label: 'Landing Page', icon: 'flight_land', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login Page', icon: 'verified_user', url: 'assets/pages/login.html', target: '_blank'},
                    {label: 'Error Page', icon: 'error', url: 'assets/pages/error.html', target: '_blank'},
                    {label: '404 Page', icon: 'error_outline', url: 'assets/pages/404.html', target: '_blank'},
                    {label: 'Access Denied Page', icon: 'security', url: 'assets/pages/access.html', target: '_blank'}
                ]
            },
            {
                label: 'Menu Hierarchy', icon: 'menu',
                items: [
                    {
                        label: 'Submenu 1', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'subject',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'subject'},
                                    {label: 'Submenu 1.1.2', icon: 'subject'},
                                    {label: 'Submenu 1.1.3', icon: 'subject'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'subject',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'subject'},
                                    {label: 'Submenu 1.2.2', icon: 'subject'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'subject',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'subject'},
                                    {label: 'Submenu 2.1.2', icon: 'subject'},
                                    {label: 'Submenu 2.1.3', icon: 'subject'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'subject',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'subject'},
                                    {label: 'Submenu 2.2.2', icon: 'subject'}
                                ]
                            },
                        ]
                    }
                ]
            },
            {label: 'Utils', icon: 'build',  command:()=>{ window.location.href  = "#/utils"}},
            {label: 'Documentation', icon: 'find_in_page',  command:()=>{ window.location.href  = "#/documentation"}},
            {label: 'Buy Now', icon: 'credit_card', command: () => { window.location.href  = "https://www.primefaces.org/store"}},
        ];
    };

    render() {
        const layoutContainerClassName = classNames('layout-container', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });
        const menuClassName = classNames('layout-menu', {'layout-menu-dark': this.state.darkMenu});

        return (
            <div className="layout-wrapper" onClick={this.onDocumentClick}>
                <div ref={(el) => this.layoutContainer = el} className={layoutContainerClassName}>
                    <AppHeader profileMode={this.state.profileMode} horizontal={this.props.horizontal}
                               topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                               onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                               onTopbarItemClick={this.onTopbarItemClick} onRightPanelButtonClick={this.onRightPanelButtonClick} />

                    <div className={menuClassName} onClick={this.onMenuClick}>
                        <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
                            <div className="menu-scroll-content">
                                {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
                                <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                         layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                            </div>
                        </ScrollPanel>
                    </div>

                    <div className="layout-main">

                        {/* <AppBreadCrumbWithRouter />      */}

                        <div className="layout-content">

                            {/* <Route path="/" exact component={Dashboard} />
                            <Route path="/forms" component={FormsDemo} />
                            <Route path="/sample" component={SampleDemo} />
                            <Route path="/data" component={DataDemo} />
                            <Route path="/panels" component={PanelsDemo} />
                            <Route path="/overlays" component={OverlaysDemo} />
                            <Route path="/menus" component={MenusDemo} />
                            <Route path="/messages" component={MessagesDemo} />
                            <Route path="/charts" component={ChartsDemo} />
                            <Route path="/misc" component={MiscDemo} />
                            <Route path="/empty" component={EmptyPage} />
                            <Route path="/utils" component={UtilsDemo} />
                            <Route path="/documentation" component={Documentation} /> */}


                        </div>
                    </div>

                    <AppRightPanel expanded={this.state.rightPanelActive} onContentClick={this.onRightPanelClick} />

                    <div className="layout-mask"></div>
                </div>
            </div>
        );
    }
}
