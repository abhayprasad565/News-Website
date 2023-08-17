const Apikey = "652b1808fa4c482ca569229d952f0d0a";
let page = 1;
const currdate = new Date();
let day = currdate.getDate();
let month = currdate.getMonth() + 1;
let year = currdate.getFullYear();
let date = `${year}-${month}-${day}`;
let nextP = document.querySelector("#nextPage");
let currtype = true;
// next page and previous page buttons
nextP.addEventListener("click",()=> 
{  
        page+=1;
        console.log(page);
        
});
let prevP = document.querySelector("#prevPage");
prevP.addEventListener("click",()=> {
    if(page>=2)
    {
        page-=1;
    console.log(page);

    }
});
console.log(page);
// categories button
let science = document.querySelector("#science");
science.addEventListener("click",function()
{
    fetchTopHeadlines(page,undefined,date,"science");
});
let sports = document.querySelector("#sports");

sports.addEventListener("click",function()
{
    fetchTopHeadlines(page,undefined,date,"sports");
})
// search bar
const search = document.querySelector("#search");
search.addEventListener("click",function(event)
{ 
    let input = document.querySelector("#input").value;
    console.log(input.value);
    page = 1;
   fetchSearch(input);
    
});



 const fetchTopHeadlines = async (page,query,date,category)=>
 {  currtype=true;
    let url = "https://newsapi.org/v2/top-headlines?";
    if(query!=undefined) url+="q="+query+"&";
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
 const fetchSearch = (search)=>
 {  currtype=false;
    let url = "https://newsapi.org/v2/everything?" ;
    if(search!=undefined)
      url+= "q="+search+"&";
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
 fetchTopHeadlines(undefined,undefined,date,undefined);
 






