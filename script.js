let form = document.querySelector("form");
console.log(document.querySelector("fieldset").childNodes);
let imgButton = document.getElementById("imgLink");
form.addEventListener("submit", createItem);
imgButton.addEventListener("click", imgLinking);

let title = "";
let content = "";
let imageLink = "";


function createItem(event) {
    event.preventDefault();
    title = document.getElementById("title").value;
    content = document.getElementById("content").value;
    let createdItems = document.getElementById("created");
    let newItem = document.createElement("article");
    let itemTitle = document.createElement("h2");
    let itemTimeStamp = document.createElement("p");
    let itemContent = document.createElement("p");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => newItem.remove());
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.type = "button";
    itemTitle.innerHTML = title;
    itemTitle.style.textAlign = "center";
    itemTimeStamp.innerHTML = new Date();
    itemTimeStamp.className = "postTimeStamp";
    console.log(itemTimeStamp.innerHTML);
    itemContent.innerHTML = content;
    newItem.appendChild(itemTitle);
    newItem.appendChild(itemTimeStamp);
    newItem.appendChild(itemContent);
    if (imageLink != "") {
        let postingImg = document.createElement("img");
        postingImg.src = imageLink;
        postingImg.alt = "An image in a post.  ";
        postingImg.style.display = "block";
        postingImg.className = "postImage";
        newItem.appendChild(postingImg);
        imageLink = "";
    }
    newItem.appendChild(deleteButton);
    newItem.appendChild(editButton);
    editButton.addEventListener("click", editItem);
    createdItems.prepend(newItem);
    console.log(createdItems);
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    console.log(document.querySelector("fieldset").childNodes);
    let fieldset = document.querySelector("fieldset");
    fieldset.childNodes[10].remove();
    fieldset.childNodes[9].after(document.createTextNode(""));
    fieldset.childNodes[10].after(imgButton);
}

function editItem() {
    let theItem = this.parentNode;
    let editorForm = document.createElement("form");
    let editorFieldset = document.createElement("fieldset");
    let editorLegend = document.createElement("legend");
    let editorLabel = document.createElement("label");
    let editorTextBox = document.createElement("textarea");
    let saveButton = document.createElement("button");
    editorLegend.innerHTML = "Editing Mode";
    editorLabel.innerHtml = "Editing post";
    editorLabel.for = "edit-box";
    console.log(theItem.childNodes);
    editorTextBox.value = theItem.childNodes[2].innerHTML;
    editorTextBox.id = "edit-box";
    saveButton.innerHTML = "Save edits";
    editorFieldset.appendChild(editorLegend);
    editorFieldset.appendChild(editorLabel);
    editorFieldset.appendChild(editorTextBox);
    editorFieldset.appendChild(saveButton);
    editorForm.appendChild(editorFieldset);
    theItem.appendChild(editorForm);
    saveButton.addEventListener("click", () => {
        let updateTime = new Date();
        theItem.childNodes[1].innerHTML = `Posted:  ${theItem.childNodes[1].innerHTML}  Edited on:  ${updateTime}`;
        theItem.childNodes[2].innerHTML = editorTextBox.value;
        editorForm.remove();
    })
}

function imgLinking(event) {
    let parentNode = this.parentNode;
    console.log(parentNode);
    let linkingArea = parentNode.childNodes;
    console.log(linkingArea);
    let linkLabelField = document.createElement("label");
    let linkTextField = document.createElement("input");
    let linkSubmit = document.createElement("button");
    linkLabelField.for = "linkField";
    linkLabelField.innerHTML = "Enter link to image.  :  ";
    linkTextField.id = "linkField";
    linkSubmit.innerHTML = "Insert";
    linkSubmit.type = "button";
    linkingArea[11].remove();
    console.log(linkingArea);
    linkingArea[9].after(linkLabelField);
    linkingArea[11].after(linkTextField);
    linkingArea[13].after(linkSubmit);
    console.log(linkingArea);
    console.log(linkingArea[14].innerHTML);
    linkSubmit.addEventListener("click", () => {
        imageLink = linkTextField.value;
        linkLabelField.remove();
        linkTextField.remove();
        linkSubmit.remove();
        let postingImage = document.createElement("img");
        postingImage.src = imageLink;
        postingImage.alt = "Image to be posted.  ";
        linkingArea[9].after(postingImage);
    });
}
