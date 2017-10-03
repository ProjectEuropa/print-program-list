const NUM_NEXT_WEEK_DAY = 7;
const NUM_LOOP_COUNT_FIVE = 5;

const now = new Date();
let Y = now.getFullYear();
let M = now.getMonth();
let D = now.getDate();
let W = now.getDay();

if (W == 0) { W = 6; }
if (W == 1) { W = 0; }
if (W == 2) { W = 1; }
if (W == 3) { W = 2; }
if (W == 4) { W = 3; }
if (W == 5) { W = 4; }
if (W == 6) { W = 5; }

let nextWeekMonday = new Date(Y, M, D - W + NUM_NEXT_WEEK_DAY);
let mY = nextWeekMonday.getFullYear();
let mM = nextWeekMonday.getMonth();
let mD = nextWeekMonday.getDate();
let nextWeekArray = [mY + "/" + (mM + 1) + "/" + mD];

let i = 1;
while(i <= NUM_LOOP_COUNT_FIVE) {
    nextWeekMonday.setDate(nextWeekMonday.getDate() + 1);
    mY = nextWeekMonday.getFullYear();
    mM = nextWeekMonday.getMonth();
    mD = nextWeekMonday.getDate();
    nextWeekArray.push(mY + "/" + (mM + 1) + "/" + mD);
    i++;
}

nextWeekArray.forEach(function(value, index) {
    const dayIdNum = index + 1;
    $("#day-" + dayIdNum).before(value);
});

const nextWeek = nextWeekArray.shift() + "〜" + nextWeekArray.pop();
$("#fall-program").append("<p>" + nextWeek + "</p>");