async function getScheduleData()
{
    let hasScheduleData = await fetch('./lib/Schedule.php').then(response=>response.json());
    return hasScheduleData;
}
function viewScheduleHeaderData(hasScheduleData)
{
    return (hasScheduleData.map((data,index)=>{
        let str = '';
        if(index === 0){
            str+= `<tr class='line${data?.line}'>`;
        }
        if(index >= 0 && index <= 6){
            str+= `<th class='' data-data='${data?.day},${data?.time}'>${data?.day}</th>`;
        }
        if(index === 6){
            str+= `</tr>`;
        }
        return str;
   })).join('');
}
function viewScheduleData(hasScheduleData)
{
   return (hasScheduleData.map((data)=>{
        let str = '';
        if(parseInt(data?.line) === 1){
            str+= `<tr>`;
        }
        str+= `<td class='time select' data-data='${data?.day},${data?.time}'>${data?.time}</td>`;
        if(parseInt(data?.line) === 7){
            str+= `</tr>`;
        }
        return str;
   })).join('');
}