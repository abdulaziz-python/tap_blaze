document.addEventListener('DOMContentLoaded', function () {
    let coinCount = 0;
    let progress = 1000;
    let canTap = true;
    let boostCount = 3; // Initial boost count
    let currentSpeed = 1; // Initial recharge speed

    document.getElementById('icon').addEventListener('click', (event) => {
        if (canTap) {
            coinCount++;
            document.getElementById('coin-count').innerText = `Coins: ${coinCount}`;

            const plusOne = document.createElement('span');
            plusOne.innerText = '+1';
            plusOne.style.position = 'absolute';
            plusOne.style.left = `${event.pageX}px`;
            plusOne.style.top = `${event.pageY}px`;
            plusOne.style.fontSize = '1.2em';
            plusOne.style.fontWeight = 'bold';
            plusOne.style.color = '#ff9800';
            plusOne.style.animation = 'floatUp 1s forwards';
            plusOne.style.textShadow = '2px 2px #000';
            document.body.appendChild(plusOne);

            setTimeout(() => {
                plusOne.remove();
            }, 1000);

            if (progress > 0) {
                progress--;
                document.getElementById('progress-bar').style.width = `${(progress / 1000) * 100}%`;
                document.getElementById('progress-text').innerText = `${progress}/1000`;

                if (progress === 0) {
                    // Increase recharge speed when progress bar fills up
                    currentSpeed *= 2;
                    updateRechargeSpeed(currentSpeed);
                }
            }

            canTap = false;
            setTimeout(() => {
                canTap = true;
            }, 50);
        }
    });

    setInterval(() => {
        if (progress === 0 && coinCount > 0) {
            progress = Math.min(progress + 5, 1000);
            document.getElementById('progress-bar').style.width = `${(progress / 1000) * 100}%`;
            document.getElementById('progress-text').innerText = `${progress}/1000`;
        }
    }, 2000);

    // Handle free daily boost button click
    document.getElementById('free-boost-btn').addEventListener('click', function () {
        if (boostCount > 0) {
            boostCount--;
            document.querySelector('.boost-count').textContent = `${boostCount}/3`;

            // Increase progress bar if boost count is reduced to 0
            if (boostCount === 0) {
                increaseProgressBar();
            }
        }
    });

    // Handle get boost button click
    document.querySelectorAll('.get-boost-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var boostType = button.parentElement.parentElement.getAttribute('data-boost');
            switch (boostType) {
                case 'multitap':
                    buyBoost('Multitap', 1000, 2, 10);
                    break;
                case 'energy-limit':
                    buyBoost('Energy Limit', 2000, 500, 10);
                    break;
                case 'recharge-speed':
                    buyRechargeSpeedBoost('Recharge Speed', 500, 2); // Price, Speed Increment
                    break;
                default:
                    break;
            }
        });
    });

    // Handle increase speed button click
    document.getElementById('increase-speed-btn').addEventListener('click', function () {
        increaseSpeed();
    });

    function increaseProgressBar() {
        // Placeholder for increasing progress bar
        console.log('Progress bar increased!');
    }

    function buyBoost(type, price, incrementAmount, maxLevel) {
        // Placeholder for buying and upgrading boosts
        console.log('Bought ' + type + ' boost for ' + price + ' $BLZ');
        // Show success alert
        showAlert('Successfully bought ' + type + ' boost! 🚀');
        // Update UI with new level
        var boostItem = document.querySelector('[data-boost=' + type.toLowerCase().replace(' ', '-') + ']');
        var boostLevel = boostItem.querySelector('.boost-level');
        var currentLevel = parseInt(boostLevel.textContent.split(' ')[1]);
        // Extract current level from text
        var newLevel = currentLevel + 1;

        if (newLevel <= maxLevel) {
            boostLevel.textContent = 'Level ' + newLevel;
            // Implement logic to deduct coins here if needed
            // Update progress bar
        } else {
            console.log('Max level reached!');
        }
    }

    function buyRechargeSpeedBoost(type, price, speedIncrement) {
        // Placeholder for buying and upgrading recharge speed boosts
        console.log('Bought ' + type + ' boost for ' + price + ' $BLZ');
        // Show success alert
        showAlert('Successfully bought ' + type + ' boost! 🚀');
        // Update UI with new speed
        currentSpeed += speedIncrement;
        updateRechargeSpeed(currentSpeed);
    }

    function increaseSpeed() {
        // Placeholder for increasing recharging speed
        currentSpeed *= 2;
        updateRechargeSpeed(currentSpeed);
    }

    function updateRechargeSpeed(speed) {
        // Update recharge speed in UI
        var rechargeSpeedBoost = document.querySelector('.boost-item[data-boost="recharge-speed"]');
        var speedDescription = rechargeSpeedBoost.querySelector('.boost-level');
        speedDescription.textContent = `Level ${speed}`;
    }

    function showAlert(message) {
        // Display alert message temporarily
        var alertBox = document.createElement('div');
        alertBox.classList.add('alert');
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(function () {
            alertBox.classList.add('show');
            setTimeout(function () {
                alertBox.classList.remove('show');
                setTimeout(function () {
                    alertBox.remove();
                }, 300);
            }, 2000);
        }, 100);
    }
});
