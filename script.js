 $(document).ready(function() {

     $("#btn2").click(function(e) {
         var jsonData = {};

         var formData = $("#myform").serializeArray();

         $.each(formData, function() {
             if (jsonData[this.name]) {
                 if (!jsonData[this.name].push) {
                     jsonData[this.name] = [jsonData[this.name]];
                 }
                 jsonData[this.name].push(this.value || '');
             } else {
                 jsonData[this.name] = this.value || '';
             }
         });
         //console.log(jsonData);
         //  saveText( JSON.stringify(jsonData), "data.json" );
         MakeTable();
         e.preventDefault();
     });


     $("#btn").click(function(e) {
         var Afilliate_id = $('#AI').val();
         var fcb_pixel = $('#FBP').val();
         var name = $('#Name').val();
         if (Afilliate_id !== "" && fcb_pixel !== "") {
             $("table").append('<tr><td>' + $('#Name').val() + '</td>' + '<td>' + $('#AI').val() + '</td><td>' + $('#FBP').val() + '</td></tr>');
         }
         $('#AI').val("");
         var newAfNumber = $('table tr:last-child td:nth-child(2)').html();
         var AFNumberToInt = parseInt(newAfNumber) + 1;
         $('#AI').val((AFNumberToInt).padLeft(5));
         $('#FBP').val("");
         $('#Name').val("");
         e.preventDefault();
     });

     $("#btn3").click(function(e) {

         MakeTable2();
         e.preventDefault();
     });
     
          $("#btn4").click(function(e) {
             
           e.preventDefault();
     });

 });

 function saveText(text, filename) {

     var a = document.createElement('a');
     a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
     a.setAttribute('download', filename);
     a.click();
 }

 function MakeTable2() {
     // Loop through grabbing everything
     var myRows = [];
     var $headers = $("th");
    $("table tr:not(:first-child)").each(function(index) {
         $cells = $(this).find("td");
         myRows[index] = {};
         $cells.each(function(cellIndex) {
             myRows[index][$($headers[cellIndex]).html()] = $(this).html();
         });
     });

     // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
     var myObj = {};
     myObj = myRows;

     $('#data').html(JSON.stringify(myObj, null, 4));


 }


 function FindField() {
     //////////////////////////////////////////////////////////////////////////////////////////////
     //Get JSON file - retrieve it and break the JSON objects to find the desired field
     var objUrl = 'jsondata.json';
     $.getJSON(objUrl, function(json) {
         var findIt = json.find(function(obj) {
             return obj.Afilliate_ID === '00003';
         });
         console.log(findIt);
     });
     //////////////////////////////////////////////////////////////////////////////////////////////
 }



 function MakeTable() {
     // Loop through grabbing everything
     var myRows = [];
     var $headers = $("th");
      $("table tr:not(:first-child)").each(function(index) {
         $cells = $(this).find("td");
         myRows[index] = {};
         $cells.each(function(cellIndex) {
             myRows[index][$($headers[cellIndex]).html()] = $(this).html();
         });
     });

     // Let's put this in the object like you want and convert to JSON
     //(Note: jQuery will also do this for you on the Ajax request)
     var myObj = {};
     myObj = myRows;
     console.log(JSON.stringify(myObj));
     saveText(JSON.stringify(myObj, null, 4), "jsondata.json");
     $('#data').html(JSON.stringify(myObj, null, 4));
 }

 function onLoad() {
     var url = 'jsondata.json';
     $.getJSON(url, function(json) {
         var table = $('<table class="table">');
         table.attr('border', '1');
         var tr = $('<tr>');
         var th = $('<th>');
         th.html("Name");
         tr.append(th);
         var th = $('<th>');
         th.html("Afilliate_ID");
         tr.append(th);
         th = $('<th>');
         th.html('Facebook Pixel ID');
         tr.append(th);
         table.append(tr);
         for (var i = 0; i < json.length; i++) {
             var tr = $('<tr>');
             var td = $('<td>');
             
             td.html(json[i].Name);
             tr.append(td);
             td = $('<td>');
             
             td.html(json[i].Afilliate_ID);
             tr.append(td);
             td = $('<td>');
             
             td.html(json[i]["Facebook Pixel ID"]);
             tr.append(td);
             table.append(tr);
         }
         $('#tt').append(table);
         
         var newAfNumber = $('table tr:last-child td:nth-child(2)').html();
         console.log(newAfNumber);
         var AFNumberToInt = parseInt(newAfNumber) + 1;
         $('#AI').val((AFNumberToInt).padLeft(5));
         MakeTable2();

         $('.table tr:not(:first-child)').click(function() {
             $('.table tr').removeClass('is-selected');
             $(this).addClass('is-selected');

         });
     });


 }

 function padLeft(nr, n, str) {
     return Array(n - String(nr).length + 1).join(str || '0') + nr;
 }
 //or as a Number prototype method:
 Number.prototype.padLeft = function(n, str) {
     return Array(n - String(this).length + 1).join(str || '0') + this;
 };
 
