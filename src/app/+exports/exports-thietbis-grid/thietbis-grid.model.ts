export const columns = [{
    field: "maThietBi",
    title: "Mã thiết bị",
    width: '8rem'
}, {
    field: "hangSanXuat",
    title: "Hãng sản xuất",
    width: '12rem'
}, {
    field: "dvQuanLy",
    title: "ĐV Quản lý"
}];

export const schema = {
    model: {
        fields: {
            ProductName: { type: "string" },
            UnitPrice: { type: "number" },
            UnitsInStock: { type: "number" },
            Discontinued: { type: "boolean" }
        }
    }
}