var interface = document.getElementById("interface");
var userName = document.getElementById("userName");
var body = document.querySelector("body");

let w = window.innerWidth;
let h = window.innerHeight;


//sushmanth.dampur8780
let Inf = 10000000000000001;
interface.style.background = "black";

userName.style.position = "absolute";
userName.style.left = (w / 2) - 200 + "px";
userName.style.height = "20px";
userName.style.width = "400px";


let elements = [] , linksToRemove = [] , spaceToRemove = null;

function Reset(elements , linksToRemove){

  for(let link of linksToRemove)
  spaceToRemove.removeChild(link);
  

  for(let e of elements)
  interface.removeChild(e);

}



userName.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        console.log(userName.value);

        Reset(elements , linksToRemove);
        elements = [];
        linksToRemove = [];
        spaceToRemove = null;
        

        // verdict bar_graph
        let url = "https://codeforces.com/api/user.status?handle=" + userName.value;
        const response = await fetch(url);
        let data = await response.json();
        console.log(data);
    




        // Here it goes
        let tagsCount = {} , problemRatings = {} , language = {} , verdict = {} , problemIndex = {}; 
        let ok = 0;total = 0;
        let solved = {};
        for(let d of data.result){
          let v = d.verdict;
          let key = d.problem.contestId + d.problem.index;

          if(v == "OK" && solved[key] == undefined){
            for(let tag of d.problem.tags){
              if(tag in tagsCount) tagsCount[tag] += 1;
              else tagsCount[tag] = 1;
            }

            let rat = d.problem.rating;
            if(rat in problemRatings) problemRatings[rat] += 1;
            else problemRatings[rat] = 1;
            
            

            let lang = d.programmingLanguage;
            if(lang in language) language[lang] += 1;
            else language[lang] = 1;

            let ind = d.problem.index
            if(ind in problemIndex) problemIndex[ind] += 1;
            else problemIndex[ind] = 1;

        } 

          
          if(v in verdict) verdict[v] += 1;
          else verdict[v] = 1;

          if(v == "OK") {
              if(key in solved) solved[key] += 1;
              else {solved[key] = 1;ok += 1;}
          }
          total += 1;
  

           
        }
        

        let tried = {} , unsolvedProblems = {};
        for(let d of data.result){
          
          let key = d.problem.contestId + d.problem.index;

          if(key in solved){}
          else unsolvedProblems[key] = "Yes";

          if(key in tried) tried[key] += 1;
          else tried[key] = 1;

        }
        


        // filling table1
        let table1 = {} , whichProblem = {};
        table1["Tried"] = " ";
        table1["Solved"] = " ";
        table1["Average attempts"] = " ";
        table1["Max attempts"] = " ";
        table1["Solved with one submission"] = " ";
        table1["Max AC(s)"] = " "
        whichProblem["Max attempts"] = " ";
        whichProblem["Max AC(s)"] = " "

        table1["Solved"] = ok;
        table1["Tried"] = Object.keys(tried).length;
        table1["Average attempts"] = total / ok;


        console.log("Here I am");
        console.log(table1);
        let oneSubmission = 0 , maxSubmissions = 0 , maxSubmissionsPerProblem = 0;
        for (let key in solved){
          
          if(tried[key] == solved[key]){}
          else oneSubmission += 1;
          
          if(maxSubmissions < solved[key]){
            maxSubmissions = solved[key];
            whichProblem["Max AC(s)"] = "(" + key + ")";
          }
        }
      for(let key in tried){
        if(maxSubmissionsPerProblem < tried[key]){
          whichProblem["Max attempts"] = "(" + key + ")";
          maxSubmissionsPerProblem = tried[key];
        }
      }
      table1["Max attempts"] = maxSubmissionsPerProblem + whichProblem["Max attempts"];
      table1["Solved with one submission"] = oneSubmission;
      table1["Max AC(s)"] = maxSubmissions + whichProblem["Max AC(s)"];
      








      // filling table2 
      let table2 = {} , whichContest = {};
      let url1 = "https://codeforces.com/api/user.rating?handle=" + userName.value;
      const response1 = await fetch(url1);
      let data1 = await response1.json();
      console.log(data1);
      
      table2["Number of Contests"] = data1.result.length;
      table2["Best rank"] = "";
      table2["Worst rank"] = "";
      table2["Max up"] = "";
      table2["Max down"] = "";
      whichContest["Number of Contests"] = data1.result.length;
      whichContest["Best rank"] = "";
      whichContest["Worst rank"] = "";
      whichContest["Max up"] = "";
      whichContest["Max down"] = "";

      for(let d of data1.result){

        if(table2["Best rank"] == "") {
          table2["Best rank"] = d.rank;
          whichContest["Best rank"] = d.contestId;
        }
        else {
          if(table2["Best rank"] > d.rank){
            table2["Best rank"] = d.rank;
            whichContest["Best rank"] = d.contestId;
          }
        }

        if(table2["Worst rank"] == ""){
          table2["Worst rank"] = d.rank;
          whichContest["Worst rank"] = d.contestId;
        }
        else {
          if(table2["Worst rank"] < d.rank){
            table2["Worst rank"] = d.rank;
            whichContest["Worst rank"] = d.contestId;
          }
        }

        let diff = d.newRating - d.oldRating;
        if(diff > 0){
          if(table2["Max up"] == "") {
            table2["Max up"] = diff;
            whichContest["Max up"] = d.contestId;
          }
          else{
            if(table2["Max up"] < diff){
              table2["Max up"] = diff;
              whichContest["Max up"] = d.contestId;
            }
          }
        }
        else{
          if(table2["Max down"] == "") {
            table2["Max down"] = diff;
            whichContest["Max down"] = d.contestId;
          }
          else {
            if(table2["Max down"] > diff){
              table2["Max down"] = diff;
              whichContest["Max down"] = d.contestId;
            }
          }
        }

      }
      
      if(whichContest["best rank"] != "") table2["Best rank"] += "(" + whichContest["Best rank"] + ")"
      if(whichContest["Worst rank"] != "") table2["Worst rank"] += "(" + whichContest["Best rank"] + ")";
      if(whichContest["Max up"] != "") table2["Max up"] += "(" + whichContest["Max up"] + ")";
      if(whichContest["Max down"] != "") table2["Max down"] += "(" + whichContest["Max down"] + ")";
    
      //unsolvedproblems;
      let unsolved = Object.keys(unsolvedProblems);

      
      //date and time heat map
      let rawTime = [];
      for (let d of data.result){
        rawTime.push(d.creationTimeSeconds * 1000);
      }
      
    let datePoints = {};

    for (let d of rawTime){
      let problemDate = new Date(d);
  
      let day = problemDate.getDate();
      let month = problemDate.getMonth(); 
      let year = problemDate.getFullYear();
      
      let date = [year , month , day];
      if(date in datePoints)
      datePoints[date] += 1;
      else
      datePoints[date] = 1;
    }

      



      let yaxis = 40;

      // piecharts
      function drawChart1() {

        var data = google.visualization.arrayToDataTable(tempd1);

        var options = {
          title: 'VERDICT',
          is3D: true,
          height: 450,
          width: 750,
        };

        var chart = new google.visualization.PieChart(piechart1);

        chart.draw(data, options);
      }


      let piechart1 = document.createElement('div');
      elements.push(piechart1);
      piechart1.id = "piechart1";
      piechart1.style.corner = "rounded";
      piechart1.style.position = "absolute";
      piechart1.style.top = yaxis + 25 + "px";
      piechart1.style.left = 25 + "px"; 
      console.log(piechart1);
      interface.appendChild(piechart1);
      let tempd1 = [["verdict" , "submissionCount"]]
      for (let key in verdict)
      tempd1.push([key , verdict[key]]);
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart1);
      
      yaxis += 25;
      yaxis += 450;

      function drawChart2() {

        var data = google.visualization.arrayToDataTable(tempd2);

        var options = {
          title: 'PROGRAMMING LANGUAGE',
          is3D: true,
          height: 450,
          width: 750,
        };

        var chart = new google.visualization.PieChart(piechart2);

        chart.draw(data, options);
      }

      let piechart2 = document.createElement('div');
      elements.push(piechart2);
      piechart2.id = "piechart2";
      piechart2.style.position = "absolute";
      piechart2.style.top = yaxis - 450 + "px";
      piechart2.style.left = 825 + "px"; 
      console.log(piechart2);
      interface.appendChild(piechart2);
      let tempd2 = [["language" , "SubmissionCount"]]
      for (let key in language)
      tempd2.push([key , language[key]])
      console.log(tempd2)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart2);



      function drawChart3() {

        var data = google.visualization.arrayToDataTable(tempd3);

        var options = {
          title: 'PROBLEM TAGS COUNT',
          is3D: true,
          height: 450,
          width: 750,
        };

        var chart = new google.visualization.PieChart(piechart3);

        chart.draw(data, options);
      }

      let piechart3 = document.createElement('div');
      elements.push(piechart3);
      piechart3.id = "piechart3";
      piechart3.style.position = "absolute";
      piechart3.style.top = yaxis + 25 + "px";
      piechart3.style.left = 400 + "px"; 
      console.log(piechart3);
      interface.appendChild(piechart3);
      let tempd3 = [["tags" , "Count"]]
      for (let key in tagsCount)
      tempd3.push([key , tagsCount[key]])
      console.log(tempd3)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart3);

      
      yaxis += 25;
      yaxis += 450;



      //histograms
      function drawChart4() {
        var data = google.visualization.arrayToDataTable(tempd4);

        var options = {
          title: "PROBLEM LEVEL",
          width: 1500,
          height: 500,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };

        var chart = new google.visualization.ColumnChart(histogram1);
        chart.draw(data, options);
      }
      
      let histogram1 = document.createElement('div');
      elements.push(histogram1);
      histogram1.id = "histogram1";
      histogram1.style.position = "absolute";
      histogram1.style.top = yaxis + 25 + "px";
      histogram1.style.left = 25 + "px"; 
      console.log(histogram1);
      interface.appendChild(histogram1);
      let tempd4 = [["problemIndex" , "Count"]]
      
      let k = Object.keys(problemIndex);
      k.sort();
      for (let key of k)
      tempd4.push([key , problemIndex[key]])
      
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart4);

      yaxis += 25;
      yaxis += 500;


      function drawChart5() {
        var data = google.visualization.arrayToDataTable(tempd5);

        var options = {
          title: "RATING LEVEL OF PROBLEMS",
          width: 1500,
          height: 500,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };

        var chart = new google.visualization.ColumnChart(histogram2);
        chart.draw(data, options);
      }
      
      let histogram2 = document.createElement('div');
      elements.push(histogram2);
      histogram2.id = "histogram2";
      histogram2.style.position = "absolute";
      histogram2.style.top = yaxis + 25 + "px";
      histogram2.style.left = 25 + "px"; 
      console.log(histogram2);
      interface.appendChild(histogram2);
      let tempd5 = [["problemRatings" , "Count"]]
      
      k = Object.keys(problemRatings);
      for(let i = 0;i < k.length;++i)
      k[i] = parseInt(k[i]);

      yaxis += 25;
      yaxis += 500;
      
      k.sort();
      for (let key of k){
        if(key){tempd5.push([key , problemRatings[key]])}
      }
      
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart5);




    // Unsolved Problems with reference
    let space = document.createElement("div")
    elements.push(space);
    spaceToRemove = space;
    space.innerText = "UNSOLVED PROBLEMS"
    space.id = "space";
    space.style.position = "absolute";
    space.style.top = yaxis + 25 + "px";
    space.style.left = 25 + "px";
    space.style.height = 100 * ((unsolved.length * 100) / w) + "px";
    space.style.width = w - 200 + "px";
    space.style.backgroundColor = "white";
    interface.appendChild(space);
    let dw = 100;
    let dh = 50;
  
    let x = 50 , y = 30;
    for(let key of unsolved){
      let link = document.createElement("a");
      linksToRemove.push(link);
      
      let contestid = "";
      for(let i = 0;i < key.length - 1;++i)
      contestid += key[i];

      let problemid = key[key.length - 1];

      link.href = "https://codeforces.com/contest/" + contestid + "/problem/" + problemid;
      link.innerText = key;
      link.target = "_blank"
      link.style.position = "absolute";
      link.style.left = x + "px";
      link.style.top = y + "px";
      space.appendChild(link);

      if(x >= w - 300){
        x = 50;
        y += dh;
      }
      else{
        x += dw;
      }

      }

      yaxis += 50
      yaxis += 100 * ((unsolved.length * 100) / w);
      console.log(yaxis);

      /*
        table1["Tried"] = " ";
        table1["Solved"] = " ";
        table1["Average attempts"] = " ";
        table1["Max attempts"] = " ";
        table1["Solved with one submission"] = " ";
        table1["Max AC(s)"] = " "
      */

      //tables from
      function drawTable1() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('string', 'UserParameters');
        data.addColumn('string', 'Submissions');
        data.addRows([
          ["Tried" , table1['Tried'].toString()],
          ["Solved" , table1['Solved'].toString()],
          ["Average attempts" , table1["Average attempts"].toString()],
          ["Max attempts" , table1["Max attempts"].toString()],
          ["Solved with one submission" , table1["Solved with one submission"].toString()],
          ["Max AC(s)" , table1["Max AC(s)"].toString()],
        ]);

        var table = new google.visualization.Table(tabledata1);

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }

      let tabledata1 = document.createElement("div");
      elements.push(tabledata1);
      tabledata1.id = "tabledata1" 
      interface.appendChild(tabledata1);
      tabledata1.style.position = "absolute";
      tabledata1.style.top = yaxis + 25 + "px";
      tabledata1.style.left = 25 + "px";
      tabledata1.style.height = 500 + "px";
      tabledata1.style.width = 750 + "px";
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable1);
      
      yaxis += 25;
      yaxis += 500;
      


      /*
      table2["Number of Contests"] = data1.result.length;
      table2["Best rank"] = "";
      table2["Worst rank"] = "";
      table2["Max up"] = "";
      table2["Max down"] = "";
      */

      function drawTable2() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('string', 'UserParameters');
        data.addColumn('string', 'Value');
        data.addRows([
          ["Number of Contests" , table2["Number of Contests"].toString()],
          ["Best rank" , table2["Best rank"].toString()],
          ["Worst rank" , table2["Worst rank"].toString()],
          ["Max up" , table2["Max up"].toString()],
          ["Max down" , table2["Max down"].toString()],
        ]);

        var table = new google.visualization.Table(tabledata2);

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }

      let tabledata2 = document.createElement("div");
      elements.push(tabledata2);
      tabledata2.id = "tabledata1" 
      interface.appendChild(tabledata2);
      tabledata2.style.position = "absolute";
      tabledata2.style.top = yaxis - 500 + "px";
      tabledata2.style.left = 800 + "px";
      tabledata2.style.height = 500 + "px";
      tabledata2.style.width = 750 + "px";
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable2);




      //heatMap
      function drawHeatMap() {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'date', id: 'Date' });
        dataTable.addColumn({ type: 'number', id: 'Submissions' });
        dataTable.addRows(heatMapData);
 
        var chart = new google.visualization.Calendar(heatMap);
 
        var options = {
          title: 'HeatMap of User Submissions',
          height: (maxYear - minYear) * 230,
          width: w,
          calendar: {
            dayOfWeekLabel: {
              fontName: 'Times-Roman',
              fontSize: 12,
              color: '#1a8763',
              bold: true,
              italic: true,
            },
            dayOfWeekRightSpace: 10,
            daysOfWeek: 'DLMMJVS',
          }
        };
 
        chart.draw(dataTable, options);
    }
      
      let heatMapData = [];
      let dateKeys = Object.keys(datePoints);
      let minYear = Inf , maxYear = -Inf;
      for (let date of dateKeys){

        let year = "" , month = "" , day = "";
        let count = 0;
        for (let i = 0;i < date.length;++i){
            if(date[i] == ','){
              count += 1;
              continue;
            }  
            if(count == 0) year += date[i];
            else if(count == 1) month += date[i];
            else day += date[i];
        }
        
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);
        minYear = (minYear > year)?year:minYear;
        maxYear = (maxYear < year)?year:maxYear;

        heatMapData.push([new Date(year , month , day), datePoints[date]]);
      }

      let heatMap = document.createElement("div");
      elements.push(heatMap);
      heatMap.id = "heatMap";
      interface.appendChild(heatMap);
      heatMap.style.position = "absolute";
      heatMap.style.left = (w / 2) - 500 + "px";
      heatMap.style.top = yaxis + 50 + "px";

      console.log(heatMapData);

    google.charts.load("current", {packages:["calendar"]});
    google.charts.setOnLoadCallback(drawHeatMap);
    
    yaxis += 50;
    yaxis += (maxYear - minYear) * 230;
    




      // all data u need are stored in these variables;
      // can use these to process them
      console.log(verdict);
      console.log(language);
      console.log(tagsCount);
      console.log(problemIndex);
      console.log(problemRatings);
      
      console.log(table1);
      console.log(whichProblem)
      
      console.log(table2);
      console.log(whichContest);

      console.log(unsolved);
      console.log(datePoints);

      
    }
})