<?php
/**
 * Created by PhpStorm.
 * User: William
 * Date: 2018-05-03
 * Time: 12:40
 */

class Controller
{
    public function saveToCSV() {
        $ar = $_POST['ar'];
        $sr = $_POST['sr'];
        $LQ = $_POST['LQ'];
        $Ls = $_POST['Ls'];
        $Ws = $_POST['Ws'];
        $Wq = $_POST['Wq'];
        $P = $_POST['P'];
        $Po = $_POST['Po'];

        $list = array(
            $ar.";".$sr.";".$LQ.";".$Ls.";".$Ws.";".$Wq.";".$P.";".$Po,
        );

        $file = fopen('./model/data.txt', 'a');
        foreach($list as $line) {
            fputcsv($file, explode(';',$line), "\t");
        }
        fclose($file);
        return $list;

    }
}