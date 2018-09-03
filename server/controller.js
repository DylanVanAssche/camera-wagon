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
// Export our routing handlers
let shell = require("shelljs");

exports.shutdown = function(req, res) {
  /*
   * Schedule a power off command in 1 minute.
   */
  let result = executeCommand("sudo shutdown --power-off");
  res.json(result);
};

exports.record = function(req, res) {
  /*
   * Record a video (async)
   * nopreview: skip nopreview
   * timeout 1: skip 5 seconds preview time
   * shutter 2500: avoid blurred object when moving
   * width 1280, height 960: video size in pixels
   * framerate 30: 30 FPS
   * timeout 10000: The length of the video in ms (10 seconds)
   * output screenshot.jpg: Save the picture in /home/pi/video_TIMESTAMP.h264
   */
  let timestamp = currentTimestamp();
  let shutterspeed = 2500;
  let width = 1280;
  let height = 960;
  let fps = 30;
  let timeout = 10000;
  let result = executeCommand(
    "raspivid --nopreview --shutter " + shutterspeed
    + " --width " + width
    + " --height " + height
    + " --framerate " + fps
    + " --timeout " + timeout
    + " --output /home/pi/videos/video_" + timestamp + ".h264",
    false
  );
  res.json(result);
};

// Helper functions
function executeCommand(cmd, sync = true) {
  // Execute a shell command on the Pi
  let result = shell.exec(cmd, {shell: "/bin/bash", async: !sync});
  if(sync) {
    let status = "failed";

    // Check if the command was succesfull
    if(result.code === 0) {
      status = "success";
    }
  }
  else {
    status = "asynchronous";
  }

  // Return the JSON reply
  return {
    "command": cmd,
    "status": status
  };

}

function currentTimestamp() {
  // Get the current time and date and return it as a string
  let d = new Date();
  let time = "" + d.getHours() + d.getMinutes() + d.getSeconds();
  let date = "" + d.getDate() + (d.getMonth()+1) + d.getFullYear();

  return date + "-" + time;
}
