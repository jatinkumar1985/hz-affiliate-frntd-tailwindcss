
const MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]; 

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

const PublishedDate = (Published) => {
    const PubTime = padTo2Digits(new Date(Published).getHours())+":"+padTo2Digits(new Date(Published).getMinutes())+":"+padTo2Digits(new Date(Published).getSeconds())
    const PubDate = new Date(Published).getFullYear()+"-"+padTo2Digits((new Date(Published).getMonth()+1))+"-"+padTo2Digits(new Date(Published).getDate())+"T"+PubTime+"+05:30"
    return  PubDate
}
 
const ModifiedDate = (Modified) => {
    const ModTime = padTo2Digits(new Date(Modified).getHours())+":"+padTo2Digits(new Date(Modified).getMinutes())+":"+padTo2Digits(new Date(Modified).getSeconds())
    const ModDate = new Date(Modified).getFullYear()+"-"+padTo2Digits((new Date(Modified).getMonth()+1))+"-"+padTo2Digits(new Date(Modified).getDate())+"T"+ModTime+"+05:30"
    return  ModDate
}


const DDPub = (DisplayPub) => {
    const PubDisplayDate = (MonthNames [new Date(DisplayPub).getMonth()])+" "+padTo2Digits(new Date(DisplayPub).getDate())+", "+new Date(DisplayPub).getFullYear()+" "+padTo2Digits(new Date(DisplayPub).getHours())+":"+padTo2Digits(new Date(DisplayPub).getMinutes())+" IST"
    return  PubDisplayDate 
} 

const DDMob = (DisplayMob) => {
    const MobDisplayDate = (MonthNames [new Date(DisplayMob).getMonth()])+" "+padTo2Digits(new Date(DisplayMob).getDate())+", "+new Date(DisplayMob).getFullYear()+" "+padTo2Digits(new Date(DisplayMob).getHours())+":"+padTo2Digits(new Date(DisplayMob).getMinutes())+" IST"
    return  MobDisplayDate 
} 

const CdPub = (DisplayPub) => {
    const PubDisplayDate = (MonthNames [new Date(DisplayPub).getMonth()])+" "+padTo2Digits(new Date(DisplayPub).getDate())+", "+new Date(DisplayPub).getFullYear()+" "+padTo2Digits(new Date(DisplayPub).getHours())+":"+padTo2Digits(new Date(DisplayPub).getMinutes())+" IST"
    return  PubDisplayDate 
} 

const CdMob = (DisplayMob) => {
    const MobDisplayDate = (MonthNames [new Date(DisplayMob).getMonth()])+" "+padTo2Digits(new Date(DisplayMob).getDate())+", "+new Date(DisplayMob).getFullYear()+" "+padTo2Digits(new Date(DisplayMob).getHours())+":"+padTo2Digits(new Date(DisplayMob).getMinutes())+" IST"
    return  MobDisplayDate 
} 
 
export  {PublishedDate, ModifiedDate, DDPub, DDMob, CdPub, CdMob};
  