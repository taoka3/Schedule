<?php
class Schedule
{
    /**
     * スケジュール一覧データを生成
     * @param int $yyyy
     * @param int $mm
     * @param int $dd
     * @param int $endday
     * @param int $TimeInterval
     * @return array
     */
    public function makeScheduleData($yyyy, $mm, $dd, $endday = 7, $TimeInterval = 30): array
    {
        $str = "";
        $isDate = [];
        $date = new DateTime();
        for ($h = 8; $h <= 22; $h++) {
            for ($m = 0; $m <= 59; $m = $m + $TimeInterval) {               
                for ($i = 1; $i <= $endday; $i++) {
                    if ($h === 8 && $m === 0) {
                        if(empty($isDate[$i])){
                            $isDate[$i] = $date->format("Y-m-d");
                            $date->modify('+1 day');
                        }
                    }                     
                    $days[] = [
                        'line' => $i,
                        'w' => (new DateTime($isDate[$i]))->format("w"),
                        'day' => $isDate[$i],
                        'time' => sprintf('%02d:%02d', $h, $m),
                    ];
                }
            }
        }
        return $days;
    }

    /**
     * スケジュールデータを取得する
     * @return mixed
     */
    public function getScheduleData(): mixed
    {
        $hasData = '';
        $yyyy = $_GET['yyyy'] ? (int)$_GET['yyyy'] : date('Y');
        $mm   = $_GET['mm'] ? (int)$_GET['mm'] : date('m');
        $dd   = $_GET['dd'] ? (int)$_GET['dd'] : date('d');
        $hasData = $this->makeScheduleData($yyyy, $mm, $dd);
        return json_encode($hasData);
    }
}

print (new Schedule)->getScheduleData();
