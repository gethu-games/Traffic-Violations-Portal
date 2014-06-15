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
    insertComplaint($host, $username, $password, $db_name, $analyzerList);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    returnComplaints($host, $username, $password, $db_name);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //echo ("hi delete called");
    deleteComplaint($host, $username, $password, $db_name);
}


function insertComplaint($host, $username, $password, $db_name, $whiteList) {

    //echo("insert Video");

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);

    if (!in_array($obj->analyzedBy, $whiteList)) {
        $json       =   array();
        $json['error'] = 'not authorized';
        echo json_encode($json);
        mysql_close($db);
        return;
    }

    $sql            =   "INSERT INTO complaint (videoID, vehicleRegNo, vehicleType, violationType, timeSlice, analyzedBy) VALUES ( '" . $obj->videoID . "','" . $obj->vehicleRegNo . "','" . $obj->vehicleType . "','" . $obj->violationType . "','" . $obj->timeSlice . "','" . $obj->analyzedBy . "')";

    $db_insert      =   mysql_query($sql);

    if (!$db_insert) {
        die('Could not connect - event insert failed: ' . mysql_error());
    } else {
        $json       =   array();
        $json['complaintID'] = mysql_insert_id();
        updateVideoEntry($host, $username, $password, $db_name, $obj->videoID, $obj->analyzedBy);
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

function deleteComplaint($host, $username, $password, $db_name) {

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);

    //print_r($obj);

    $sql            =   "DELETE FROM complaint WHERE ID=" . $obj->ID;

    //print_r($sql);

    $db_delete      =   mysql_query($sql);

    if (!$db_delete) {
        die('Could not connect - event insert failed: ' . mysql_error());
    } else {
        $json       =   array();
        $json['message'] = "success";
        echo json_encode($json);
    }

    mysql_close($db);

}

function updateVideoEntry($host, $username, $password, $db_name, $videoID, $analyzedBy) {

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $sql            =   "SELECT analyzedBy FROM video WHERE videoID=" . $videoID;

    $db_result      =   mysql_query($sql);

    //echo ($videoID);
    //echo($analyzedBy);

    if (!$db_result) {
        die('Could not connect - event insert failed: ' . mysql_error());
    } else {
        if ($row=mysql_fetch_array($db_result, MYSQL_ASSOC)) {
            $analyzeArr         =   explode(",", $row['analyzedBy']);
            //print_r($analyzeArr);
            $found              =   false;
            for ($x = 0; $x < count($analyzeArr); $x++) {
                if ($analyzeArr[$x] === $analyzedBy) {
                    $found       =   true;
                    break;
                }
            }
            if ($found == false) {
                $analyzerNew    =   $row['analyzedBy'] . $analyzedBy . ",";
                $ssql           =   "UPDATE video SET analyzedBy = '" . $analyzerNew . "' WHERE videoID = " . $videoID;
                //echo($ssql);
                mysql_query($ssql);
            }
            $json   =   array();
            $json['message'] = "success";
            echo json_encode($json);
        }
    }

    mysql_close($db);

}

?>
