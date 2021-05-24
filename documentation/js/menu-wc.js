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
                                            'data-target="#controllers-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' : 'data-target="#xs-controllers-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' :
                                            'id="xs-controllers-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' : 'data-target="#xs-injectables-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' :
                                        'id="xs-injectables-links-module-AuthModule-d4ae15e8f5bffd2c33e93b3343071ee9"' }>
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
                                            'data-target="#controllers-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' : 'data-target="#xs-controllers-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' :
                                            'id="xs-controllers-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' : 'data-target="#xs-injectables-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' :
                                        'id="xs-injectables-links-module-CategoryModule-e3d09a9ec40a48759782144fd66a3c1d"' }>
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
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link">CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' : 'data-target="#xs-controllers-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' :
                                            'id="xs-controllers-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' }>
                                            <li class="link">
                                                <a href="controllers/CommentController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' : 'data-target="#xs-injectables-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' :
                                        'id="xs-injectables-links-module-CommentsModule-d25a292d47937d1637b9e0c8190db79b"' }>
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
                                <a href="modules/ForumModule.html" data-type="entity-link">ForumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' : 'data-target="#xs-controllers-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' :
                                            'id="xs-controllers-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CommentController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TopicsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopicsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' : 'data-target="#xs-injectables-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' :
                                        'id="xs-injectables-links-module-ForumModule-07be8baafe2d523f7456bd927db73d46"' }>
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
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageModule.html" data-type="entity-link">ImageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImageModule-5592ab2b7c43d4ff7a7c2eacfa543c4c"' : 'data-target="#xs-injectables-links-module-ImageModule-5592ab2b7c43d4ff7a7c2eacfa543c4c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImageModule-5592ab2b7c43d4ff7a7c2eacfa543c4c"' :
                                        'id="xs-injectables-links-module-ImageModule-5592ab2b7c43d4ff7a7c2eacfa543c4c"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-655c6edb3f8d5ab749e243c6c44ffe97"' : 'data-target="#xs-injectables-links-module-SharedModule-655c6edb3f8d5ab749e243c6c44ffe97"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-655c6edb3f8d5ab749e243c6c44ffe97"' :
                                        'id="xs-injectables-links-module-SharedModule-655c6edb3f8d5ab749e243c6c44ffe97"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TopicModule.html" data-type="entity-link">TopicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' : 'data-target="#xs-controllers-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' :
                                            'id="xs-controllers-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' }>
                                            <li class="link">
                                                <a href="controllers/TopicsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopicsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' : 'data-target="#xs-injectables-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' :
                                        'id="xs-injectables-links-module-TopicModule-87d5ebde363cd3476d80db60c496c61d"' }>
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
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' : 'data-target="#xs-controllers-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' :
                                            'id="xs-controllers-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' : 'data-target="#xs-injectables-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' :
                                        'id="xs-injectables-links-module-UserModule-df7faf4dd660fe07f1a7e6a04986e980"' }>
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
                                <a href="classes/CommentModel.html" data-type="entity-link">CommentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/createCategories1615383757064.html" data-type="entity-link">createCategories1615383757064</a>
                            </li>
                            <li class="link">
                                <a href="classes/createCategories1621383670928.html" data-type="entity-link">createCategories1621383670928</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDTO.html" data-type="entity-link">CreateCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDTO-1.html" data-type="entity-link">CreateCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDTO.html" data-type="entity-link">CreateCommentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentModel.html" data-type="entity-link">CreateCommentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/createComments1615387777376.html" data-type="entity-link">createComments1615387777376</a>
                            </li>
                            <li class="link">
                                <a href="classes/createComments1621384210972.html" data-type="entity-link">createComments1621384210972</a>
                            </li>
                            <li class="link">
                                <a href="classes/createImage1621383559463.html" data-type="entity-link">createImage1621383559463</a>
                            </li>
                            <li class="link">
                                <a href="classes/createLogSeedings1615471723537.html" data-type="entity-link">createLogSeedings1615471723537</a>
                            </li>
                            <li class="link">
                                <a href="classes/createLogSeedings1621384230860.html" data-type="entity-link">createLogSeedings1621384230860</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateModel.html" data-type="entity-link">CreateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionDTO.html" data-type="entity-link">CreateSessionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTopicDTO.html" data-type="entity-link">CreateTopicDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/createTopics1615387637872.html" data-type="entity-link">createTopics1615387637872</a>
                            </li>
                            <li class="link">
                                <a href="classes/createTopics1621384200326.html" data-type="entity-link">createTopics1621384200326</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link">CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/createUsers1615386570301.html" data-type="entity-link">createUsers1615386570301</a>
                            </li>
                            <li class="link">
                                <a href="classes/createUsers1621383679414.html" data-type="entity-link">createUsers1621383679414</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeletedItemCategoryDTO.html" data-type="entity-link">DeletedItemCategoryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeletedItemTopicDTO.html" data-type="entity-link">DeletedItemTopicDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeletedItemUserDTO.html" data-type="entity-link">DeletedItemUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteModel.html" data-type="entity-link">DeleteModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllModel.html" data-type="entity-link">FindAllModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllModel-1.html" data-type="entity-link">FindAllModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllModel-2.html" data-type="entity-link">FindAllModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneModel.html" data-type="entity-link">FindOneModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image1621217598627.html" data-type="entity-link">Image1621217598627</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogsSeeding.html" data-type="entity-link">LogsSeeding</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewPasswordDto.html" data-type="entity-link">NewPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedCommentsModel.html" data-type="entity-link">PaginatedCommentsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedUsersDTO.html" data-type="entity-link">PaginatedUsersDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Topic.html" data-type="entity-link">Topic</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCommentDTO.html" data-type="entity-link">UpdateCommentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCommentModel.html" data-type="entity-link">UpdateCommentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateModel.html" data-type="entity-link">UpdateModel</a>
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
                                    <a href="injectables/FilesService.html" data-type="entity-link">FilesService</a>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CommentModel.html" data-type="entity-link">CommentModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryPage.html" data-type="entity-link">QueryPage</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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