$(document).ready(function () { 
    
    $("#load-files").click(function () {

        $.ajax({
            url: 'country-objects/allDetails.json',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    var row = $('<tr><td>' + data[i].country + '</td><td>' + data[i].continent + '</td><td>' + data[i].currency_name + '</td><td>' + data[i].tld + '</td><td></td></tr>');
                    $('#myTable').append(row);
                    var flagCell = row.find('td:last-child'); // Select the last cell in the row
                    var img = $('<img>').attr('src', data[i].flag_base64).addClass('flag-image');
                    flagCell.append(img);
                }
                $('#myTable').DataTable();
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    
        const fs = require('fs');

        let data = fs.readFileSync('country-objects/country-by-capital-city.json');
        let capital = JSON.parse(data);
        data = fs.readFileSync('country-objects/country-by-continent.json');
        let continent = JSON.parse(data);
        data = fs.readFileSync('country-objects/country-by-currency.json');
        data = fs.readFileSync('country-objects/country-by-domain-tld.json');
        let flag = fs.readFileSync('country-objects/country-by-flag.json');
        let flagarr = JSON.parse(flag);

        // Test Class
        //console.log(continent);

        // Create an object that has two fields: country and city
        var countryDetail = [];
        for (i = 0; i < Object.keys(capital).length; i++) {
            let countryName = capital[i]["country"];
            let capitalCity = capital[i]["city"];
            var obj = {'country':countryName, 'city': capitalCity}
            countryDetail.push(obj);
        }

        // We add the continent to the list of values
        for (i = 0; i < Object.keys(continent).length; i++) {
            let countryName = continent[i]["country"];    
            var countryIndex = countryDetail.findIndex(obj => obj.country == countryName);
            if (countryIndex != -1)
                countryDetail[countryIndex].continent = continent[i]["continent"];
            else
                countryDetail[countryIndex].continent = null;
        }
        //console.log(countryDetail[1]);


        var URLs = ["country-by-continent", "country-by-currency", 
            "country-by-domain-tld", "country-by-flag"];
        var fields = ["continent", "currency_name", 
            "tld", "flag_base64"];

        for (url in URLs){
            address = "country-objects/" + URLs[url] + ".json";
            data = fs.readFileSync(address);
            let aux = JSON.parse(data);
            console.log(URLs[url] + " " + fields[url]);

            // We add the currency name, tld and flag_base 64 to the list of values
            for (i = 0; i < Object.keys(aux).length; i++) { 
                let countryName = aux[i]["country"];    
                var countryIndex = countryDetail.findIndex(obj => obj.country == countryName);
                if(fields[url] == "currency_name"){
                    if (countryIndex != -1)
                            countryDetail[countryIndex].currency_name = aux[i]["currency_name"];
                }
                if(fields[url] == "tld"){
                    if (countryIndex != -1)
                            countryDetail[countryIndex].tld = aux[i]["tld"];
                }
                if(fields[url] == "flag_base64"){
                    if (countryIndex != -1)  
                            countryDetail[countryIndex].flag_base64 = aux[i]["flag_base64"];
                }
            }      
        } 

        //console.log(countryDetail[1]);

        var allCountryDetails = JSON.stringify(countryDetail);
        fs.writeFile("country-objects/allDetails.json", allCountryDetails, function(err, result) {
            if(err) console.log('error', err);
        }); 
   
    });

   //Fades the paragraph when the button is pressed
    $("#fadeToggleBtn").click(function() {
        $("#fadeToggleParagraph").fadeToggle();
    });

    //Slides the header when the button is pressed
    $("#slideToggleBtn").click(function() {
        $("#slideToggleHeader").slideToggle();
    });
      
});

