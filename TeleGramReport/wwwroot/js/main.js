$(document).ready(function () {
    Init.InitControl();
    SetDataSource.Load();
    SetDataSource.InserQuota();

    //Số trúng reponse after update
    $('#form').submit(function () {
        $.post($(this).attr('action'), $(this).serialize(), function (json) {
            $('#form').find("input").val('')
            SetDataSource.ShowAlert(json)
            SetDataSource.ChangeTab($("#sotrung"), 1)
            $(".load").trigger('click');
        }, 'json');
        return false;
    });
    $('#today').text(SetDataSource.FormatDate($("#date").data("kendoDatePicker").value()))


});


var flag = 1;
var Init = {
    InitColums: {
        TH:
            [{
                field: "groupName",
                title: "Nhóm",

                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT(${groupid},${date}) '>${dataItem.groupName}</h6>`
                }
            }, {
                field: "value",
                title: "Điểm",
                type: "int",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT(${groupid},${date})'>${kendo.toString(dataItem.value, "##,#")}</h6>`
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy}"
            }],
        CT:
            [{
                field: "GroupName",
                title: "Nhóm",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${dataItem.GroupName}</h6>`
                }
            }, {
                field: "Type",
                title: "Kiểu chơi",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${dataItem.Type}</h6>`
                },
            }, {
                field: "Value",
                title: "Điểm",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${kendo.toString(dataItem.Value, "##,#")}</h6>`
                },
                footerTemplate: "#=sum#"

            }, {
                field: "HH",
                title: "Hoa Hồng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.HH, "##,#")}</h6>`
                },
                footerTemplate: "#=sum#"
            }, {
                field: "Amount",
                title: "Trúng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.Amount, "##,#")}</h6>`
                },
                footerTemplate: "#=sum#"

            }, {
                field: "Earn",
                title: "Thắng/Thua",
                template: (dataItem) => {
                    if (dataItem.Earn > 0)
                        return `<h6 class='ok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                    return `<h6 class='notok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                },
                footerTemplate: "#=sum#"
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy}"
            }],
        CT1:
            [{
                field: "Num",
                title: "Số",
                template: (dataItem) => {
                    ck = dataItem.ck;
                    if (ck != -1)
                        return `<span class='ck'>${dataItem.Num}</span>`
                    return `<span class='noneck'>${dataItem.Num}</span>`
                }

            }, {
                field: "Value",
                title: "Điểm", footerTemplate: "#=sum#"

            }, {
                field: "HH",
                title: "Hoa Hồng", footerTemplate: "#=sum#"
            }, {
                field: "Amount",
                title: "Trúng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.Amount, "##,#")}</h6>`
                }, footerTemplate: "#=sum#"
            }, {
                field: "Earn",
                title: "Thắng/Thua",
                template: (dataItem) => {
                    if (dataItem.Earn > 0)
                        return `<h6 class='ok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                    return `<h6 class='notok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                }, footerTemplate: "#=sum#"
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0:dd-MM-yyyy HH:mm}"
            }
            ],
        Gift: [
            {
                field: "Location",
                title: "Đài",

            },
            {
                field: "Type",
                title: "Kiểu chơi",

            },
            {
                field: "Num",
                title: "Số",

            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy}"


            }],
        Quota: [
            {
                field: "GroupName",
                title: "Nhóm",

            },
            {
                field: "Type",
                title: "Kiểu chơi",

            },
            {
                field: "Quota",
                title: "Hạn mức",

            },
        ],
        HH: [{

            field: "GroupName",
            title: "Nhóm",


        },
        {
            field: "TypeName",
            title: "Tên Kiểu chơi",



        },
        {
            field: "Point",
            title: "Điểm",


        },
        {
            field: "HH",
            title: "Hoa hồng",

            template: (item) => {
                return `<input data-uid=${item.uid} id=${item.uid} onblur="SetDataSource.Change(this)" class='inputgrid' value = ${item.HH} />`
            }

        }]

    },

    InitGrid: function (element, columns) {
        element.kendoGrid({
            sortable: true,
            resizable: false,
            reorderable: true,
            height: "700px",
            pageable: {
                refresh: true,
                buttonCount: 5,
                pageSize: 100,
                messages: {
                    itemsPerPage: "dòng / trang",
                    display: "Hiển thị {0} - {1} / {2}",
                    empty: "Không tìm thấy dữ liệu",
                },
            },

            columns: columns

        });
    },
    InitControl: function () {
        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
        });
        $("#parenttab").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
            select: function (e) {
                var item = e.item.innerText;
                item = item.toLowerCase();
                if (item == "số trúng") {
                    flag = 2;
                    $('#group').css("display", "none")
                    $('#location').css("display", "inline-block")
                    return;
                }
                else if (item == "hạn mức")
                    flag = 3;
                else if (item == "hoa hồng")
                    flag = 4;
                else
                    flag = 1;
                $('#group').css("display", "inline-block" )
                $('#location').css("display", "none")
            }
        });
        $("#sotrung").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
        });
        $("#hanmuc").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
        });

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    content.style.opacity = 0;
                    content.style.height = "0";
                } else {
                    content.style.display = "block";
                    content.style.opacity = 1;
                    content.style.height = "auto";
                    content.style.animation = "fade-in 800ms 1";
                }
            });
        }

        $("#groupid").kendoDropDownList({
            dataTextField: "GroupName",
            dataValueField: "GroupID",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            url: '/Home/Getfilter',
                            async: false,
                            type: 'get',
                            success: function (result) {
                                var AddValue = [{ GroupID: 0, GroupName: "Tất cả" }];
                                if (!result) {
                                    options.success(AddValue);
                                } else {
                                    result.unshift(AddValue[0])
                                    options.success(result);
                                    $("#groupid").data("kendoDropDownList").select(0);

                                }
                            }, error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            })
        });
        $("#groupid1").kendoDropDownList({
            dataTextField: "GroupName",
            dataValueField: "GroupID",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            url: '/Home/Getfilter',
                            async: false,
                            type: 'get',
                            success: function (result) {


                                options.success(result);


                            }, error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            })
        });

        $("#loc").kendoDropDownList({

        });

        var date = new Date();
        $("#date").kendoDatePicker({
            format: "dd/MM/yyyy",
            value: date

        });

        this.InitGrid($("#grid"), this.InitColums.TH);
        Init.InitGrid($("#griddetail"));
        Init.InitGrid($("#griddetail1"));
        Init.InitGrid($("#gridsotrung"), this.InitColums.Gift);
        Init.InitGrid($("#gridhanmuc"), this.InitColums.Quota);
        Init.InitGrid($("#gridhoahong"), this.InitColums.HH);


    }

}
var SetDataSource = {
    CallAjx: (url, param, type, elementgrid, tab) => {
        $.ajax({
            url: url,
            data: param,
            async: true,
            type: type,
            success: function (result) {
                var grid = elementgrid.data("kendoGrid");
                var options = grid.options;
                options.dataSource = result;
                elementgrid.empty().kendoGrid(options);
                elementgrid.data("kendoGrid").refresh();
                $(".load").css("display", "inline");
                $(".spinner-border").css("display", "none");
             
            },
            error: function (err) {
                console.log(err)
                $(".load").css("display", "inline");
                $(".spinner-border").css("display", "none");

            },
        })
    },
    CallAjxaggregate: (url, param, type, elementgrid, tab, columns) => {
        var data = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        url: url,
                        async: true,
                        data: param,
                        type: type,
                        success: function (result) {
                            options.success(result);
                        }, error: function (err) {
                            console.log(err);
                        }
                    });
                }
            },
            schema: {
                model: {
                    fields: {
                        Amount: { type: "number" },
                        HH: { type: "number" },
                        Value: { type: "number" },
                        Earn: { type: "number" },
                        CreatedDate: { type: "date" }

                    }
                }
            },
            aggregate: [
                { field: "Amount", aggregate: "sum" },
                { field: "HH", aggregate: "sum" },
                { field: "Value", aggregate: "sum" },
                { field: "Earn", aggregate: "sum" },
            ],

        })
        var grid = elementgrid.data("kendoGrid");
        var options = grid.options;
        options.columns = columns
        options.dataSource = data;
        elementgrid.empty().kendoGrid(options);
        elementgrid.data("kendoGrid").refresh();
        $(".load").css("display", "inline");
        $(".spinner-border").css("display", "none");
        SetDataSource.ChangeTab($("#tabstrip"), tab)
       

    },
    ChangeTab: (element, tab) => { element.data("kendoTabStrip").select(tab)},
    Load: () => {
        $(".load").click(function () {
            $(".load").css("display", "none");
            $(".spinner-border").css("display", "inline-block");
            if (flag == 1)
                SetDataSource.CallAjx("/Home/GetTH", { gr: $("#groupid").data('kendoDropDownList').value(), Date: SetDataSource.FormatDate($("#date").data("kendoDatePicker").value()) }, "GET", $('#grid'))
            else if (flag == 2)
                SetDataSource.CallAjx("/Home/GiftReport", { location: "", Date: SetDataSource.FormatDate($("#date").data("kendoDatePicker").value()) }, "GET", $('#gridsotrung'))
            else if (flag == 3)
                SetDataSource.CallAjx("/Home/QuotaReport", { gr: $("#groupid").data('kendoDropDownList').value() }, "GET", $('#gridhanmuc'))
            else if (flag == 4) { 
                SetDataSource.SetComlumsName($("#gridhoahong"), Init.InitColums.HH, 1)
                SetDataSource.CallAjx("/Home/HHReport", { gr: $("#groupid").data('kendoDropDownList').value() }, "GET", $('#gridhoahong'))
            }
               
        });
    },

    LoadDetail: {
        CT: (groupID, date) => { SetDataSource.CallAjxaggregate("/Home/GetCT", { gr: groupID, Date: date }, "GET", $('#griddetail'), 1, Init.InitColums.CT) },
        CT1: (groupID, type, date) => { SetDataSource.CallAjxaggregate("/Home/GetCT1", { gr: groupID, type: type, date: date }, "GET", $('#griddetail1'), 2, Init.InitColums.CT1) }
    },
    FormatDate: (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },
    ShowAlert: (json) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        })
        Toast.fire({
            title: json,
        })
        $('.swal2-container').css("z-index", '999999');
    },

    SetComlumsName: (elementgrid, columns, type) => {
        var grid = elementgrid.data("kendoGrid");
        var options = grid.options;
        options.columns = columns
        options.dataSource = [];

        if (type == 1)
            options.toolbar = kendo.template($("#headersave").html());
        else
            options.toolbar = "";
        elementgrid.empty().kendoGrid(options);
        elementgrid.data("kendoGrid").refresh();
    },
    GetValueUpdateQuota: () => {
        var d8 = $('#d8').val();
        var d9 = $('#d9').val();
        var lo = $('#lo').val();
        var x2 = $('#x2').val();
        var x3 = $('#x3').val();
        var x4 = $('#x4').val();

        var grID = $("#groupid").data('kendoDropDownList').value();

        var data = [
            { "GroupID": grID, "Type": "d8", "Quota": d8 },
            { "GroupID": grID, "Type": "d9", "Quota": d9 },
            { "GroupID": grID, "Type": "lo", "Quota": lo },
            { "GroupID": grID, "Type": "x2", "Quota": x2 },
            { "GroupID": grID, "Type": "x3", "Quota": x3 },
            { "GroupID": grID, "Type": "x4", "Quota": x4 }
        ];
        return data
    },
    InserQuota: () => {
        $('#update').click(function () {
            var json = SetDataSource.GetValueUpdateQuota();
            $.ajax({
                url: "/Home/InsertQuota",
                data: { json: JSON.stringify(json), sp: "telegram..InsertQuota" },
                async: true,
                type: "POST",
                success: function (result) {
                    SetDataSource.ShowAlert(result);
                    $('.quota').find("input").val('')
                    SetDataSource.ChangeTab($("#hanmuc"),1);
                    $(".load").trigger('click');
                },
                error: function (err) {
                    SetDataSource.ShowAlert(err);

                }
            });

        })
    },
    Change: (e) => {
        var id = e.getAttribute("id");
        var a = e.getAttribute("data-uid");
        var grid = $('#gridhoahong').data("kendoGrid")
        var data = grid.dataSource.data();
        var item = data.find(x => x.uid == a)
        item.HH = $('#' + id).val();
        item.dirty = true;
        grid.refresh()
    },
    Update: () => {
        var grID = $("#groupid").data('kendoDropDownList').value();
        var grid = $('#gridhoahong').data("kendoGrid")
        var data = grid.dataSource.data();
        var item = data.filter(x => x.dirty == true).map(x => ({ Location: "", Type: x.Type, HH: x.HH }));
        var data = JSON.stringify(item);
        $.ajax({
            url: "/Home/AddSalaryByGroup",
            data: { gr: grID, json: data },
            async: true,
            type: "POST",
            success: function (result) {
                SetDataSource.ShowAlert(result);
                $(".load").trigger('click');
            },
            error: function (err) {
                SetDataSource.ShowAlert(err);

            }
        });


    }

}

