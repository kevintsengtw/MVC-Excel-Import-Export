//================================================================================================
/// <reference path="_references.js" /> Ps.如果你要新增給IntelliSense用的js檔案, 請加在該檔案中
//================================================================================================

(function (app) {
    //===========================================================================================
    var current = app.ZipCode = {};
    //===========================================================================================

    jQuery.extend(app.ZipCode,
    {
        Initialize: function (actionUrls) {
            /// <summary>
            /// 初始化函式
            /// </summary>
            /// <param name="actionUrls"></param>

            jQuery.extend(project.ActionUrls, actionUrls);

            //上傳檔案事件處理
            current.UploadEventHandler();

            //匯出資料
            $('#ButtonExport').click(function () {
                current.ExportDate();
            });
        },

        UploadEventHandler: function () {
            /// <summary>
            /// 上傳匯入資料
            /// </summary>

            $("#UploadForm").ajaxForm({
                iframe: true,
                dataType: "json",
                success: function (result) {
                    $("#UploadForm").resetForm();
                    if (!result.Result) {
                        project.AlertErrorMessage("錯誤", result.Msg);
                    }
                    else {
                        $('#ResultContent').html(result.Msg);
                        project.ShowMessageCallback("訊息", "檔案上傳完成, 點選「確認」後開始進行資料匯入", function () {
                            current.ImportData(result.Msg);
                        });
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#UploadForm").resetForm();
                    project.AlertErrorMessage("錯誤", "檔案上傳錯誤");
                }
            });
        },

        ImportData: function (savedFileName) {
            /// <summary>
            /// 資料匯入
            /// </summary>
            /// <param name="mainID"></param>

            $.ajax({
                type: 'post',
                url: project.ActionUrls.Import,
                data: { savedFileName: savedFileName },
                async: false,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.Msg) {
                        project.AlertErrorMessage("錯誤", data.Msg);
                        $('#UploadModal').modal('hide');
                    }
                    else {
                        project.ShowMessageCallback("訊息", "匯入完成", function () {
                            $('#UploadModal').modal('hide');
                            window.location.reload();
                        });
                    }
                },
                error: function () {
                    project.AlertErrorMessage("錯誤", "資料匯入發生錯誤");
                    $('#UploadModal').modal('hide');
                }
            });
        },

        ExportDate: function () {
            /// <summary>
            /// 資料匯出
            /// </summary>

            $.ajax({
                type: 'post',
                url: project.ActionUrls.HasData,
                dataType: 'json',
                cache: false,
                async: false,
                success: function (data) {
                    if (data.Msg) {
                        current.HasData = data.Msg;
                        if (current.HasData == 'False') {
                            project.AlertErrorMessage("錯誤", "尚未建立任何資料, 無法匯出資料.");
                        }
                        else {
                            window.location = project.ActionUrls.ExportData;
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#UploadForm").resetForm();
                    project.AlertErrorMessage("錯誤", "資料匯出錯誤");
                }
            });
        }

    });
})
(project);