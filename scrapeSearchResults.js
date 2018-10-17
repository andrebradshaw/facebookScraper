var envt = 200;

function scrolled(scrollEvnt, n) {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, (n * 1133));
}


for (i = 0; i < envt; i++) {
  var don = scrolled(envt, i);
}
window.addEventListener("scroll", function() {
  if (document.getElementById("browse_end_of_results_footer") != null) {
	document.getElementById("browse_end_of_results_footer").parentElement.removeChild(document.getElementById("browse_end_of_results_footer"));
    downloaded();
  }
});

function downloaded() {
  function grp(elm, n) {
    if (elm != null) {
      return elm[n];
    } else {
      return ' ';
    }
  }

  function reger(x, el) {
    if (x.test(el) === true) {
      return x.exec(el)[0];
    } else {
      return '';
    }
  }

  function getbiodata(elm) {
    var livesIn = ' ';
    var likes = ' ';
    var from = ' ';
    var studied = ' ';
    var pastExp = ' ';
    var regXgeo = /(?<=Lives in | to ).+?(?=\W+From| in |$)/;
    var regXfrom = /(?<=[fF]rom ).+?(?= ·| in | to |$)/;
    var regXlike = /(?<=Likes ).+/;
    var regXedu = /(?<=Studie[sd] ).+/;
    var regXpast = /(?<=Former )(.+?) at (.+)/;
    for (i = 0; i < elm.length; i++) {
      var elmText = elm[i].getElementsByClassName("_52eh")[0].innerText;
      var livesIn = livesIn + reger(regXgeo, elmText).replace(/,/g, ';');
      var likes = likes + reger(regXlike, elmText).replace(/,/g, ';');
      var from = from + reger(regXfrom, elmText).replace(/,/g, ';');
      var studied = studied + reger(regXedu, elmText).replace(/,/g, ';');
      var pastExp = pastExp + reger(regXpast, elmText).replace(/,/g, ';');
      var eduProgram = splitAt("job", studied, 0);
      var eduInst = splitAt("co", studied, 0);
      var pastJob = splitAt("job", pastExp, 0);
      var pastEmpl = splitAt("co", pastExp, 0);
    }
    return pastJob + ',' + pastEmpl + ',' + livesIn + ',' + from + ',' + eduProgram + ',' + eduInst + ',' + likes;
  }

  function splitAt(exp, str, n) {
    if (exp == "job") {
      var job = grp(/^.+?(?= at )/.exec(str), n);
      if (/^.+?(?= at )/.test(str) === false) {
        return str;
      } else {
        return job;
      }
    }
    if (exp == "co") {
      var co = grp(/(?<= at ).+/.exec(str), n);
      if (/(?<= at ).+/.test(str) === false) {
        return str;
      } else {
        return co;
      }
    }

  }
  var str = "_4p2o";
  var divies = document.getElementsByClassName(str);
  var containStr = ' ';
  for (d = 0; d < divies.length; d++) {
    var url = divies[d].getElementsByClassName("_32mo")[0].href;
    var name = divies[d].getElementsByClassName("_32mo")[0].innerText.replace(/,/g, ';');
    var cwork = divies[d].getElementsByClassName("_glm")[0].innerText;
    var title = splitAt("job", cwork, 0).replace(/,/g, ';');
    var company = splitAt("co", cwork, 0).replace(/,/g, ';');

    var bio = getbiodata(divies[d].getElementsByClassName("_ajw"));

    var sarr = url + ',' + name + ',' + title + ',' + company + ',' + bio;
    var containStr = containStr + sarr.replace(/\n|\r/g, '') + '\r';
  }

  function dl(filename, text) {
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elmi.setAttribute('download', filename);

    elmi.style.display = 'none';
    document.body.appendChild(elmi);

    elmi.click();

    document.body.removeChild(elmi);
  }
  var namethis = window.location.href.replace(/.+facebook\.com\//, '').replace(/\//g, '_').replace(/%20/g, '-');
  dl(namethis + ".csv", containStr);

}
