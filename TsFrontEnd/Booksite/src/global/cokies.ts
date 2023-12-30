export function setCookie(id:string){
    const date:Date = new Date();
    const day = date.getDay();
    const daten = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
     document.cookie = `bookCookie=${id}; expires=${day} ${daten+1} ${month+2} ${year} ${hours} ${minutes} ${seconds}`;
    
}

export function getCookie():string{
    return document.cookie.substring(11,);
}

export function delCookie(){
    document.cookie = "bookCookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}