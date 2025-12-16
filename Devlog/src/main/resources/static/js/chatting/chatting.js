
/* 선택 효과 주기 */
const listItem = document.getElementsByClassName('room-item')

for (let item of listItem) {

    item.addEventListener('click', e => {

        for (let el of listItem) {
            el.classList.remove('is-selected')
            
        }
        
        item.classList.add('is-selected')
    })
    
}

document.addEventListener('DOMContentLoaded', e => {
    scrollToBottom()
})



/* 메세지 하단 고정 함수 */
const messageArea = document.getElementsByClassName('message-list')[0]

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


/*채팅방 추가 버튼 클릭 시 */

const chatAddBtn = document.getElementById('chat-add-btn');
const createRoom = document.querySelector('.create-room');

chatAddBtn.addEventListener('click', () => {
    createRoom.classList.toggle('hide');
});


/* 유저 선택 시 */
const radioCheck = document.getElementsByName('invite')
const userList = document.getElementsByClassName('select-user-list')[0]

/* 개인 그룹 선택 */
const private = document.querySelector('.private');
const group = document.querySelector('.group');
const roomNameARea = document.querySelector('.roomNameArea')




private.addEventListener('click', e=>{
    if(group.classList.contains('type-select')){
        group.classList.remove('type-select')
    }

    private.classList.add('type-select')
})


group.addEventListener('click', e=>{
    if(private.classList.contains('type-select')){
        private.classList.remove('type-select')
    }

    group.classList.add('type-select')
    
    roomNameARea.classList.remove('display-none')
    


})


for (let item of radioCheck) {
    if(private.classList.contains('type-select')){
    
        item.addEventListener("change", e => {
    
            for (let check of radioCheck) {
                check.checked = false;
            }
    
            item.checked = true
            const followItem =  e.target.closest('.follow-item');
            const userName = followItem.querySelector('.name').innerText;
            console.log(userName)
            
            const div = document.createElement('div')
            const span = document.createElement('span')
            const deleteBtn = document.createElement('span')
            div.classList.add('user-item')
            span.innerHTML = userName
            deleteBtn.classList.add('list-delete-btn')
            deleteBtn.innerText = ' x'
    
            userList.innerHTML = "";
    
            div.append(span, deleteBtn);
            userList.appendChild(div);
    
    
            deleteBtn.addEventListener('click', e => {
                item.checked = false;
                userList.innerHTML = "";
            })
    
        })
        
    }
    

}    




