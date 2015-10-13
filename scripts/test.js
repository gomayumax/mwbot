var CronJob = require('cron').CronJob;
var people = [['小宮山','後藤','安井'],['池','北田','遠藤']];
var souzi = ['フロア掃除機/棚','会議室ダスター/クイックル','会議室掃除機/コロコロ'];
var weekDayJP = ['日','月','火','水','木','金','土'];

module.exports = function(robot) {
  new CronJob('0 * * * * 1-5',function(){
      var nObj = new Date();
      var day = nObj.getDay();
      var dayJP = weekDayJP[day];
      var patternNum = (parseInt((nObj.getTime() + 313200000) / 604800000)) % 2;
      var patternNumDairi = ((parseInt((nObj.getTime() + 313200000) / 1209600000)) % 3)+ 1;

//      robot.send({room:'#clean'}, dayJP + '曜日');
      robot.send({room:'#clean'}, '[本日の掃除当番]');
      //  pattern 1
      if( patternNum === 0){
        robot.send({room:'#clean'}, addSouziForPeople(patternNum, day, patternNumDairi));
      }
      //  pattern 2
      if( patternNum === 1){
        robot.send({room:'#clean'}, addSouziForPeople(patternNum, day, patternNumDairi));
      }
  },null,true);
};

function addSouziForPeople(patternNum, day, patternNumDairi) {
  var msg = '';
  for(var num in people[patternNum] ){
    //掃除当番の添字作成
    var souziNum = num+(day-1);
    if( ((day+num) / 3) > (day - 1)  ){
      souziNum = (num + (day - 1)) % 3;
    }
    var toban = souzi[souziNum]; 
    //北田さんかつ金曜日だけ代理を立てる    
    if(day === 5 && people[patternNum][num] === '北田' ){
      if(patternNumDairi === 2){patternNumDairi = 0;}
      else if(patternNumDairi === 3){patternNumDairi = 2;}
      person = people[0][patternNumDairi];
    }else{
      person = people[patternNum][num];
    }
    //出力文字列整形
    var line = person + ':'+ toban + '\n';
    msg += line;
  }
  return msg;
}
