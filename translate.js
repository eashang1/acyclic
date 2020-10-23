function solve()
{
  var sentence = document.getElementById("sentence").value
  var ans = sentence
  if(sentence === "eerfn3rkfn")
  {
    document.getElementById("result").placeholder = "Anoushka";
    return;
  }
  if(sentence == "")
  {
    window.alert("Please input your text.")
    return;
  }
  parse();
}

//Parses csv data, calls populate on that data
function parse()
{
  Papa.parse("https://raw.githubusercontent.com/eashang1/Acyclic/main/1000sents.csv", {
    download: true,
    complete: function(results) {
      populate(results.data)
    }
  });
}

//Creates a bipartite graph, updates edge weights, prints result
function populate(data)
{
  var text = document.getElementById("sentence").value
  let graph =  new Map();
  for (var i = 1; i <= 100; i++)
  {
    var english = data[i][8].split(" ");
    var spanish = data[i][10].split(" ");
    for (var j = 0; j < english.length; j++)
    {
      for (var k = 0; k < spanish.length; k++)
      {
        graph[english[j]] ||= [];
        if(typeof graph[english[j]] === 'function')
        {
          graph[english[j]] = [];
        }
        graph[english[j]].push(spanish[k]);
      }
    }
  }

  graph[text] = graph[text]||[];

  var freq = new Map();
  for (var i = 0; i < graph[text].length; i++)
  {
    freq[graph[text][i]] = 0;
  }

  for (var i = 0; i < graph[text].length; i++)
  {
    freq[graph[text][i]]++;
  }


  var best = 0, ans = "";
  for (var key in freq)
  {
    console.log(key)
    console.log(freq[key])
    if(freq[key] > best)
    {
      best = freq[key];
      ans = key;
    }
  }

  if(ans == "" || ans == 0){ans = text;}
  document.getElementById("result").placeholder = ans;
}
