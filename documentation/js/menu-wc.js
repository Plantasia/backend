'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">plantasia-forum documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' : 'data-target="#xs-controllers-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' :
                                            'id="xs-controllers-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' : 'data-target="#xs-injectables-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' :
                                        'id="xs-injectables-links-module-AuthModule-b821df4dfce2a94e4ca5054fa5e28449"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link">CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' : 'data-target="#xs-controllers-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' :
                                            'id="xs-controllers-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' : 'data-target="#xs-injectables-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' :
                                        'id="xs-injectables-links-module-CategoryModule-5e95551990ab7ea7abfbe54462321fe6"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link">CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' : 'data-target="#xs-controllers-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' :
                                            'id="xs-controllers-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' : 'data-target="#xs-injectables-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' :
                                        'id="xs-injectables-links-module-CategoryModule-d8fc52da7bd8bd515e152d7c7647a816-1"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link">CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' : 'data-target="#xs-controllers-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' :
                                            'id="xs-controllers-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' }>
                                            <li class="link">
                                                <a href="controllers/CommentController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' : 'data-target="#xs-injectables-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' :
                                        'id="xs-injectables-links-module-CommentsModule-193030e4d1e7500bc94c7ea51e834805"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TopicsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TopicModule.html" data-type="entity-link">TopicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' : 'data-target="#xs-controllers-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' :
                                            'id="xs-controllers-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' }>
                                            <li class="link">
                                                <a href="controllers/TopicsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopicsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' : 'data-target="#xs-injectables-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' :
                                        'id="xs-injectables-links-module-TopicModule-6ed55174c3da87d77d24b6fa3e72729f"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TopicsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' : 'data-target="#xs-controllers-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' :
                                            'id="xs-controllers-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' : 'data-target="#xs-injectables-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' :
                                        'id="xs-injectables-links-module-UserModule-0cc046c067506b5acdeaac74db4d428c"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TopicsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/createCategory1605697433254.html" data-type="entity-link">createCategory1605697433254</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDTO.html" data-type="entity-link">CreateCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/createComment1605894914570.html" data-type="entity-link">createComment1605894914570</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDTO.html" data-type="entity-link">CreateCommentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTopicDTO.html" data-type="entity-link">CreateTopicDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/createTopics1605702754591.html" data-type="entity-link">createTopics1605702754591</a>
                            </li>
                            <li class="link">
                                <a href="classes/createUser1605879828481.html" data-type="entity-link">createUser1605879828481</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link">CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Topic.html" data-type="entity-link">Topic</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});