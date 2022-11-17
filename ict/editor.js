var scriptTag = document.createElement('script');
scriptTag.src = `prism.js`;
var head = document.getElementsByTagName('head')[0];
head.appendChild(scriptTag);

var setRange = 0;

const editorPre = document.querySelector("#editor-pre");
const editor = document.querySelector("#editor");
const toolbar = document.querySelector("#toolbar");
const iframe = document.querySelector("#frame");
const btn = document.querySelector("#run");


const p = document.querySelector("#tool-p");
const div = document.querySelector("#tool-div");
const a = document.querySelector("#tool-a");
const img = document.querySelector("#tool-img");
const ul = document.querySelector("#tool-ul");
const ol = document.querySelector("#tool-ol");
const li = document.querySelector("#tool-li");

const lt = document.querySelector("#tool-lt");
const gt = document.querySelector("#tool-gt");
const elt = document.querySelector("#tool-elt");
const atr = document.querySelector("#tool-atr");
const cl = document.querySelector("#tool-class");
const st = document.querySelector("#tool-style");
const comment = document.querySelector("#tool-com");


const pContent = `<p></p>`;
const divContent = `<div></div>`;
const aContent = `<a href=""></a>`;
const imgContent = `<img src="" alt="">`;
const ulContent = `<ul></ul>`;
const olContent = `<ol></ol>`;
const liContent = `<li></li>`;

const ltContent = `<`;
const gtContent = `>`;
const eltContent = `</`;
const atrContent = `=""`;
const clContent = `class=""`;
const stContent = `style=""`;
const commentContent = `<!-- -->`;

editor.content = "Write your code here";
iframe.src = "data:text/html;charset=utf-8," + encodeURI(editor.textContent);


function reloadJS() { 
  head.removeChild(scriptTag); 
  var newScriptTag = document.createElement('script'); 
  newScriptTag.src = scriptTag.src; 
  head.appendChild(newScriptTag); 
  scriptTag = newScriptTag;
}

function setEndOfContenteditable(contentEditableElement) { 
  
  var range,selection;
  if(document.createRange) { 
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection(); 
    selection.removeAllRanges();
    selection.addRange(range);
  }
  else if(document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(contentEditableElement);
    range.collapse(false); 
    range.select();
   } 
}

function getParentId(num) {
  var caret = document.getSelection().getRangeAt(0);
  var caretParent = caret.commonAncestorContainer.parentNode;
  if(num == 3) {
    return caretParent.parentNode.parentNode.id;
  }else if(num == 2) {
    return caretParent.parentNode.id;
  }else {
    return caretParent.id;
  }
}

function insertTextAtCaret(text) { 
  
  toolbar.style.pointerEvents = 'none';
  toolbar.style.opacity = 0.5;
  
  var sel, range;
  
  if (window.getSelection) {
    sel = window.getSelection(); 
    if (sel.getRangeAt && sel.rangeCount) { 
      if (getParentId(1) == "editor" || getParentId(2) == "editor" || getParentId(3) == "editor") {
        range = sel.getRangeAt(0); 
        range.deleteContents(); 
        range.insertNode( document.createTextNode(text) );
      }
    }
  } else if (document.selection && document.selection.createRange) { 
    document.selection.createRange().text = text; 
  }
  
  var newRange = document.createRange();
  try {
    setRange = range.endOffset;
  } catch (err) {
    
  }
  
  newRange.setStart(editor, setRange);
  newRange.setEnd(editor, setRange);
  newRange.collapse(true);
  sel.removeAllRanges();
  sel.addRange(newRange);
  
}

function tryIt(id) {
  var html = document.getElementById(id).textContent;
  editor.textContent = html;
  reloadJS();
  editor.focus();
  iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
  setEndOfContenteditable(editor);
}

btn.addEventListener("click", () => {
  var html = editor.textContent;
  iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
  reloadJS();
});

editorPre.addEventListener("click", () => {
  editor.click();
  editor.focus();
});

editor.addEventListener('focus',()=>{
  toolbar.style.display = 'block';
})

editor.addEventListener('keyup',()=>{
  toolbar.style.pointerEvents = 'all';
  toolbar.style.opacity = 1;
})

editor.addEventListener('click',()=>{
  toolbar.style.pointerEvents = 'all';
  toolbar.style.opacity = 1;
})

editor.addEventListener("paste", function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
        reloadJS();
});


p.addEventListener("click", ()=>{
  insertTextAtCaret(pContent)
});
div.addEventListener("click", ()=>{
  insertTextAtCaret(divContent)
});
a.addEventListener("click", ()=>{
  insertTextAtCaret(aContent)
});
img.addEventListener("click", ()=>{
  insertTextAtCaret(imgContent)
});
ul.addEventListener("click", ()=>{
  insertTextAtCaret(ulContent)
});
ol.addEventListener("click", ()=>{
  insertTextAtCaret(olContent)
});
li.addEventListener("click", ()=>{
  insertTextAtCaret(liContent)
});
lt.addEventListener("click", ()=>{
  insertTextAtCaret(ltContent)
});
gt.addEventListener("click", ()=>{
  insertTextAtCaret(gtContent)
});
elt.addEventListener("click", ()=>{
  insertTextAtCaret(eltContent)
});
atr.addEventListener("click", ()=>{
  insertTextAtCaret(atrContent)
});
cl.addEventListener("click", ()=>{
  insertTextAtCaret(clContent)
});
st.addEventListener("click", ()=>{
  insertTextAtCaret(stContent)
});
comment.addEventListener("click", ()=>{
  insertTextAtCaret(commentContent)
});

toolbar.style.display = 'none';