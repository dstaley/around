export default function pointDistance(location1, location2) {
	function degreesToRadians(degrees) {
	  if (typeof degrees !== "number" || isNaN(degrees)) {
	    throw new Error("Error: degrees must be a number");
	  }

	  return (degrees * Math.PI / 180);
	}
	var radius = 6371; // Earth's radius in kilometers
	var latDelta = degreesToRadians(location2[0] - location1[0]);
	var lonDelta = degreesToRadians(location2[1] - location1[1]);

	var a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
	      (Math.cos(degreesToRadians(location1[0])) * Math.cos(degreesToRadians(location2[0])) *
	      Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return radius * c;
}
