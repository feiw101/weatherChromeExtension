const label = document.createElement("label");
label.setAttribute("for", "zipcode");
label.innerHTML = "Enter your zipcode or your city: ";

// insert label
document.body.appendChild(label);

// create textbox
const input = document.createElement("input");
input.setAttribute("id", "zipcode");
input.setAttribute("type", "text");
input.innerHTML = "Enter your zipcode: ";

// insert textbox
document.body.appendChild(input);

const btn = document.createElement("button");
btn.setAttribute("id", "default")
btn.innerHTML = "Locate Me";
btn.type = "submit";
btn.addEventListener("click", function () {

    
    label.style.visibility = "hidden";
    input.style.visibility = "hidden";
    btn.style.visibility = "hidden";

    setTimeout(function(){
        label.style.visibility = "visible";
        input.style.visibility = "visible";
        btn.style.visibility = "visible";
    }, 3000);

    const apiKey = "43cc9d2acc0d40afa7133855221401";
    let location = input.value;

    fetch (`https://api.weatherapi.com/v1/current.json?key=43cc9d2acc0d40afa7133855221401&q=${location}&aqi=no`)
    .then((response)=> response.json())
    .then ((data)=>{
    
        document.getElementById("text_location").innerHTML = data.location.name;
        document.getElementById("text_location_country").innerHTML = data.location.country;
        
        document.getElementById("text_temp").innerHTML = Math.round(data.current.temp_f);
        document.getElementById("text_feelslike").innerHTML = Math.round(data.current.feelslike_f);
        
        const weatherCondition = data.current.condition.text;
        document.getElementById("text_desc").innerHTML = weatherCondition;
    
    
    
        fetch( "https://www.weatherapi.com/docs/weather_conditions.json")
        .then((response)=> response.json())
        .then ((iconData)=>{
    
        for(let i = 0; i<iconData.length; i++){
            if(weatherCondition===iconData[i].day){
                document.getElementById("icon").src = `images/weather/64x64/day/${iconData[i].icon}.png`;
            }else if(weatherCondition===iconData[i].night){
                document.getElementById("icon").src = `images/weather/64x64/night/${iconData[i].icon}.png`;     
            }
        }
        })
        //.catch(error => console.log("Please enter a valid zipcode or city: ")) 
    }) 
    
  });

document.body.appendChild(btn);

//&#8457 === °F
