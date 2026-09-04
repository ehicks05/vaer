# notes

things we store:

savedLocations
specifiedLocation

geolocation - from browser

resolvedLatLong - specifiedLocation's latLong or useGeolocation's latLong

weatherGov's pointQuery, which in turn relies on resolvedLatLong

resolvedLocation = specifiedLocation or pointQuery???


todo: draw a dependency graph