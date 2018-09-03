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

exports.captureVideo = function(req, res) {
  /*
   * Record a video
   * nopreview: skip nopreview
   * timeout 1: skip 5 seconds preview time
   * shutter 2500: avoid blurred object when moving
   * width 1280, height 960: video size in pixels
   * framerate 30: 30 FPS
   * timeout 10000: The length of the video in ms (10 seconds)
   * output screenshot.jpg: Save the picture in /home/pi/video.h264
   */
  let result = executeCommand("raspivid --nopreview --shutter 2500 --width 1280 --height 960 --framerate 30 --timeout 10000 --output /home/pi/video.h264");
  res.json(result);
};

exports.takePicture = function(req, res) {
  /*
   * Take a picture
   * nopreview: skip nopreview
   * timeout 1: skip 5 seconds preview time
   * shutter 2500: avoid blurred object when moving
   * width 1280, height 960: picture size in pixels
   * quality 75: 75 % JPEG quality
   * output screenshot.jpg: Save the picture in /home/pi/screenshot.jpg
   */
  let result = executeCommand("raspistill --nopreview --timeout 1 --shutter 2500 --width 1280 --height 960 --quality 75 --output /home/pi/screenshot.jpg");
  res.json(result);
};

// Helper function
function executeCommand(cmd) {
  // Execute a shell command on the Pi
  let result = shell.exec(cmd, {shell: "/bin/bash"});
  let status = "failed";

  // Check if the command was succesfull
  if(result.code === 0) {
    status = "success";
  }

  // Return the JSON reply
  return {
    "command": cmd,
    "status": status
  };
}
