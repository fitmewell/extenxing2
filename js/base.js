/**
 * Created by fitmewell on 14-8-16.
 */
$(document).ready(function(){
    $('#showFormBtn').click(function () {
        showForm();
    });
});
showForm();
var outputValue = "";
function showForm(){
//    alert("LoveYouBenBen");
    chrome.tabs.executeScript(null,{file:"js/getForm.js"});
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            setForm(request.greeting);
            if (request.greeting == "hello")
                sendResponse({farewell: "goodbye"});
            else
                sendResponse({farewell:"success"}); // snub them.
        });
}

function setForm(formlist){
    var contentTd = document.getElementById("contentTd");
    var index = 0;
    var fieldList = [];
    for(var forms in formlist){
        var index_ = index;
        fieldList[index_] = "";
        var intentDiv = document.createElement("div");
        var form = document.createElement("table");
        var formTitle = document.createElement("caption");
        intentDiv.className = "tableDiv";
        form.className = "showOutField";
        formTitle.innerHTML = index+":"+forms;
        formTitle.onclick = function(){
            hiddenOtherChild(this);
        };
        formTitle.ondblclick = function(){
//            alert(fieldList[index_]);
            prompt("copy this", fieldList[index_]);
        }
        form.appendChild(formTitle);
        for(var inputName in formlist[forms]){
            var fieldTr = document.createElement("tr");
            var nameTd = document.createElement("td");
            var valueTd = document.createElement("td");
            var nameInput = document.createElement("input");
            var valueInput = document.createElement("input");
//            nameInput.value = inputName;
            valueInput.value = formlist[forms][inputName];
            nameTd.innerHTML = inputName;
            fieldList[index_] += "addHttpFormField(\"" + inputName + "\",\"" + formlist[forms][inputName] + "\");\n";
//            valueTd.innerHTML = formlist[forms][inputName];
//            nameTd.appendChild(nameInput);
            valueTd.appendChild(valueInput);
            fieldTr.appendChild(nameTd);
            fieldTr.appendChild(valueTd);
            form.appendChild(fieldTr);
        }
        intentDiv.appendChild(form);
        contentTd.appendChild(intentDiv);
        index++;
    }
}

function hiddenOtherChild(a) {
    var m = a.parentNode;
//    var n = a.parentNode;
//    var bc =  m.children[1].style.display == "none"?"#F7FDFA":"#26ADE4";
//    var fc =  m.children[1].style.display == "none"?"black":"white";
//    for(var i =0;i< n.children.length;i++){
//        n.children[i].style.background = bc;
//        n.children[i].style.color = fc;
//    }
//    alert(m.nodeName)
    var flg = ( m.children[1].style.display == "none" ) ? "table-row" : "none";
    for (var i = 1; i < m.children.length; i++) {
        m.children[i].style.display = flg;
    }
}