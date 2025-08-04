
function act(cb){chrome.tabs.query({active:true,currentWindow:true},t=>t[0]&&cb(t[0].id));}
function send(type,cbk){act(id=>chrome.tabs.sendMessage(id,{type},cbk));}
document.querySelector('.add').onclick=()=>send('ADD_CHECKBOXES');
document.querySelector('.remove').onclick=()=>send('REMOVE_CHECKBOXES');
document.querySelector('.delete').onclick=()=>{if(confirm('Delete all selected chats?'))send('DELETE_SELECTED');};
const cnt=document.getElementById('count');const bar=document.getElementById('bar');
chrome.runtime.onMessage.addListener(m=>{
  if(m.type==='COUNT_UPDATE') cnt.textContent='Selected: '+m.count;
  if(m.type==='PROGRESS_UPDATE' && m.total) bar.style.width=(m.done/m.total*100)+'%';
});
send('GET_SELECTED_COUNT',res=>{if(res)cnt.textContent='Selected: '+res.count;});
