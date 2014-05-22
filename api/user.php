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
    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);
    if ( strcmp($obj->method, 'login') == 0 ) {
        loginUser($host, $username, $password, $db_name);
    } else if ( strcmp($obj->method, 'awardPoint') == 0 ) {
        awardPoint($host, $username, $password, $db_name);
    }
} else {
    die('invalid request');
}

function loginUser($host, $username, $password, $db_name) {

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);

    $sql            =   "select * from user where email='" . $obj->email . "'";

    $dbResult       =   mysql_query($sql);

    if(mysql_num_rows($dbResult)){
        $row        =   mysql_fetch_array($dbResult, MYSQL_ASSOC);
        $result     =   array('message' => 'existingUser', 'points' => $row['points'] );
    } else {
        $sql        =   "INSERT INTO user (email, name) VALUES ('" . $obj->email . "','" . $obj->name . "')";
        $db_insert  =   mysql_query($sql);

        if (!$db_insert) {
            die('Could not connect - event insert failed: ' . mysql_error());
        } else {
            $result =   array('message' => 'newUser');
        }
    }

    echo json_encode($result);

    mysql_close($db);

}

function awardPoint($host, $username, $password, $db_name) {

    $db             =   mysql_connect($host, $username, $password) or die('Could not connect');
    mysql_select_db($db_name, $db) or die('');

    $json           =   file_get_contents('php://input');
    $obj            =   json_decode($json);

    $sql            =   "update user set points = points + " . $obj->points . " where email='" . $obj->email . "'";

    $dbResult       =   mysql_query($sql);

    if (!$dbResult) {
        die('Could not connect - event insert failed: ' . mysql_error());
    } else {
        $json       =   array();
        $json['awarded'] = 'yes';
        echo json_encode($json);
    }

    mysql_close($db);

}

?>
