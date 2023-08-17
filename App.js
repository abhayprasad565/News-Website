const Apikey = "652b1808fa4c482ca569229d952f0d0a";
let page = 1;
const currdate = new Date();
let day = currdate.getDate();
let month = currdate.getMonth() + 1;
let year = currdate.getFullYear();
let date = `${year}-${month}-${day}`;
// variables 
let query = undefined;
let category = undefined;
let currPage="";

let nextP = document.querySelector("#nextPage");

// next page and previous page buttons
nextP.addEventListener("click",()=> 
{  
        page+=1;
       currPage() ;
        
});
let prevP = document.querySelector("#prevPage");
prevP.addEventListener("click",()=> {
    if(page>=2)
    {
        page-=1;
    currPage();

    }
});
console.log(page);
// categories button
let science = document.querySelector("#science");
science.addEventListener("click",function()
{    category="science";
     query=undefined;
     page=1;
    fetchTopHeadlines();
});
let sports = document.querySelector("#sports");

sports.addEventListener("click",function()
{
    category="sports";
    query=undefined;
    page=1;
    fetchTopHeadlines();
})
// search bar
const search = document.querySelector("#search");
search.addEventListener("click",function(event)
{ 
     let input  = document.querySelector("#input");
     category=undefined;
     query=input.value;
    console.log(query);
    page = 1;
   fetchSearch();
    
});



 const fetchTopHeadlines = async ()=>
 {   
     currPage=fetchTopHeadlines;
    let url = "https://newsapi.org/v2/top-headlines?";
    if(query!=undefined) url+=`q=${query}&`;
   url+="country=in&"+
    "language=en&"+
    "from="+date+"&to=2023-05-01&"+
    "PageSize=20&";
    if(page!=undefined)
    url+= "page="+page+"&";
   else url+="page=1&"
    if(category!=undefined)url=url+"category="+category+"&";
    url+="apiKey="+Apikey;
   console.log(url);
        printRes(url);  
 };
 const fetchSearch = ()=>
 {   currPage=fetchSearch;
    let url = "https://newsapi.org/v2/everything?" ;
    if(query!=undefined)
      url+= "q="+query+"&";
    else url+="q=india&";
   // +"country=in&"
   url+= "language=en&"+
    "from="+date+"&to=2023-06-16&"+
    //"sortBy=popularity&"+
    "PageSize=20&"+
    "page="+page+"&"+
    "apiKey="+Apikey;
   console.log(url);
   printRes(url);
 }


async function printRes(url)
 {
           let req = new Request(url);
         let a = await fetch(req);
         let response = await a.json();
   // create a temp response to not exhaust api
    let card = `<h2>Top news (${response.totalResults})</h2>`;
      for(let item of response.articles)
      {
        card = card+`<div class="card my-4 mx-2 " style="width: 18rem;">
        <img src="${item.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">+${item.title}+</h5>
          <p class="card-text">${item.description}</p>
          <a href="${item.url}" target="_blank" class="btn btn-primary">Read Full Article</a>
        </div>
      </div>`
      }
     document.querySelector(".container").innerHTML=card;
 }
 fetchTopHeadlines();
 






