exports.create = function() {
    var view = Ti.UI.createView({
        width: "33%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#33c8a3"
    });
    
    var treeView = Ti.UI.createView({
        top: 20,
        bottom: 40,
        layout: "vertical",
    });
    view.add(treeView);
    view.myContent = treeView;
    
    var buttonBar = Ti.UI.createView({
        height: 80,
        layout: "horizontal",
        bottom: 0,
    });
    view.add(buttonBar);
    
    var add = Ti.UI.createButton({
        title: "Add",
        top: 10,
        height: 30,
        left: 20,
    });
    add.addEventListener("click", function() {
        var item = app.items[app.selected];
        if (!item.children) {
            item.children = [];
        }
        var id = "_v" + app.nextId++;
        item.children.push({id: id});
        app.selected = id;
        app.update();
        props.update();
    });
    buttonBar.add(add);
    
    var remove = Ti.UI.createButton({
        title: "Remove",
        top: 10,
        height: 30,
        left: 20,
    });
    remove.addEventListener("click", function() {
        var item = app.items[app.selected];
        item.deleted = true;
        app.selected = "root";
        app.update();
        props.update();
        
    });
    buttonBar.add(remove);
    
    var dup = Ti.UI.createButton({
        title: "Duplicate",
        top: 10,
        height: 30,
        left: 20,
    });
    dup.addEventListener("click", function() {
        var item = app.items[app.selected];
        var parent = app.parents[app.selected];
        parent.children.push(dupData(item));
        app.update();
        props.update();
    });
    buttonBar.add(dup);
    
    var exportBtn = Ti.UI.createButton({
        title: "Generate Code",
        top: 10,
        height: 30,
        left: 20,
    });
    exportBtn.addEventListener("click", function() {
        var expertWin = require("export").create();
        expertWin.open();
    });
    buttonBar.add(exportBtn);
    
    var save = Ti.UI.createButton({
        title: "Save",
        top: 10,
        height: 30,
        left: 20,
    });
    save.addEventListener("click", function() {
        Ti.App.Properties.setString("mydata", JSON.stringify(app.data));
    });
    buttonBar.add(save);
    
    var load = Ti.UI.createButton({
        title: "Load",
        top: 10,
        height: 30,
        left: 20,
    });
    load.addEventListener("click", function() {
        var data = JSON.parse(Ti.App.Properties.getString("mydata"));
        if (data) {
            app.data = data;
        }
        app.update();
        props.update();
    });
    buttonBar.add(load);
    
    var clear = Ti.UI.createButton({
        title: "Clear",
        top: 10,
        height: 30,
        left: 20,
    });
    clear.addEventListener("click", function() {
        app.data = {
            type: "view",
            id: "root",
            backgroundColor: "yellow",
            layout: "vertical",
            width: Ti.UI.FILL,
            children: [
                {type: "textField", id: "user", text: "", hintText: "用户名", width: 400, top: 20},
                {type: "textField", id: "password", text: "", hintText: "密码", passwordMask: true, width: 400, top: 20},
                {type: "button", id: "submit", title: "提交", top: 20},
            ],
        };
        app.update();
        props.update();
    });
    buttonBar.add(clear);
    
    return view;
};
