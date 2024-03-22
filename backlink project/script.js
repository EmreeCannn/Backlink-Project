const modal_Container=document.querySelector(".modal_container");
const show_modal=document.getElementById("show-modal");
const close_icon=document.querySelector(".fa-xmark");
const website_name=document.getElementById("website_name");
const backlink_form=document.querySelector("#backlink-form");
const Backlink_container=document.getElementById("Backlink_container");
let backlinks=[];


function modelShow(){
    modal_Container.classList.add("show-modal");
    website_name.focus();
    // direkt modelım açıldığında website name a focus olmasını sağlarım 
}
function close(){
    modal_Container.classList.remove("show-modal");
}
// ben modelımı açtığımda website name e focus olmasını istiyorum bunu yapabilmek için 

function Validate(websiteName,websiteUrl){
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex=new RegExp(expression);
    if(!websiteName || !websiteUrl){
        alert("plase fill required spaces !");
        
        return false;
        // eğer içleri boşsa form gönderme işlemi yapma derim return false sayesinde
    }
    if(!websiteUrl.match(regex)){
        // eğer eşleşmezse
        alert("plase enter a valid website URL !!!!!!!");
        return false;
    }
    return true;
}
function deletebacklink(adress){
    backlinks.forEach((backlink,index)=>{
        if(backlink.adress===adress){
            // backlink içindeki adres parametre olarak göderdipim adrese eşitse eğer
            backlinks.splice(index,1);
            // ikinci paramtre kaç tane eleman silineceğini gösterir
            // ilk başta kaçıncı indexten seçeceğimi söyerim 
            localStorage.setItem("backlinks",JSON.stringify(backlinks));
            // burda local storage i güncelledim
            fetchbacklinks();
            // slinmiş halinin yülenmesi için fetchbacklinksi çağırdım
        }
    })
}

function buildBackLinks(){
    Backlink_container.textContent="";
    backlinks.forEach(backlink=>{
        const name=backlink.name;
        const adress=backlink.adress;
        const item=document.createElement("div");
        const close_icom=document.createElement("i");
        close_icom.classList.add("fa-solid","fa-xmark");
        close_icom.setAttribute("onclick",`deletebacklink("${adress}")`);

        const link_info=document.createElement("div");
        // a etiketini kapsayan divi oluşturduk
        const link=document.createElement("a");
        link.setAttribute("href",`${adress}`);
        link.setAttribute("target","_blank");
        link.textContent=name;

        link_info.appendChild(link);
        // item.appendChild(link_info);
        // item.appendChild(close_icom);
        // appendChlild yerine append kullanırsam birden fazla node ekleyebilirm 
        item.append(link_info,close_icom);
        Backlink_container.appendChild(item);
      
    })
   
}

function fetchbacklinks(){
    if(localStorage.getItem("backlinks")){
        backlinks=JSON.parse(localStorage.getItem("backlinks"));
        console.log(backlinks);
    }
    buildBackLinks();
  
}


function storeBackLink(e){
    e.preventDefault();
    let websiteName=backlink_form.website_name.value;
    let websiteUrl=backlink_form.website_adress.value;
    if(!websiteUrl.includes("https://" && !websiteUrl.includes("http://"))){
        websiteUrl=`https://${websiteUrl}`
    }
    if(!Validate(websiteName,websiteUrl)){
        // Validate fonksiyonuna gider  bana return false dönerse ve ! koyduğum için 
        // bu if koşulunun içine girebildim 
        return false;
    }
    else{
        const backlink_object={
            name:websiteName,
            adress:websiteUrl
        }
        backlinks.push(backlink_object);
        let transform=JSON.stringify(backlinks);
        localStorage.setItem("backlinks",transform);
        
        backlink_form.reset();
        // reset ile form içindeki inputların değerlerini boşaltırım 
        //  ve boşattıktan sonra website name a focus olmasını istiyorum 
        website_name.focus();
        fetchbacklinks();
    }
}
fetchbacklinks();
backlink_form.addEventListener("submit",storeBackLink);
show_modal.addEventListener("click",modelShow);
close_icon.addEventListener("click",close);