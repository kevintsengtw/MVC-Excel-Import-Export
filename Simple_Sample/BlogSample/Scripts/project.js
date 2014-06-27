//================================================================================================
/// <reference path="_references.js" /> Ps.如果你要新增給IntelliSense用的js檔案, 請加在該檔案中
//================================================================================================

(function (window) {
    //===========================================================================================
    if (typeof (jQuery) === 'undefined') { alert('jQuery Library NotFound.'); return; }

    var project = window.project =
    {
        AppName: 'project',
        ActionUrls: {}
    };

    //===========================================================================================

    jQuery.extend(project, {
        Initialize: function () {
            /// <summary>
            /// 初始化函式
            /// </summary>

        },

        ShowMessage: function (title, message) {
            /// <summary>
            /// 使用 Bootbox.js 的訊息顯示
            /// </summary>
            /// <param name="title"></param>
            /// <param name="message"></param>

            bootbox.dialog({
                title: title,
                message: message,
                buttons: {
                    main: {
                        label: "確認",
                        className: "btn-primary"
                    }
                }
            });
        },

        ShowMessageCallback: function (title, message, handlers) {
            /// <summary>
            /// 使用 Bootbox.js 的訊息顯示, 可加入 callback
            /// </summary>
            /// <param name="title"></param>
            /// <param name="message"></param>
            /// <param name="handlers"></param>

            bootbox.dialog({
                title: title,
                message: message,
                buttons: {
                    main: {
                        label: "確認",
                        className: "btn-primary",
                        callback: handlers
                    }
                }
            });
        },

        AlertErrorMessage: function (title, message) {
            /// <summary>
            /// 使用 Bootbox.js 的錯誤訊息顯示
            /// </summary>
            /// <param name="title"></param>
            /// <param name="message"></param>

            bootbox.dialog({
                title: title,
                message: message,
                buttons: {
                    danger: {
                        label: "確認",
                        className: "btn-danger"
                    }
                }
            });
        },

        AlertErrorMessageCallback: function (title, message, handlers) {
            /// <summary>
            /// 使用 Bootbox.js 的錯誤訊息顯示, 可加入 callback
            /// </summary>
            /// <param name="title"></param>
            /// <param name="message"></param>
            /// <param name="handlers"></param>

            bootbox.dialog({
                title: title,
                message: message,
                buttons: {
                    danger: {
                        label: "確認",
                        className: "btn-danger",
                        callback: handlers
                    }
                }
            });
        }
    });


    $(document).ready(function () {
        //全域設定

    });
})
(window);

(function (app) {
    //===========================================================================================
    var current = app.Plugins = {};
    //===========================================================================================

    jQuery.extend(app.Plugins,
    {
        Initialize: function (actionUrls) {
            /// <summary>
            /// 初始化函式
            /// </summary>
            /// <param name="actionUrls"></param>

            jQuery.extend(project.ActionUrls, actionUrls);
        }
    });
})
(project);