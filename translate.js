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
  text = text.toLowerCase()

  let graph =  new Map();
  for (var i = 1; i <= 500; i++)
  {
    var english = data[i][8].split(" ");
    var spanish = data[i][10].split(" ");
    for (var j = 0; j < english.length; j++)
    {
      for (var k = 0; k < spanish.length; k++)
      {
        var eng = clean(english[j]);
        var lang = clean(spanish[j]);

        graph[eng] ||= [];
        if(typeof graph[eng] === 'function')
        {
          graph[eng] = [];
        }
        graph[eng].push(lang);
      }
    }
  }

  //Formats the word by making it lower case and removing punctuation
  function clean(word)
  {
    word = String(word);
    word = word.toLowerCase();

    var end = word[word.length-1]
    if(end == '.' || end == ',' || end == '?' || end == '!')
    {
      word = word.substr(0,word.length-1);
    }

    var begin = word[0]
    if(begin == '¿' || begin == '¡')
    {
      word = word.substr(1,word.length);
    }

    return word;
  }


  graph[text] = graph[text]||[];

  var freq = new Map();
  for (var i = 0; i < graph[text].length; i++)
  {
    freq[graph[text][i]] = 0;
  }

  for (var i = 0; i < graph[text].length; i++)
  {
    if(graph[text][i] != "undefined")
    {
      freq[graph[text][i]]++;
    }
  }


  var best = 0, ans = "", word = "";
  for (var key in freq)
  {
    console.log(key)
    console.log(freq[key])
    if(freq[key] > best)
    {
      best = freq[key];
      ans = key;
      word = key;
    }
  }

  best *= 0.6;
  for (var key in freq)
  {
    if(freq[key] > best && key != word)
    {
      ans += ", ";
      ans += key;
    }
  }

  if(ans == "" || ans == 0){ans = text;}
  document.getElementById("result").placeholder = ans;
}
