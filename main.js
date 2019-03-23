$(function(){ //short hand for $(document).ready(...)
  $(".article-stage").hide();
  $("#main-form").submit(function(){
    event.preventDefault()
    var searchTerm = $("#search-term").val()
    var articleAmount = $("#number-of-records").val();
    var startYear = $("#start-year").val()
    var endYear = $("#end-year").val()
    
    var myUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + 
    "&api-key=guPNvWbc3BGNpAC5lNqhDxCtNWEpAUBF"


    $.ajax({
      url : myUrl,
      method : "GET"
    }).then(function(response){
      $(".article-stage").show();
      var results = response.response.docs;

      for(i = 0; i < articleAmount; i++){
        var articleDiv = $("<div>").addClass("card-body article-frame mx-auto")
        var a = $("<a>").attr("href", results[i].web_url)
        var cardContent = $("<p>").text(results[i].headline.main)
        if(results[i].byline.original == null){
          cardContent.append($("<p>").text("No Author Found"))
        }else{
          cardContent.append($("<p>").text(results[i].byline.original))
        }


        a.append(cardContent)
        articleDiv.append(a)
        $(".article-stage").append(articleDiv)
      }

      
    })
  })
  //do that thing that retroactivly adds on clicks to classes
})