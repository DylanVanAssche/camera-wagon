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
let controller = require("./controller.js");

module.exports = function(app) {
  // Export all our routes for Express
  app.route("/shutdown").get(controller.shutdown);
  app.route("/record").get(controller.record);
};
