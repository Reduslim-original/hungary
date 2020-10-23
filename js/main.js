$(function () {
    // countdownStart
    var storageCountdownReset = "countdownResetAirbag",
        storageCountdownTime = "countdownTimeAirbag",
        countdownResetTimeVal = 41,
        nowDateTime = new Date().getTime(),
        countdownReset = localStorage.getItem(storageCountdownReset);
    if (countdownReset == null) {
        localStorage.setItem(storageCountdownReset, nowDateTime)
    } else {
        if (nowDateTime - countdownReset > countdownResetTimeVal * 60 * 1000) {
            var countdownTime = (new Date).getTime() + 24e5;
            localStorage.setItem(storageCountdownTime, countdownTime);
            localStorage.setItem(storageCountdownReset, nowDateTime);
        }
    }

    if (localStorage.getItem(storageCountdownTime)) {
        var countdownTime = localStorage.getItem(storageCountdownTime);
    } else {
        countdownTime = (new Date).getTime() + 24e5;
    }

    $(".landing__countdown").countdown(countdownTime, function (s) {
        $(this).html(s.strftime('' +
        '<span class="days">00</span><span class="hours">%H</span><span class="minutes">%M</span><span class="seconds">%S</span>'
        ));
    }).on('update.landing__countdown', function (e) {
        countdownTime = e.finalDate.getTime();
        localStorage.setItem(storageCountdownTime, countdownTime);
    }).on('finish.landing__countdown', function (e) {
        $('.landing__countdown').countdown('stop');
    });
    // countdownEnd
})