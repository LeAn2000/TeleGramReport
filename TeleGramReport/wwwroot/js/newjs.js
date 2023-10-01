$(document).ready(function () {
    Init.InitControl("#tabstrip")
    Init.InitDropdownlist(Param.Group)
    Init.InitDropdownlist(Param.Location)
    Init.InitGrid("#grid", Init.InitColums.RP)
    Init.InitGrid("#detail", [])
    Init.InitGrid("#log", [])
    Click.reportclick();
});

var Param = {
    Location: {
        id: "#kd-location-chooser",
        text: "FullName",
        value: "Name",
        url: '/Home/dataFiler',
        type: "get",
        datarequest: { Type: 2 },
    },
    Group: {
        id: "#kd-group-chooser",
        text: "GroupName",
        value: "GroupID",
        url: '/Home/dataFiler',
        type: "get",
        datarequest: { Type: 1 },
    }
}

var Init = {
    InitControl: function (id) {
        $(id).kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
        });
    },
    InitColums: {
        RP: [
            {
                field: "GroupName",
                title: "Nhóm",
                template: (dataItem) => {
                    var GroupID = dataItem.GroupID;
                    var date = `'${$('#kd-date-chooser').val()}'`
                    return `<h6 class="click" onClick="Click.detailclick(${GroupID},${date})">${dataItem.GroupName}</h6>`
                }
            },
            {
                field: "Advance",
                title: "Điểm",
                type: "int",
                template: (dataItem) => {
                    var GroupID = dataItem.GroupID;
                    var date = `'${$('#kd-date-chooser').val()}'`
                    return `<h6 class="click" onClick="Click.detailclick(${GroupID},${date})">${kendo.toString(dataItem.Advance, "##,#")}</h6>`
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy}"
            }
        ]
        , BCGroup: [
            {
                field: "GroupName",
                title: "Nhóm",
                template: (dataItem) => {
                    var GroupID = dataItem.GroupID;
                    var date = `'${$('#kd-date-chooser').val()}'`
                    var Type = `'${dataItem.Type}'`;
                    return `<h6 class='click' onClick="Click.logclick(${GroupID},${date},${Type})">${dataItem.GroupName}</h6>`
                }
            }, 
            {
                field: "Type",
                title: "Kiểu chơi",
                template: (dataItem) => {
                    var GroupID = dataItem.GroupID;
                    var date = `'${$('#kd-date-chooser').val()}'`
                    var Type = `'${dataItem.Type}'`;
                    return `<h6 class='click' onClick="Click.logclick(${GroupID},${date},${Type})">${dataItem.Type}</h6>`
                }
            },
            {
                field: "Advance",
                title: "Điểm",
                type: "int",
                template: (dataItem) => {
                    var GroupID = dataItem.GroupID;
                    var date = `'${$('#kd-date-chooser').val()}'`
                    var Type = `'${dataItem.Type}'`;
                    return `<h6 class='click' onClick="Click.logclick(${GroupID},${date},${Type})">${kendo.toString(dataItem.Advance, "##,#")}</h6>`
                },
                footerTemplate: (d) => {
                    if (d.Advance.sum > 0)
                        return `<h6 class='click ok'>${kendo.toString(d.Advance.sum, "##,#")}</h6>`;
                    return `<h6 class='click notok'>${kendo.toString(d.Advance.sum, "##,#")}</h6>`;
                }
            },
            {
                field: "Earn",
                title: "Trúng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`
                }
            },
            {

                field: "Commission",
                title: "Hoa Hồng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.Commission, "##,#")}</h6>`
                }
                , footerTemplate: (d) => {
                    if (d.Commission.sum > 0)
                        return `<h6 class='click ok'>${kendo.toString(d.Commission.sum, "##,#")}</h6>`;
                    return `<h6 class='click notok'>${kendo.toString(d.Commission.sum, "##,#")}</h6>`;
                }
            },
            {
                field: "profit",
                title: "Tổng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.profit, "##,#")}</h6>`
                }
                , footerTemplate: (d) => {
                    if (d.profit.sum > 0)
                        return `<h6 class='click ok'>${kendo.toString(d.profit.sum, "##,#")}</h6>`;
                    return `<h6 class='click notok'>${kendo.toString(d.profit.sum, "##,#")}</h6>`;
                }
            }
        ]
        , BCType: [
            {
                field: "Type",
                title: "Kiểu chơi",
                template: (dataItem) => {
                    return `<h6 class='click'>${dataItem.Type}</h6>`
                }
            },
            {
                field: "Num",
                title: "Số"
            },
            {
                field: "Advance",
                title: "Điểm",
                type: "int",
                template: (dataItem) => {
                  
                    return `<h6 class='click'>${kendo.toString(dataItem.Advance, "##,#")}</h6>`
                }
            },
            {
                field: "Earn",
                title: "Trúng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`
                }
            },
            {
                field: "Commission",
                title: "Hoa Hồng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.Commission, "##,#")}</h6>`
                }
            },
            {
                field: "profit",
                title: "Tổng",
                type: "int",
                template: (dataItem) => {
                    return `<h6 class='click'>${kendo.toString(dataItem.profit, "##,#")}</h6>`
                }
                , footerTemplate: (d) => {
                    if (d.profit.sum > 0)
                        return `<h6 class='click ok'>${kendo.toString(d.profit.sum, "##,#")}</h6>`;
                    return `<h6 class='click notok'>${kendo.toString(d.profit.sum, "##,#")}</h6>`;
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy}"
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
    InitGrid: function (id, columns) {
        $(id).kendoGrid({
            sortable: true,
            resizable: false,
            reorderable: true,
            pageSize: 100,
            pageable: {
                refresh: true,
                buttonCount: 5,
                messages: {
                    itemsPerPage: "dòng / trang",
                    display: "{2}",
                    empty: "Không tìm thấy dữ liệu",
                },
            },

            columns: columns

        });
    },
    InitDropdownlist: function (param) {
        $(param.id).kendoDropDownList({
            dataTextField: param.text,
            dataValueField: param.value,
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            url: param.url,
                            async: false,
                            type: param.type,
                            data: param.datarequest,
                            success: function (result) {
                                options.success(result);
                                $(param.id).data("kendoDropDownList").select(0);
                            }, error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            })
        });
    }
}
var SetDataSource = {
    CallAjx: (parameter) => {
        $.ajax({
            url: parameter.url,
            data: parameter.param,
            async: true,
            type: parameter.type,
            success: function (result) {
                var grid = $(parameter.id).data("kendoGrid");
                var options = grid.options;
                options.dataSource = result;
                $(parameter.id).empty().kendoGrid(options);
                $(parameter.id).data("kendoGrid").refresh();
            },
            error: function (err) {
                console.log(err)
            },
        })
    },
    CallAjxaggregate: (parameter) => {
        var data = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        url: parameter.url,
                        async: true,
                        data: parameter.param,
                        type: parameter.type,
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
                        profit: { type: "number" },
                        HH: { type: "number" },
                        Value: { type: "number" },
                        Earn: { type: "number" },
                        Advance: { type: "number" },
                        Commission: { type: "number" },
                        CreatedDate: { type: "date" }

                    }
                }
            },
            aggregate: [
                { field: "Amount", aggregate: "sum" },
                { field: "Commission", aggregate: "sum" },
                { field: "Advance", aggregate: "sum" },
                { field: "profit", aggregate: "sum" },
                { field: "HH", aggregate: "sum" },
                { field: "Value", aggregate: "sum" },
                { field: "Earn", aggregate: "sum" },
            ],

        })
        var grid = $(parameter.elementgrid).data("kendoGrid");
        var options = grid.options;
        options.columns = parameter.columns
        options.dataSource = data;
        $(parameter.elementgrid).empty().kendoGrid(options);
        $(parameter.elementgrid).data("kendoGrid").refresh();
    },
}
var Click = {
    reportclick: function () {
        $("#kd-report-click").click(function () {
            var RP = {
                url: "/Home/dataBCReport",
                param: { GroupID: $("#kd-group-chooser").data('kendoDropDownList').value(), date: $('#kd-date-chooser').val() },
                type: "post",
                id: "#grid"
            }
            SetDataSource.CallAjx(RP);
        })
    },
    detailclick: function (GroupID, date) {
        var data = { GroupID: GroupID, date: date, Type: 0 }
        params = {
            url: "/Home/dataBCDetail",
            param: data,
            type: "post",
            elementgrid: "#detail",
            columns: Init.InitColums.BCGroup
        }
        SetDataSource.CallAjxaggregate(params)
        Click.changtab(1)

    },
    logclick: function (GroupID, date,type) {
        
        var data = { GroupID: GroupID, date: date, Type: type }
        params = {
            url: "/Home/dataBCDetailType",
            param: data,
            type: "post",
            elementgrid: "#log",
            columns: Init.InitColums.BCType
        }
        SetDataSource.CallAjxaggregate(params)
        Click.changtab(2)
    },
    changtab: function (tab) {
        $("#tabstrip").data("kendoTabStrip").select(tab)
    }

}