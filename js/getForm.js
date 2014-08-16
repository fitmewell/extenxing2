/**
 * Created by fitmewell on 14-8-16.
 */
var forms = document.getElementsByTagName("form");
var alertItem = "";
var formList = {};
for(var i =0;i <forms.length;i++){
    var selectForm = document.forms[i];
//    alertItem += "Form:"+selectForm.name + "\n";
    var list = selectForm.elements;
    var intentFieldList = {}
    for(var j =0;j<list.length;j++){
        if(list[j].name&&list[j].value) {
            intentFieldList[list[j].name] = list[j].value;
        }
    }
    formList[selectForm.name] = intentFieldList;
}
//alert(formList);
//chrome.tabs.getSelected(null, function(tab) {
//    chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
//        console.log(response.farewell);
//    });
//});

chrome.extension.sendRequest({greeting: formList}, function(response) {
//   alert(response.farewell);
});