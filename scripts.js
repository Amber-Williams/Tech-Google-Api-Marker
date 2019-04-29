let locations = null;

async function grabLocations(){
  await fetch('https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json', {mode: 'cors'})
    .then(res => res.json())
    .then(res=> {locations=res})
}

async function initMap() {
  await grabLocations();
  let myLatLng = {lat: 0, lng: 0};
  let infowindow = new google.maps.InfoWindow();
  let R = 173;
  let G = 255;
  let B = 47;

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: myLatLng
  });

  locations.forEach((location,index) => {
    let item = document.createElement("LI");
    let country = document.createTextNode(location.name);
    item.appendChild(country);
    document.getElementById("mapList").appendChild(item);

    item.setAttribute("id", index);
    myItem = document.getElementById(index);
    myItem.style.color = `rgb(${R},${G},${B})`;
    R = R - 2;
    G = G - 7;
    B = B++;

    let marker = new google.maps.Marker({
    position: {lat: location.latitude, lng: location.longitude},
    map: map,
    title: location.name
    });

    google.maps.event.addListener(marker, 'click', function() {
        myLatLng = {lat: location.latitude, lng: location.longitude};
        infowindow.setContent(`<div><strong> ${location.name}</strong> <br> Capital: ${location.capital}</div>`);
        infowindow.open(map, this);
    });
  });
}