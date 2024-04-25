async function main(){
    //スケジュールデータを取得する
    let hasData = await getScheduleData();
    //スケジュールデータから表示用ヘッダー部分を取得する
    let headerScheduleData = viewScheduleHeaderData(hasData);
    //スケジュールデータから表示用ヘッダー部分以外を取得する
    let scheduleData = viewScheduleData(hasData);
    //スケジュールをクリックした時の挙動
    document.getElementById('view').innerHTML = headerScheduleData + scheduleData;
    [...document.querySelectorAll('.select')].forEach(elm=>{
        let inSelect = function(){
            if(!elm.classList.contains('close')){
                if(flg = elm.getAttribute('data-select')){
                    if(parseInt(flg)===1){
                        elm.setAttribute('data-select','0');
                        elm.style.backgroundColor  = "unset";
                    }else{
                        elm.setAttribute('data-select','1');
                        elm.style.backgroundColor  = "#0d6efd";
                    }
                }else{
                    elm.setAttribute('data-select','1');
                    elm.style.backgroundColor  = "#0d6efd";
                }    
            }
        };    
        //elm.addEventListener("mouseout",inSelect);
        elm.addEventListener("click", inSelect);
        elm.addEventListener("touchend",inSelect);
    });
    //ボタンを押下するとクリックしたデータを取得してテキストエリアに表示
    document.getElementById('btn').addEventListener('click',()=>{
        document.getElementById('textData').value = ((()=>{
            return (([...document.querySelectorAll('.select')].filter((elm,index)=>{
                return parseInt(elm.getAttribute('data-select')) == 1;
            })).map((elm,index)=>{
                return `data[${index}]=${elm.getAttribute('data-data')}`;
            })).join('&');
        }))();
    });
}
main();