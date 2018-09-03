/*
 * Copyright (C) 2018 by Dylan Van Assche
 *
 * This file is part of camera-wagon.
 *
 *   camera-wagon is free software: you can redistribute it and/or modify it
 *   under the terms of the GNU Lesser General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   camera-wagon is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public
 *   License along with camera-wagon.  If not, see <http://www.gnu.org/licenses/>.
 */

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
  var x = document.getElementById("navMobile");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Shutdown the Raspberry Pi
function shutdown() {
  XHTTP("http://localhost:3000/shutdown");
}

// Capture a video
function record() {
  XHTTP("http://localhost:3000/record");
}

// Helper functions
function XHTTP(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var reply = JSON.parse(this.responseText);
        alert(reply.command + ":" + reply.status);
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
