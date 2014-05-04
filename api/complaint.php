<?php
/*
TRAFFIC VIOLATIONS PORTAL
saiy2k (http://saiy2k.blogspot.in)

This file is part of Traffic Violation Portal project (https://github.com/GethuGames/Traffic-Violations-Portal).

Traffic-Violations-Portal is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Traffic-Violations-Portal is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with ACR-Timeline-Infograph. If not, see <http://www.gnu.org/licenses/>.
*/

require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //insertComplaint($host, $username, $password, $db_name);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    returnComplaints($host, $username, $password, $db_name);
}


function insertComplaint($host, $username, $password, $db_name) {

    //echo("insert Video");

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);

    $sql            =   "INSERT INTO complaint (videoID, vehicleRegNo, vehicleType, violationType, timeSlice, analyzedBy) VALUES ( '" . $obj->videoID . "','" . $obj->vehicleRegNo . "','" . $obj->vehicleType . "','" . $obj->violationType . "','" . $obj->timeSlice . "','" . $obj->analyzedBy . "')";

    echo($sql);

    $db_insert      =   mysql_query($sql);

    if (!$db_insert) {
        die('Could not connect - event insert failed: ' . mysql_error());
    } else {
        $json       =   array();
        $json['complaintID'] = mysql_insert_id();
        echo json_encode($json);
    }

    mysql_close($db);

}

function returnComplaints($host, $username, $password, $db_name) {

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('could not select db');

    $videoID        =   $_GET['videoID'];

    $result         =   mysql_query("SELECT * from complaint where videoID='" . $videoID. "'") or die('Could not query');
    $json           =   array();

    //echo($result);

    if(mysql_num_rows($result)){
        while($row=mysql_fetch_array($result, MYSQL_ASSOC)){
            $json[] =   $row;
        }
    }

    echo json_encode($json);

    mysql_close($db);

}

?>
