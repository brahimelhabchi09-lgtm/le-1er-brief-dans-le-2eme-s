
        // Image URLs from Unsplash - cute animals and nature
        var images = [
            'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
            'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400',
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
            'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
            'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
            'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'
        ];

        var firstCard = null;
        var secondCard = null;
        var canFlip = true;
        var matches = 0;
        var moves = 0;
        var seconds = 0;
        var timerRunning = false;
        var timerInterval;

        function startGame() {
            var gameBoard = document.getElementById('gameBoard');
            gameBoard.innerHTML = '';
            
            var cardImages = images.concat(images);
            
            cardImages.sort(function() {
                return Math.random() - 0.5;
            });
            
            
            for (var i = 0; i < cardImages.length; i++) {
                var card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = '<div class="card-front"><i class="fas fa-heart"></i></div>' +
                                '<div class="card-back"><img src="' + cardImages[i] + '"></div>';
                card.onclick = flipCard;
                card.dataset.image = cardImages[i];
                gameBoard.appendChild(card);
            }
            
            firstCard = null;
            secondCard = null;
            canFlip = true;
            matches = 0;
            moves = 0;
            seconds = 0;
            timerRunning = false;
            
            updateStats();
            clearInterval(timerInterval);
        }

        function flipCard() {
            if (!canFlip) return;
            if (this.classList.contains('flipped')) return;
            if (this.classList.contains('matched')) return;
            
            if (!timerRunning) {
                startTimer();
            }
            
            this.classList.add('flipped');
            
            if (firstCard == null) {
                firstCard = this;
            } else {
                secondCard = this;
                canFlip = false;
                moves++;
                updateStats();
                checkMatch();
            }
        }

        function checkMatch() {
            var match = firstCard.dataset.image == secondCard.dataset.image;
            
            if (match) {
                setTimeout(function() {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matches++;
                    updateStats();
                    resetCards();
                    
                    if (matches == 8) {
                        endGame();
                    }
                }, 500);
            } else {
                setTimeout(function() {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    resetCards();
                }, 1000);
            }
        }

        function resetCards() {
            firstCard = null;
            secondCard = null;
            canFlip = true;
        }

        function startTimer() {
            timerRunning = true;
            timerInterval = setInterval(function() {
                seconds++;
                updateStats();
            }, 1000);
        }

        function updateStats() {
            document.getElementById('moves').textContent = moves;
            document.getElementById('matches').textContent = matches + '/8';
            
            var mins = Math.floor(seconds / 60);
            var secs = seconds % 60;
            if (secs < 10) secs = '0' + secs;
            document.getElementById('time').textContent = mins + ':' + secs;
        }

        function endGame() {
            clearInterval(timerInterval);
            document.getElementById('finalMoves').textContent = moves;
            document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
            document.getElementById('winModal').classList.add('show');
        }

        function newGame() {
            document.getElementById('winModal').classList.remove('show');
            clearInterval(timerInterval);
            startGame();
        }
        startGame();