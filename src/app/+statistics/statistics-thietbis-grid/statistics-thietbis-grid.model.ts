export const columns = [{
    field: "maThietBi",
    title: "Mã thiết bị",
    width: 150,
    locked: true,
    lockable: true,
}, {
    field: "loai",
    title: "Loại",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)",
    filterable: { multi: true }
}, {
    field: "maTOPX",
    title: "Mã TopX",
    width: 150,
}, {
    field: "maMaximo",
    title: "Mã Maximo",
    width: 150
}, {
    field: "nhom",
    title: "Nhóm",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)",
    filterable: { multi: true },
    hidden: true
}, {
    field: "chungLoai",
    title: "Chủng loại",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)",
    filterable: { multi: true },
    hidden: true
}, {
    field: "hangSanXuat",
    title: "Hãng sản xuất",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)"
}, {
    field: "modelThietBi",
    title: "Model TB",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)"
}, {
    field: "nhaPhanPhoi",
    title: "Nhà phân phối",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)"
}, {
    field: "namSanXuat",
    title: "Năm sản xuất",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "Năm SX #= value # (Số lượng: #= count#)"
}, {
    field: "namSuDung",
    title: "Năm sử dụng",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "Năm SD #= value # (Số lượng: #= count#)"
}, {
    field: "dvQuanLy",
    title: "ĐV Quản lý",
    width: 250,
    aggregates: ["count"],
    groupHeaderTemplate: "QL #= value # (Thiết bị: #= count#)",
    filterable: { multi: true }
}, {
    field: "dvSoHuu",
    title: "ĐV Sở hữu",
    width: 250,
    aggregates: ["count"],
    groupHeaderTemplate: "SH #= value # (Thiết bị: #= count#)",
    filterable: { multi: true }
}, {
    field: "dvQuanLyId",
    title: "Mã ĐVQL",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "Mã QL #= value # (Thiết bị: #= count#)"
}, {
    field: "dvSoHuuId",
    title: "Mã ĐVSH",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "Mã SH #= value # (Thiết bị: #= count#)"
}, {
    field: "trangThai",
    title: "Trạng thái",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)",
    filterable: { multi: true }
}, {
    field: "khuVuc",
    title: "Khu vực",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)",
    filterable: { multi: true }
}, {
    field: "khuVucId",
    title: "Mã khu vực",
    width: 150,
    aggregates: ["count"],
    groupHeaderTemplate: "#= value # (Số lượng: #= count#)"
}, {
    field: "bienSo",
    title: "Biển số",
    width: 150
}, {
    field: "soDangKy",
    title: "Số đăng ký",
    width: 150
}, {
    field: "soKhung",
    title: "Số khung",
    width: 150
}, {
    field: "soMay",
    title: "Số máy",
    width: 150
}, {
    field: "soDangKiem",
    title: "Số đăng kiểm",
    width: 200
}, {
    field: "capChatLuong",
    title: "Cấp chất lượng",
    width: 200,
    aggregates: ["count"],
    groupHeaderTemplate: "Cấp chất lượng #= value # (Số lượng: #= count#)",
    filterable: { multi: true }
}, {
    field: "$key",
    title: "Mã tham chiếu",
    width: 200
}, {
    field: "moTa",
    title: "Mô tả",
    width: 250,
    hidden: true
}, {
    field: "ghiChu",
    title: "Ghi chú",
    width: 300,
    hidden: true
}];

export const schema = {
    model: {
        fields: {
            maThietBi: { type: "string" },
            maTopX: { type: "string" },
            maMaximo: { type: "string" },

            nhom: { type: "string" },
            chungLoai: { type: "string" },
            loai: { type: "string" },

            hangSanXuat: { type: "string" },
            modelThietBi: { type: "string" },
            nhaPhanPhoi: { type: "string" },
            namSanXuat: { type: "number" },
            namSuDung: { type: "number" },

            dvQuanLy: { type: "string" },
            dvSoHuu: { type: "string" },
            dvQuanLyId: { type: "string" },
            dvSoHuuId: { type: "string" },

            khuVuc: { type: "string" },
            khuVucId: { type: "string" },
            trangThai: { type: "string" },

            bienSo: { type: "string" },
            soDangKy: { type: "string" },
            soKhung: { type: "string" },
            soMay: { type: "string" },
            soDangKiem: { type: "string" },
            capChatLuong: { type: "number" },

            moTa: { type: "string" },
            ghiChu: { type: "string" }
        }
    }
}

export const aggregate = [
    { field: "nhom", aggregate: "count" },
    { field: "chungLoai", aggregate: "count" },
    { field: "loai", aggregate: "count" },

    { field: "hangSanXuat", aggregate: "count" },
    { field: "modelThietBi", aggregate: "count" },
    { field: "nhaPhanPhoi", aggregate: "count" },
    { field: "namSanXuat", aggregate: "count" },
    { field: "namSuDung", aggregate: "count" },

    { field: "dvQuanLy", aggregate: "count" },
    { field: "dvQuanLyId", aggregate: "count" },
    { field: "dvSoHuu", aggregate: "count" },
    { field: "dvSoHuuId", aggregate: "count" },

    { field: "khuVuc", aggregate: "count" },
    { field: "khuVucId", aggregate: "count" },
    { field: "trangThai", aggregate: "count" },

    { field: "capChatLuong", aggregate: "count" }
]

export const sortMultiFilterColumns = ["nhom", "chungLoai", "dvQuanLy", "dvSoHuu", "khuVuc"]